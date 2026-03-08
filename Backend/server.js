const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  'GEMINI_API_KEY'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingEnvVars.join(', ')}`);
  console.error(`Please set these variables in your .env file. See .env.example for reference.`);
  process.exit(1);
}

console.log('✅ All required environment variables are configured.');

const app = express();

// CORS configuration - restrict to frontend origin in production
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [
      'https://matchmyskill.vercel.app',
      'https://match-my-skill-plby.vercel.app',
      process.env.FRONTEND_URL
    ].filter(Boolean)
  : ['http://localhost:3000'];

console.log('Allowed CORS origins:', allowedOrigins);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      // Log the blocked origin for debugging
      console.warn(`❌ CORS blocked origin: ${origin}`);
      console.warn(`✅ Allowed origins: ${allowedOrigins.join(', ')}`);
      callback(new Error('Not allowed by CORS'));
    } else {
      console.log(`✅ CORS allowed origin: ${origin}`);
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Parse JSON request bodies (REQUIRED for /api/analyze endpoint)
app.use(express.json());

// Rate limiting: max 30 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // limit each IP to 30 requests per windowMs
  message: 'Too many upload requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
});

app.use(limiter);

// Use memory storage for Multer. We don't need to permanently save files, just process them in memory.
const storage = multer.memoryStorage();

// Multer configuration with file size limits
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max file size
  },
  fileFilter: (req, file, cb) => {
    // Allowed MIME types
    const allowedMimes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
      'text/csv', // Sometimes txt comes through as this
      '' // Sometimes Windows returns empty string for txt/docx
    ];

    const fileExtension = '.' + file.originalname.split('.').pop().toLowerCase();
    const allowedExtensions = ['.pdf', '.docx', '.doc', '.txt'];

    if (allowedMimes.includes(file.mimetype) || allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Allowed types: PDF, DOCX, DOC, TXT. Received: ${file.mimetype}`), false);
    }
  }
});

app.post('/upload', upload.single('resume'), (req, res) => {
  try {
    // Validate that file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
        error: 'File is required'
      });
    }

    // Log file details (without sensitive content)
    console.log(`[${new Date().toISOString()}] File uploaded to memory: ${req.file.originalname}`);

    res.json({
      success: true,
      message: 'Upload successful',
      url: 'memory-only', // No physical URL if it's stored in memory
      public_id: req.file.originalname,
      fileName: req.file.originalname
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Upload error:`, error.message);
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error.message || 'Internal server error'
    });
  }
});

// Error handling middleware for multer
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large',
        error: 'Maximum file size is 10MB'
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Upload error',
      error: error.message
    });
  } else if (error) {
    return res.status(400).json({
      success: false,
      message: 'Upload error',
      error: error.message
    });
  }
  next();
});

// Gemini API Analysis Prompt
const ANALYSIS_PROMPT = `
You are an expert resume analyzer and career advisor. Analyze the provided resume against the job description. Detect the language of the job description automatically, and respond entirely in that same language.  

Return your detailed analysis strictly in the following JSON format:

{
  "matchScore": <number between 0-100>,
  "missingSkills": ["skill1", "skill2", ...],
  "presentSkills": ["skill1", "skill2", ...],
  "suggestions": ["suggestion1", "suggestion2", ...],
  "strengthAreas": ["area1", "area2", ...],
  "experienceGaps": ["gap1", "gap2", ...],
  "keywordMatches": {
    "matched": ["keyword1", "keyword2", ...],
    "missing": ["keyword1", "keyword2", ...]
  },
  "improvementPriority": ["priority1", "priority2", ...],
  "industryAlignment": "detailed analysis of industry fit",
  "overallFeedback": "comprehensive feedback paragraph",
  "nextSteps": ["step1", "step2", ...]
}

Provide specific, actionable insights based on the actual content of both the resume and job description.  
If the job description is written in a language other than English, ensure your analysis and feedback are written entirely in that same language.
`;

// Analyze Resume Endpoint - Secure Gemini API call
app.post('/api/analyze', async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    // Validate inputs
    if (!resumeText || !resumeText.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Missing resume text',
        error: 'Resume text is required'
      });
    }

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Missing job description',
        error: 'Job description is required'
      });
    }

    if (jobDescription.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: 'Job description too short',
        error: 'Job description must be at least 50 characters'
      });
    }

    console.log(`[${new Date().toISOString()}] Starting analysis...`);
    console.log(`Resume length: ${resumeText.length} | Job description length: ${jobDescription.length}`);

    // Call Gemini API with secret key (secure on backend)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000); // 60 second timeout

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${ANALYSIS_PROMPT}

Please analyze this resume against the job description:

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Provide analysis in the specified JSON format.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 8192,
          },
        }),
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[${new Date().toISOString()}] Gemini API Error:`, errorText);

      if (response.status === 400) {
        throw new Error('Invalid request to Gemini API. Please check your input.');
      }
      if (response.status === 403) {
        throw new Error('Invalid API key or access denied for Gemini API.');
      }
      if (response.status === 429) {
        throw new Error('Gemini API quota exceeded. Please try again later.');
      }

      throw new Error(`Gemini API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    if (!data.candidates || data.candidates.length === 0) {
      console.error(`[${new Date().toISOString()}] Empty Gemini response:`, data);
      throw new Error('Gemini returned an empty or invalid response.');
    }

    const candidate = data.candidates[0];

    // Extract text from response
    let content = '';

    if (Array.isArray(candidate.content)) {
      // Gemini 2.5+ format
      content = candidate.content
        .map(item => item?.parts?.map(p => p?.text).join(' ') || item?.text)
        .filter(Boolean)
        .join('\n');
    } else if (candidate.content?.parts) {
      // Older Gemini structure
      content = candidate.content.parts.map(p => p?.text).join('\n');
    } else if (candidate.output) {
      content = candidate.output;
    } else if (candidate.text) {
      content = candidate.text;
    }

    if (!content) {
      console.error(`[${new Date().toISOString()}] No text in Gemini response:`, data);
      throw new Error('Gemini returned empty response.');
    }

    // Parse JSON from response
    let analysisResult;
    try {
      const cleanContent = content.replace(/```json|```/g, '').trim();
      analysisResult = JSON.parse(cleanContent);
    } catch (parseError) {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          analysisResult = JSON.parse(jsonMatch[0]);
        } catch (fallbackError) {
          console.error(`[${new Date().toISOString()}] JSON parse failed:`, fallbackError);
          throw new Error('Could not parse Gemini response as JSON.');
        }
      } else {
        console.error(`[${new Date().toISOString()}] No JSON found in response`);
        throw new Error('No valid JSON found in Gemini response.');
      }
    }

    // Validate response structure
    if (typeof analysisResult.matchScore !== 'number' || !Array.isArray(analysisResult.missingSkills)) {
      console.error(`[${new Date().toISOString()}] Invalid analysis structure:`, analysisResult);
      throw new Error('Invalid analysis result format from Gemini');
    }

    console.log(`[${new Date().toISOString()}] Analysis completed successfully. Match score: ${analysisResult.matchScore}%`);

    res.json({
      success: true,
      message: 'Analysis completed successfully',
      data: analysisResult
    });

  } catch (error) {
    console.error(`[${new Date().toISOString()}] Analysis error:`, error.message);

    // Handle timeout errors
    if (error.name === 'AbortError') {
      return res.status(500).json({
        success: false,
        message: 'Analysis timeout',
        error: 'Analysis request timed out. Please try again with a shorter job description.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Analysis failed',
      error: error.message || 'Internal server error'
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('MatchMySkill backend is live!');
});