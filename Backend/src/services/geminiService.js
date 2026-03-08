const { GEMINI_API_KEY } = require('../config/env');
const { ANALYSIS_PROMPT } = require('../config/prompt');

function extractGeminiContent(candidate) {
  if (!candidate) {
    return '';
  }

  if (Array.isArray(candidate.content)) {
    return candidate.content
      .map((item) => item?.parts?.map((part) => part?.text).join(' ') || item?.text)
      .filter(Boolean)
      .join('\n');
  }

  if (candidate.content?.parts) {
    return candidate.content.parts.map((part) => part?.text).join('\n');
  }

  if (candidate.output) {
    return candidate.output;
  }

  if (candidate.text) {
    return candidate.text;
  }

  return '';
}

function parseAnalysisJson(content) {
  try {
    const cleanContent = content.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanContent);
  } catch (parseError) {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in Gemini response.');
    }

    try {
      return JSON.parse(jsonMatch[0]);
    } catch (fallbackError) {
      throw new Error('Could not parse Gemini response as JSON.');
    }
  }
}

async function analyzeResumeAgainstJob({ resumeText, jobDescription }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${ANALYSIS_PROMPT}\n\nPlease analyze this resume against the job description:\n\nRESUME:\n${resumeText}\n\nJOB DESCRIPTION:\n${jobDescription}\n\nProvide analysis in the specified JSON format.`,
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
    throw new Error('Gemini returned an empty or invalid response.');
  }

  const content = extractGeminiContent(data.candidates[0]);

  if (!content) {
    throw new Error('Gemini returned empty response.');
  }

  const analysisResult = parseAnalysisJson(content);

  if (typeof analysisResult.matchScore !== 'number' || !Array.isArray(analysisResult.missingSkills)) {
    throw new Error('Invalid analysis result format from Gemini');
  }

  return analysisResult;
}

module.exports = {
  analyzeResumeAgainstJob,
};
