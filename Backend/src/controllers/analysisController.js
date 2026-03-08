const { analyzeResumeAgainstJob } = require('../services/geminiService');

async function analyzeResume(req, res) {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !resumeText.trim()) {
      res.status(400).json({
        success: false,
        message: 'Missing resume text',
        error: 'Resume text is required',
      });
      return;
    }

    if (!jobDescription || !jobDescription.trim()) {
      res.status(400).json({
        success: false,
        message: 'Missing job description',
        error: 'Job description is required',
      });
      return;
    }

    if (jobDescription.trim().length < 50) {
      res.status(400).json({
        success: false,
        message: 'Job description too short',
        error: 'Job description must be at least 50 characters',
      });
      return;
    }

    console.log(`[${new Date().toISOString()}] Starting analysis...`);
    console.log(`Resume length: ${resumeText.length} | Job description length: ${jobDescription.length}`);

    const analysisResult = await analyzeResumeAgainstJob({
      resumeText,
      jobDescription,
    });

    console.log(`[${new Date().toISOString()}] Analysis completed successfully. Match score: ${analysisResult.matchScore}%`);

    res.json({
      success: true,
      message: 'Analysis completed successfully',
      data: analysisResult,
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Analysis error:`, error.message);

    if (error.name === 'AbortError') {
      res.status(500).json({
        success: false,
        message: 'Analysis timeout',
        error: 'Analysis request timed out. Please try again with a shorter job description.',
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Analysis failed',
      error: error.message || 'Internal server error',
    });
  }
}

module.exports = {
  analyzeResume,
};
