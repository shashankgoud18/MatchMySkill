import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  Briefcase,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  CheckCircle,
  Target,
} from 'lucide-react';
import { useFileUpload, useAnalysis, useToast } from '../../hooks';
import { extractPDFContent, extractDOCXContent, extractTXTContent } from '../../utils/fileParser';
import { FILE_CONFIG, JOB_DESCRIPTION_CONFIG, TOAST_MESSAGES } from '../../constants/config';

const UploadPage = ({
  onAnalysisComplete,
  onBack,
  uploadedFile,
  setUploadedFile,
  resumeText,
  setResumeText,
  extractionProgress,
  setExtractionProgress,
  isAnalyzing,
  setIsAnalyzing,
}) => {
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const [localJobDescription, setLocalJobDescription] = useState('');

  const { toasts, showToast, hideToast } = useToast();

  const handleFileUploadSuccess = (data) => {
    setUploadedFile(data.file);
    setResumeText(data.extractedContent);
  };

  const handleFileUploadError = (error) => {
    console.error('File upload error:', error);
  };

  const { handleFileUpload } = useFileUpload(
    handleFileUploadSuccess,
    handleFileUploadError,
    showToast
  );

  const handleAnalysisSuccess = (result) => {
    setIsAnalyzing(false);
    onAnalysisComplete?.(result);
  };

  const handleAnalysisError = (error) => {
    setIsAnalyzing(false);
    console.error('Analysis error:', error);
  };

  const { handleAnalyze } = useAnalysis(
    handleAnalysisSuccess,
    handleAnalysisError,
    showToast
  );

  const onFileInputChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setExtractionProgress(0);
    const result = await handleFileUpload(file);
    if (result) {
      setExtractionProgress(100);
    }
  };

  const onAnalyzeClick = async () => {
    if (!resumeText.trim()) {
      showToast(TOAST_MESSAGES.RESUME_REQUIRED, 'error');
      return;
    }

    if (!localJobDescription.trim()) {
      showToast(TOAST_MESSAGES.JOB_DESCRIPTION_REQUIRED, 'error');
      return;
    }

    if (localJobDescription.trim().length < JOB_DESCRIPTION_CONFIG.MIN_LENGTH) {
      showToast(TOAST_MESSAGES.JOB_DESCRIPTION_TOO_SHORT, 'error');
      return;
    }

    setIsAnalyzing(true);
    const result = await handleAnalyze(resumeText, localJobDescription);
    if (result) {
      // Success - handled in callback
      setResumeText('');
      setUploadedFile(null);
      setExtractionProgress(0);
      setLocalJobDescription('');
    }
  };

  const onReplaceFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 overflow-x-hidden">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-lg text-white ${
              toast.type === 'error' ? 'bg-red-500' : toast.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
            }`}
          >
            {toast.message}
            <button
              onClick={() => hideToast(toast.id)}
              className="ml-4 text-xs hover:underline"
            >
              Dismiss
            </button>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 py-2 w-full gap-2">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/logo4.png"
                alt="Logo"
                className="w-14 h-14 sm:w-20 sm:h-20 object-contain"
              />
            </div>
            <span className="text-gray-800 font-bold text-lg sm:text-xl">MatchMySkill</span>
          </div>
          <button
            onClick={onBack}
            className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm sm:text-base"
          >
            <ArrowLeft size={18} />
            Home
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 sm:py-10 w-full">
        <div className="max-w-full md:max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 rounded-full px-4 py-2 text-sm sm:text-base mb-4">
              <Target size={18} />
              <span className="font-medium">Professional Analysis</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-3">Upload Your Resume</h1>
            <p className="text-gray-600 text-sm sm:text-lg max-w-xl mx-auto">
              Let our advanced AI analyze your resume against your target job and discover exactly what you need to
              succeed.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="hidden md:flex items-center justify-center mb-12 gap-4">
            <div className="flex items-center">
              <div className="bg-indigo-600 text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold shadow-lg border-4 border-indigo-100 text-lg md:text-2xl">
                1
              </div>
              <span className="ml-3 text-indigo-600 font-semibold text-base md:text-lg">Upload Resume</span>
            </div>
            <div className="flex-1 border-t-2 border-indigo-300 mx-8 max-w-32"></div>
            <div className="flex items-center">
              <div className="bg-gray-200 text-gray-500 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-lg md:text-2xl">
                2
              </div>
              <span className="ml-3 text-gray-500 font-semibold text-base md:text-lg">Job Details</span>
            </div>
            <div className="flex-1 border-t-2 border-gray-200 mx-8 max-w-32"></div>
            <div className="flex items-center">
              <div className="bg-gray-200 text-gray-500 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-lg md:text-2xl">
                3
              </div>
              <span className="ml-3 text-gray-500 font-semibold text-base md:text-lg">AI Analysis</span>
            </div>
          </div>

          {/* Form Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* File Upload Section */}
            <div className="bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FileText className="text-indigo-600" size={20} />
                  Resume Upload
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Upload your resume in PDF, DOCX, or TXT format for analysis
                </p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-5 text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-all relative group">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={onFileInputChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {!uploadedFile ? (
                  <>
                    <Upload className="mx-auto text-gray-400 mb-4 group-hover:text-indigo-500" size={40} />
                    <p className="text-gray-700 font-semibold mb-2 text-sm">Drag and drop your resume here</p>
                    <p className="text-gray-500 text-xs mb-4">or click to browse files</p>
                    <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 rounded-xl px-4 py-2 text-sm">
                      <FileText size={16} />
                      <span className="font-medium">PDF, DOCX, TXT supported</span>
                    </div>
                  </>
                ) : (
                  <div>
                    <CheckCircle className="mx-auto text-green-500 mb-4" size={40} />
                    <p className="text-gray-800 font-semibold mb-1 text-sm truncate">{uploadedFile.name}</p>
                    <p className="text-gray-600 mb-3 text-xs">File uploaded successfully</p>

                    {extractionProgress > 0 && extractionProgress < 100 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-gray-600 mb-1">
                          <span className="font-medium">Processing...</span>
                          <span className="font-bold">{extractionProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${extractionProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {extractionProgress === 100 && (
                      <>
                        <div className="text-green-600 flex items-center gap-2 justify-center mb-3">
                          <CheckCircle size={18} />
                          <span className="font-medium">File processed successfully</span>
                        </div>
                        <button
                          onClick={onReplaceFile}
                          className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2 mx-auto text-sm"
                        >
                          <RefreshCw size={16} />
                          Replace File
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Job Description Section */}
            <div className="bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Briefcase className="text-purple-600" size={20} />
                  Target Job Description
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Paste the job description you're applying for to get targeted insights
                </p>
              </div>

              <textarea
                ref={textareaRef}
                value={localJobDescription}
                onChange={(e) => setLocalJobDescription(e.target.value)}
                placeholder="Paste the complete job description here..."
                className="w-full h-32 sm:h-64 p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none text-sm text-gray-700"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4 mt-10">
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-5 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 font-medium text-sm"
            >
              <ArrowLeft size={18} />
              Back to Home
            </button>

            <button
              onClick={onAnalyzeClick}
              disabled={isAnalyzing || !resumeText || !localJobDescription}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold text-sm shadow-md transition"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="animate-spin" size={18} />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Analyze Resume
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
