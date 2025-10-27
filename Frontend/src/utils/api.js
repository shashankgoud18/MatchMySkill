
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

// export const analyzeWithGemini = async (resumeText, jobDescription, apiKey) => {
//   try {
//     console.log('Starting Gemini analysis...');
//     console.log('Resume text length:', resumeText.length);
//     console.log('Job description length:', jobDescription.length);
//     console.log('API Key present:', !!apiKey);

//     if (!apiKey || !apiKey.startsWith('AIza')) {
//       throw new Error('Invalid Gemini API key format');
//     }

//    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         contents: [{
//           parts: [{
//             text: `${ANALYSIS_PROMPT}

// Please analyze this resume against the job description:

// RESUME:
// ${resumeText}

// JOB DESCRIPTION:
// ${jobDescription}

// Provide analysis in the specified JSON format.`
//           }]
//         }],
//         generationConfig: {
//           temperature: 0.3,
//           maxOutputTokens: 2048
//         }
//       })
//     });

//     console.log('Gemini Response status:', response.status);

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('Gemini API Error Response:', errorText);
      
//       if (response.status === 400) {
//         throw new Error('Invalid request to Gemini API. Please check your input.');
//       } else if (response.status === 403) {
//         throw new Error('Invalid API key or access denied for Gemini API.');
//       } else {
//         throw new Error(`Gemini API error (${response.status}): ${errorText}`);
//       }
//     }

//     const data = await response.json();
//     console.log('Gemini Raw response:', data);

//  if (!data.candidates || data.candidates.length === 0) {
//   console.error("Unexpected Gemini response:", data);
//   throw new Error("Gemini returned an empty or invalid response. Please check your input or model name.");
// }

// // Try to safely extract text content
// let content =
//   data.candidates?.[0]?.content?.parts?.[0]?.text ||
//   data.candidates?.[0]?.output ||
//   data.candidates?.[0]?.content?.text ||
//   "";

//   console.log("🔎 Gemini candidate content:", JSON.stringify(response.candidates[0], null, 2));


// // Debug log for safety
// console.log("🧩 Extracted Gemini content:", content);

// if (!content) {
//   console.error("Gemini response didn't include text:", data);
//   throw new Error("Gemini returned an empty or invalid response. Please check your input or model name.");
// }



// let analysisResult;
// try {
//   // Clean markdown formatting if present
//   const cleanContent = content
//     .replace(/```json|```/g, '')
//     .replace(/^Here.*?:/i, '')
//     .trim();

//   // Try direct parse first
//   analysisResult = JSON.parse(cleanContent);
// } catch (parseError) {
//   console.warn("⚠️ JSON parse failed, attempting fallback extraction...");
//   console.log("Gemini returned content:", content);

//   // Try to extract JSON object from text
//   const jsonMatch = content.match(/\{[\s\S]*\}/);
//   if (jsonMatch) {
//     try {
//       analysisResult = JSON.parse(jsonMatch[0]);
//     } catch (fallbackError) {
//       console.error("Fallback parse failed:", fallbackError);
//       throw new Error("Gemini response could not be parsed as JSON (even after cleaning).");
//     }
//   } else {
//     console.error("No JSON object found in response.");
//     throw new Error("No valid JSON found in Gemini response. Response was:\n" + content);
//   }
// }


//     // Validate the analysis result structure
//     if (!analysisResult.matchScore || !Array.isArray(analysisResult.missingSkills)) {
//       console.error('Invalid analysis result structure:', analysisResult);
//       throw new Error('Invalid analysis result format from Gemini');
//     }

//     console.log('Gemini analysis completed successfully');
//     return analysisResult;

//   } catch (error) {
//     console.error('Gemini analysis error:', error);
//     throw error;
//   }
// };



export const analyzeWithGemini = async (resumeText, jobDescription, apiKey) => {
  try {
    console.log('Starting Gemini analysis...');
    console.log('Resume text length:', resumeText.length);
    console.log('Job description length:', jobDescription.length);
    console.log('API Key present:', !!apiKey);

    if (!apiKey || !apiKey.startsWith('AIza')) {
      throw new Error('Invalid Gemini API key format');
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error Response:', errorText);

      if (response.status === 400)
        throw new Error('Invalid request to Gemini API. Please check your input.');
      if (response.status === 403)
        throw new Error('Invalid API key or access denied for Gemini API.');

      throw new Error(`Gemini API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    if (!data.candidates || data.candidates.length === 0) {
      console.error('Unexpected Gemini response:', data);
      throw new Error('Gemini returned an empty or invalid response. Please check your input or model name.');
    }

    const candidate = data.candidates[0];

    // --- Robust text extraction logic ---
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
      console.error('Gemini response did not include text:', data);
      throw new Error('Gemini returned an empty or invalid response. Please check your input or model name.');
    }

    // --- Try to parse JSON from the content ---
    let analysisResult;
    try {
      const cleanContent = content.replace(/```json|```/g, '').trim();
      analysisResult = JSON.parse(cleanContent);
    } catch (parseError) {
     // console.warn('⚠️ JSON parse failed, attempting fallback extraction...');
     // console.log('Gemini returned content:', content);

      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          analysisResult = JSON.parse(jsonMatch[0]);
        } catch (fallbackError) {
          console.error('Fallback parse failed:', fallbackError);
          throw new Error('Gemini response could not be parsed as JSON (even after cleaning).');
        }
      } else {
        console.error('No JSON object found in response.');
        throw new Error('No valid JSON found in Gemini response. Response was:\n' + content);
      }
    }

    // --- Validate structure ---
    if (
      typeof analysisResult.matchScore !== 'number' ||
      !Array.isArray(analysisResult.missingSkills)
    ) {
      console.error('Invalid analysis result structure:', analysisResult);
      throw new Error('Invalid analysis result format from Gemini');
    }

   // console.log('✅ Gemini analysis completed successfully');
    return analysisResult;
  } catch (error) {
    console.error('Gemini analysis error:', error);
    throw error;
  }
};
