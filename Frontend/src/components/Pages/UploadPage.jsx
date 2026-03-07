import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Target } from 'lucide-react';
import { useFileUpload, useAnalysis, useToast } from '../../hooks';
import { JOB_DESCRIPTION_CONFIG, TOAST_MESSAGES } from '../../constants/config';

import LoadingOverlay from '../Upload/LoadingOverlay';
import UploadNavbar from '../Upload/UploadNavbar';
import FileUploadZone from '../Upload/FileUploadZone';
import JobDescriptionInput from '../Upload/JobDescriptionInput';
import ActionButtons from '../Upload/ActionButtons';

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
      setResumeText('');
      setUploadedFile(null);
      setExtractionProgress(0);
      setLocalJobDescription('');
    }
  };

  const onReplaceFile = () => {
    fileInputRef.current?.click();
  };

  const onRemoveFile = (e) => {
    e.stopPropagation();
    setUploadedFile(null);
    setResumeText('');
    setExtractionProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isAnalyzing) {
    return <LoadingOverlay />;
  }

  return (
    <div className="min-h-screen bg-[#000000] text-[#E5E5E5] font-sans overflow-x-hidden selection:bg-brand-500/30 selection:text-white pb-32">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            key={toast.id}
            className={`p-4 rounded-xl flex items-center justify-between min-w-[300px] shadow-lg border ${toast.type === 'error' ? 'bg-[#111111] border-[#EF4444]/50 text-[#EF4444]' :
              toast.type === 'success' ? 'bg-[#111111] border-[#10B981]/50 text-[#10B981]' :
                'bg-[#111111] border-brand-500/50 text-brand-400'
              }`}
          >
            <span className="text-sm font-medium">{toast.message}</span>
            <button onClick={() => hideToast(toast.id)} className="opacity-70 hover:opacity-100 transition-opacity">
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </div>

      <UploadNavbar onBack={onBack} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        {/* Header Titles */}
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase mb-6">
            <Target size={14} />
            Step 1 of 2
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">Upload Your Document</h1>
          <p className="text-gray-400 text-lg">We securely extract text from PDF, DOCX, and TXT files instantly.</p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
          {/* Left Column - Resume Upload Section */}
          <FileUploadZone
            uploadedFile={uploadedFile}
            fileInputRef={fileInputRef}
            onFileInputChange={onFileInputChange}
            extractionProgress={extractionProgress}
            onReplaceFile={onReplaceFile}
            onRemoveFile={onRemoveFile}
          />

          {/* Right Column - Job Description Section */}
          <JobDescriptionInput
            textareaRef={textareaRef}
            localJobDescription={localJobDescription}
            setLocalJobDescription={setLocalJobDescription}
          />
        </div>
      </motion.div>

      <ActionButtons
        onBack={onBack}
        onAnalyzeClick={onAnalyzeClick}
        isAnalyzing={isAnalyzing}
        resumeText={resumeText}
        localJobDescriptionLength={localJobDescription.length}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #222;
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #333;
        }
      `}} />
    </div>
  );
};

export default UploadPage;
