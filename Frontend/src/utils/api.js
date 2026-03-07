
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:10000';

// Call backend API for analysis (Gemini calls are now secure on backend)
export const analyzeWithGemini = async (resumeText, jobDescription) => {
  try {
    console.log('Starting resume analysis via backend...');
    console.log('Resume text length:', resumeText.length);
    console.log('Job description length:', jobDescription.length);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 90000); // 90 second timeout

    const response = await fetch(`${BACKEND_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        resumeText: resumeText.trim(),
        jobDescription: jobDescription.trim(),
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Backend API Error Response:', errorData);

      if (response.status === 400) {
        throw new Error(errorData.error || 'Invalid request. Please check your input.');
      }
      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }

      throw new Error(errorData.error || `API error (${response.status})`);
    }

    const data = await response.json();

    if (!data.success || !data.data) {
      console.error('Invalid response from backend:', data);
      throw new Error('Invalid response from server');
    }

    console.log('Analysis completed successfully');
    return data.data;
  } catch (error) {
    console.error('Analysis error:', error);

    // Handle timeout errors
    if (error.name === 'AbortError') {
      throw new Error('Analysis request timed out. Please try again with a shorter job description.');
    }

    throw error;
  }
};
