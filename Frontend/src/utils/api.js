// // src/utils/api.js
// import axios from 'axios';

// const analyzeWithOpenAI = async (resumeText, jobDescription, apiKey) => {
//   const prompt = `Analyze the following resume against the job description and provide a detailed gap analysis:
  
//   RESUME:
//   ${resumeText}
  
//   JOB DESCRIPTION:
//   ${jobDescription}
  
//   Provide analysis in this JSON format:
//   {
//     "matchScore": <percentage>,
//     "missingSkills": [<array>],
//     "presentSkills": [<array>],
//     "suggestions": [<array>],
//     "strengthAreas": [<array>],
//     "experienceGaps": [<array>],
//     "keywordMatches": {
//       "matched": [<array>],
//       "missing": [<array>]
//     },
//     "improvementPriority": [<array>],
//     "industryAlignment": "<string>",
//     "overallFeedback": "<string>",
//     "nextSteps": [<array>]
//   }`;

//   const response = await axios.post(
//     'https://api.openai.com/v1/chat/completions',
//     {
//       model: "gpt-4",
//       messages: [
//         {
//           role: "system",
//           content: "You are an expert resume analyzer with 10+ years experience in HR and recruitment."
//         },
//         {
//           role: "user",
//           content: prompt
//         }
//       ],
//       temperature: 0.3,
//       max_tokens: 2000,
//       response_format: { type: "json_object" }
//     },
//     {
//       headers: {
//         'Authorization': `Bearer ${apiKey}`,
//         'Content-Type': 'application/json',
//       }
//     }
//   );
  
//   return JSON.parse(response.data.choices[0].message.content);
// };

// const analyzeWithGemini = async (resumeText, jobDescription, apiKey) => {
//   const prompt = `Analyze this resume against the job description and provide a detailed gap analysis in this exact JSON format:
//   {
//     "matchScore": 85,
//     "missingSkills": [],
//     "presentSkills": [],
//     "suggestions": [],
//     "strengthAreas": [],
//     "experienceGaps": [],
//     "keywordMatches": {
//       "matched": [],
//       "missing": []
//     },
//     "improvementPriority": [],
//     "industryAlignment": "",
//     "overallFeedback": "",
//     "nextSteps": []
//   }
  
//   RESUME: ${resumeText}
  
//   JOB DESCRIPTION: ${jobDescription}`;

//   const response = await axios.post(
//     `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
//     {
//       contents: [{
//         parts: [{
//           text: prompt
//         }]
//       }],
//       generationConfig: {
//         temperature: 0.3,
//         maxOutputTokens: 2000,
//       }
//     }
//   );
  
//   return JSON.parse(response.data.candidates[0].content.parts[0].text);
// };

// export { analyzeWithOpenAI, analyzeWithGemini };






// api.js - Fixed version with proper error handling

const ANALYSIS_PROMPT = `
You are an expert resume analyzer and career advisor. Analyze the provided resume against the job description and provide a comprehensive analysis in the following JSON format:

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
`;

export const analyzeWithOpenAI = async (resumeText, jobDescription, apiKey) => {
  try {
    console.log('Starting OpenAI analysis...');
    console.log('Resume text length:', resumeText.length);
    console.log('Job description length:', jobDescription.length);
    console.log('API Key present:', !!apiKey);
    
    if (!apiKey || !apiKey.startsWith('sk-')) {
      throw new Error('Invalid OpenAI API key format');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: ANALYSIS_PROMPT
          },
          {
            role: 'user',
            content: `Please analyze this resume against the job description:

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Provide analysis in the specified JSON format.`
          }
        ],
        max_tokens: 2000,
        temperature: 0.3
      })
    });

    console.log('OpenAI Response status:', response.status);
    console.log('OpenAI Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error Response:', errorText);
      
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your OpenAI API key.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (response.status === 404) {
        throw new Error('OpenAI API endpoint not found. Please check your API configuration.');
      } else {
        throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
      }
    }

    const data = await response.json();
    console.log('OpenAI Raw response:', data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from OpenAI');
    }

    const content = data.choices[0].message.content;
    console.log('OpenAI Content:', content);

    // Try to parse JSON response
    let analysisResult;
    try {
      // Clean the content - remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      analysisResult = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.log('Content that failed to parse:', content);
      
      // Fallback: try to extract JSON from the content
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          analysisResult = JSON.parse(jsonMatch[0]);
        } catch (secondParseError) {
          throw new Error('Failed to parse OpenAI response as JSON');
        }
      } else {
        throw new Error('No valid JSON found in OpenAI response');
      }
    }

    // Validate the analysis result structure
    if (!analysisResult.matchScore || !Array.isArray(analysisResult.missingSkills)) {
      console.error('Invalid analysis result structure:', analysisResult);
      throw new Error('Invalid analysis result format from OpenAI');
    }

    console.log('OpenAI analysis completed successfully');
    return analysisResult;

  } catch (error) {
    console.error('OpenAI analysis error:', error);
    throw error;
  }
};

export const analyzeWithGemini = async (resumeText, jobDescription, apiKey) => {
  try {
    console.log('Starting Gemini analysis...');
    console.log('Resume text length:', resumeText.length);
    console.log('Job description length:', jobDescription.length);
    console.log('API Key present:', !!apiKey);

    if (!apiKey || !apiKey.startsWith('AIza')) {
      throw new Error('Invalid Gemini API key format');
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${ANALYSIS_PROMPT}

Please analyze this resume against the job description:

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Provide analysis in the specified JSON format.`
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2048
        }
      })
    });

    console.log('Gemini Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error Response:', errorText);
      
      if (response.status === 400) {
        throw new Error('Invalid request to Gemini API. Please check your input.');
      } else if (response.status === 403) {
        throw new Error('Invalid API key or access denied for Gemini API.');
      } else {
        throw new Error(`Gemini API error (${response.status}): ${errorText}`);
      }
    }

    const data = await response.json();
    console.log('Gemini Raw response:', data);

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response format from Gemini');
    }

    const content = data.candidates[0].content.parts[0].text;
    console.log('Gemini Content:', content);

    // Try to parse JSON response
    let analysisResult;
    try {
      // Clean the content - remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      analysisResult = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.log('Content that failed to parse:', content);
      
      // Fallback: try to extract JSON from the content
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          analysisResult = JSON.parse(jsonMatch[0]);
        } catch (secondParseError) {
          throw new Error('Failed to parse Gemini response as JSON');
        }
      } else {
        throw new Error('No valid JSON found in Gemini response');
      }
    }

    // Validate the analysis result structure
    if (!analysisResult.matchScore || !Array.isArray(analysisResult.missingSkills)) {
      console.error('Invalid analysis result structure:', analysisResult);
      throw new Error('Invalid analysis result format from Gemini');
    }

    console.log('Gemini analysis completed successfully');
    return analysisResult;

  } catch (error) {
    console.error('Gemini analysis error:', error);
    throw error;
  }
};