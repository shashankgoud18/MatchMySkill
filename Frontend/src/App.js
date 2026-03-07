import React, { useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { HomePage, UploadPage, ResultsPage } from './components/Pages';
import { Toast } from './components/UI';
import { useToast } from './hooks';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const { toasts, showToast, hideToast } = useToast();

  const handleStartAnalysis = () => {
    setCurrentPage('upload');
  };

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
    setCurrentPage('results');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setUploadedFile(null);
    setResumeText('');
    setExtractionProgress(0);
    setAnalysisResult(null);
  };

  return (
    <ErrorBoundary>
      <Toast toasts={toasts} onClose={hideToast} />

      {currentPage === 'home' && <HomePage onStartAnalysis={handleStartAnalysis} />}

      {currentPage === 'upload' && (
        <UploadPage
          onAnalysisComplete={handleAnalysisComplete}
          onBack={handleBackToHome}
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
          resumeText={resumeText}
          setResumeText={setResumeText}
          extractionProgress={extractionProgress}
          setExtractionProgress={setExtractionProgress}
          isAnalyzing={isAnalyzing}
          setIsAnalyzing={setIsAnalyzing}
        />
      )}

      {currentPage === 'results' && <ResultsPage analysisResult={analysisResult} onBack={handleBackToHome} />}
    </ErrorBoundary>
  );
};

export default App;
