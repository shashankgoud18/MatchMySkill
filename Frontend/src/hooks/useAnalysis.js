import { useCallback } from 'react';
import { analyzeWithGemini } from '../utils/api';
import { TOAST_MESSAGES } from '../constants/config';

/**
 * Custom hook for handling resume analysis
 * @returns {Object} { handleAnalyze, isAnalyzing }
 */
export const useAnalysis = (onSuccess, onError, showToast) => {
  const handleAnalyze = useCallback(
    async (resumeText, jobDescription) => {
      // Validate inputs
      if (!resumeText?.trim()) {
        const error = TOAST_MESSAGES.RESUME_REQUIRED;
        onError?.(error);
        showToast?.(error, 'error');
        return null;
      }

      if (!jobDescription?.trim()) {
        const error = TOAST_MESSAGES.JOB_DESCRIPTION_REQUIRED;
        onError?.(error);
        showToast?.(error, 'error');
        return null;
      }

      if (jobDescription.trim().length < 50) {
        const error = TOAST_MESSAGES.JOB_DESCRIPTION_TOO_SHORT;
        onError?.(error);
        showToast?.(error, 'error');
        return null;
      }

      showToast?.(TOAST_MESSAGES.LOADING, 'info');

      try {
        // Call the backend analysis endpoint
        const result = await analyzeWithGemini(resumeText, jobDescription);

        if (!result) {
          throw new Error(TOAST_MESSAGES.ANALYSIS_FAILED);
        }

        showToast?.(TOAST_MESSAGES.ANALYSIS_SUCCESS, 'success');
        onSuccess?.(result);

        return result;
      } catch (error) {
        let errorMessage = error.message || TOAST_MESSAGES.ANALYSIS_FAILED;

        // Handle timeout specifically
        if (error.name === 'AbortError') {
          errorMessage = TOAST_MESSAGES.ANALYSIS_TIMEOUT;
        }

        onError?.(errorMessage);
        showToast?.(errorMessage, 'error');
        return null;
      }
    },
    [onSuccess, onError, showToast]
  );

  return {
    handleAnalyze,
  };
};
