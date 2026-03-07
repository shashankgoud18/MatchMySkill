// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:10000',
  ENDPOINTS: {
    UPLOAD: '/upload',
    ANALYZE: '/api/analyze',
  },
  TIMEOUTS: {
    UPLOAD: 30000, // 30 seconds
    ANALYSIS: 90000, // 90 seconds
  },
};

// File Upload Configuration
export const FILE_CONFIG = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_TYPES: [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/plain',
  ],
  SUPPORTED_EXTENSIONS: ['.pdf', '.docx', '.doc', '.txt'],
};

// Job Description Validation
export const JOB_DESCRIPTION_CONFIG = {
  MIN_LENGTH: 50,
  MAX_LENGTH: 50000,
};

// Toast Messages
export const TOAST_MESSAGES = {
  LOADING: 'Processing your resume...',
  EXTRACTED_SUCCESS: 'Resume content extracted successfully!',
  UPLOAD_SUCCESS: 'Resume uploaded to server!',
  UPLOAD_FAILED: 'Resume upload failed on server.',
  UPLOAD_TIMEOUT: 'Upload timeout. Please try again.',
  UPLOAD_ERROR: 'Error uploading to server. Continuing with analysis...',
  PROCESSING_ERROR: 'Error processing file. Please try manual input.',
  INVALID_FILE_TYPE: 'Please upload a PDF, DOCX, or TXT file',
  JOB_DESCRIPTION_REQUIRED: 'Please paste a job description',
  JOB_DESCRIPTION_TOO_SHORT: 'Job description is too short. Please provide a more detailed description.',
  RESUME_REQUIRED: 'Please upload and extract your resume first',
  ANALYSIS_SUCCESS: 'Analysis completed successfully!',
  ANALYSIS_FAILED: 'Analysis failed',
  ANALYSIS_TIMEOUT: 'Analysis request timed out. Please try again with a shorter job description.',
};

// UI Configuration
export const UI_CONFIG = {
  TOAST_DURATION: 4000, // 4 seconds
  ANIMATION_DURATION: 300, // 300ms
};

// Environment
export const ENVIRONMENT = {
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
};
