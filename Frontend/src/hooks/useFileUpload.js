import { useCallback } from 'react';
import { extractPDFContent, extractDOCXContent, extractTXTContent } from '../utils/fileParser';
import { API_CONFIG, FILE_CONFIG, TOAST_MESSAGES } from '../constants/config';

/**
 * Custom hook for handling file uploads, extraction, and validation
 * @returns {Object} { handleFileUpload, isLoading, progress, error }
 */
export const useFileUpload = (onSuccess, onError, showToast) => {
  const handleFileUpload = useCallback(async (file) => {
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    const isSupportedType = FILE_CONFIG.SUPPORTED_TYPES.includes(file.type);
    const isSupportedExtension = FILE_CONFIG.SUPPORTED_EXTENSIONS.includes(fileExtension);

    // Validate file type
    if (!isSupportedType && !isSupportedExtension) {
      const error = TOAST_MESSAGES.INVALID_FILE_TYPE;
      onError?.(error);
      showToast?.(error, 'error');
      return null;
    }

    // Validate file size
    if (file.size > FILE_CONFIG.MAX_SIZE) {
      const error = `File is too large. Maximum size is ${FILE_CONFIG.MAX_SIZE / 1024 / 1024}MB`;
      onError?.(error);
      showToast?.(error, 'error');
      return null;
    }

    showToast?.(TOAST_MESSAGES.LOADING, 'info');

    try {
      // Extract content based on file type
      let extractedContent;
      if (file.type === 'application/pdf' || fileExtension === '.pdf') {
        extractedContent = await extractPDFContent(file);
      } else if (
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/msword' ||
        fileExtension === '.docx' ||
        fileExtension === '.doc'
      ) {
        extractedContent = await extractDOCXContent(file);
      } else if (file.type === 'text/plain' || fileExtension === '.txt') {
        extractedContent = await extractTXTContent(file);
      } else {
        throw new Error(TOAST_MESSAGES.INVALID_FILE_TYPE);
      }

      // Validate extracted content
      if (!extractedContent || extractedContent.trim().length === 0) {
        throw new Error(TOAST_MESSAGES.PROCESSING_ERROR);
      }

      showToast?.(TOAST_MESSAGES.EXTRACTED_SUCCESS, 'success');

      // Upload to backend
      await uploadToBackend(file, extractedContent);

      onSuccess?.({
        file,
        extractedContent,
      });

      return {
        file,
        extractedContent,
      };
    } catch (error) {
      const errorMessage = error.message || TOAST_MESSAGES.PROCESSING_ERROR;
      onError?.(errorMessage);
      showToast?.(errorMessage, 'error');
      return null;
    }
  }, [onSuccess, onError, showToast]);

  return {
    handleFileUpload,
  };
};

/**
 * Upload file to backend server
 * @param {File} file - The file to upload
 * @param {string} extractedText - The extracted text content
 */
async function uploadToBackend(file, extractedText) {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('extractedText', extractedText);

  const controller = new AbortController();
  const uploadTimeout = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUTS.UPLOAD);

  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.UPLOAD}`, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(uploadTimeout);

    let data;
    try {
      data = await response.json();
    } catch (_) {
      throw new Error(`Server error: ${response.status}`);
    }

    if (!response.ok || !data.success) {
      throw new Error(data.error || data.message || TOAST_MESSAGES.UPLOAD_FAILED);
    }

    return data;
  } catch (error) {
    clearTimeout(uploadTimeout);
    if (error.name === 'AbortError') {
      throw new Error(TOAST_MESSAGES.UPLOAD_TIMEOUT);
    }
    throw error;
  }
}
