import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Search, CheckCircle, Rocket,Home,Briefcase,FileCheck, Play, Globe, ChevronRight, ArrowRight, Download, User, Clock, Trash2, RefreshCw, AlertCircle, X, Brain, Target, TrendingUp, Award, ChevronDown, ChevronUp, Sparkles, Zap, BarChart3, Eye, EyeOff, Settings, Star, Lightbulb, Shield, Users, ArrowLeft } from 'lucide-react';
import { extractPDFContent, extractDOCXContent, extractTXTContent } from './utils/fileParser';
import { analyzeWithGemini, analyzeWithOpenAI } from './utils/api';
import html2pdf from 'html2pdf.js';


const ResumeGapAnalyzer = () => {
  const GEMINI_API_KEY = 'AIzaSyDR8vod7jqk5Pzbx2Um2844ehX5cAkjEmQ';


  const [currentPage, setCurrentPage] = useState('home');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [toast, setToast] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState('openai');
  const fileInputRef = useRef(null);

//   const [jobDescription, setJobDescription] = useState(() => {
//   return localStorage.getItem('jobDescription') || "";
// });

const [jobDescription, setJobDescription] = useState('');

  // Toast notification system
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // File upload handler with extraction
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const supportedTypes = [
      'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];
  
  if (file && supportedTypes.includes(file.type)) {
    setUploadedFile(file);
    setExtractionProgress(0);
    showToast('Processing your resume...', 'info');
    
    try {
      let extractedContent;
      if (file.type === 'application/pdf') {
        extractedContent = await extractPDFContent(file);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        extractedContent = await extractDOCXContent(file);
      } else {
        extractedContent = await extractTXTContent(file);
      }
      
      setResumeText(extractedContent);
      setExtractionProgress(100);
      showToast('Resume content extracted successfully!');

            // --- ADD THIS BLOCK TO SEND TO BACKEND ---
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('extractedText', extractedContent);
      // Optionally add userId or jobDescription if needed
      // formData.append('userId', 'someUserId');
      // formData.append('jobDescription', jobDescription);

      fetch('http://localhost:5000/api/upload/resume', {
        method: 'POST',
        body: formData,
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          showToast('Resume uploaded to server!', 'success');
        } else {
          showToast('Resume upload failed on server.', 'error');
        }
      })
      .catch(err => {
        showToast('Error uploading to server.', 'error');
        console.error(err);
      });
      // --- END BLOCK ---
    } catch (error) {
      console.error('Extraction error:', error);
      showToast('Error processing file. Please try manual input.', 'error');
      //setShowManualInput(true);
    }
  } else {
    showToast('Please upload a PDF, DOCX, or TXT file', 'error');
  }
};

  // Helper function to extract job title from description
  const extractJobTitle = (description) => {
    const lines = description.split('\n');
    return lines[0].trim() || 'Target Position';
  };

  // Toast Component
  const Toast = ({ message, type }) => (
    <div className={`fixed top-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-80 ${
      type === 'error' ? 'bg-red-500 text-white' : 
      type === 'info' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
    } backdrop-blur-sm border border-white/20 transition-all duration-300 animate-fadeIn`}>
      {type === 'error' ? <AlertCircle size={20} /> : 
       type === 'info' ? <Brain size={20} /> : <CheckCircle size={20} />}
      <span className="font-medium">{message}</span>
      <button onClick={() => setToast(null)} className="ml-2 hover:bg-white/20 rounded-full p-1">
        <X size={16} />
      </button>
    </div>
  );

const HomePage = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 border-b border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-lg">
                <Brain className="text-white" size={28} />
              </div> */}
            <div className="rounded-2xl overflow-hidden ">
  <img 
  src="/logo4.png" 
  alt="Logo" 
  className="w-24 h-24 object-contain"
/>
</div>
              <div>
                <span className="text-white font-bold text-2xl">MatchMySkill</span>
                <p className="text-indigo-200 text-sm">AI Resume Analyzer</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#features" className="text-white/80 hover:text-white transition-colors">How it Works</a>
              {/* <a href="#pricing" className="text-white/80 hover:text-white transition-colors">Pricing</a> */}
            </div>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-6 py-16">
          <div className="text-center max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
                <Sparkles className="text-yellow-400" size={20} />
                <span className="text-white/90 font-medium">Powered by Advanced AI</span>
              </div>
              
              <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-8 leading-tight">
                Match Your
                <br />
                <span className="text-indigo-400">Dream Job</span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                AI-powered resume analysis that reveals exactly what recruiters want.
                <br />
                <span className="text-indigo-300 font-medium">Close skill gaps. Land interviews. Get hired.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <button
                  onClick={() => setCurrentPage('upload')}
                  className="group bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 text-white px-10 py-5 rounded-2xl font-semibold text-xl flex items-center gap-4 transition-all duration-300 shadow-2xl hover:shadow-indigo-500/25 hover:scale-105"
                >
                  <Rocket size={24} />
                  Start Free Analysis
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="flex items-center gap-3 text-white/80 hover:text-white group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Play size={20} />
                  </div>
                  <span className="font-medium">Watch Demo</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-8 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400" />
                  Free to use
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-blue-400" />
                  Privacy protected
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-yellow-400" />
                  Instant results
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid md:grid-cols-4 gap-8 mb-20">
              {
         [
  { icon: Star, value: "Free", label: "Always Available", color: "text-yellow-400" },
  // { icon: Clock, value: "24/7", label: "Access Anytime", color: "text-blue-400" },
 { icon: Brain, value: "AI-Powered", label: "Smart Analysis", color: "text-blue-400" },
 { icon: FileCheck, value: "ATS", label: "Optimized Format", color: "text-purple-400" },
  { icon: Shield, value: "Secure", label: "Data Handling", color: "text-purple-400" }
]

              .map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 group">
                  <stat.icon className={`${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} size={40} />
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features Section */}
            <div id="features" className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 mb-20">
              <h3 className="text-4xl font-bold text-white mb-16">How MatchMySkill Works</h3>
              <div className="grid md:grid-cols-3 gap-12">
                {[
                  {
                    icon: Upload,
                    title: "Smart Upload",
                    description: "Upload your resume in any format. Our AI extracts and analyzes every detail with 99.9% accuracy using advanced OCR and NLP.",
                    gradient: "from-green-500 to-emerald-600"
                  },
                  {
                    icon: Brain,
                    title: "AI Analysis",
                    description: "Our advanced AI analyzes 300+ factors including skills, experience, keywords, and industry trends to provide comprehensive insights.",
                    gradient: "from-indigo-500 to-purple-600"
                  },
                  {
                    icon: Target,
                    title: "Actionable Results",
                    description: "Get personalized recommendations, priority improvements, and strategic advice tailored to your target role and industry.",
                    gradient: "from-orange-500 to-red-600"
                  }
                ].map((feature, index) => (
                  <div key={index} className="relative group">
                    <div className={`bg-gradient-to-br ${feature.gradient} w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="text-white" size={36} />
                    </div>
                    <h4 className="font-bold text-white mb-6 text-2xl">{feature.title}</h4>
                    <p className="text-gray-300 leading-relaxed text-lg">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <h3 className="text-4xl font-bold text-white mb-6">Ready to Land Your Dream Job?</h3>
              <p className="text-xl text-gray-300 mb-10">Join thousands of professionals who've improved their resumes with MatchMySkill</p>
              
              <button
                onClick={() => setCurrentPage('upload')}
                className="group bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 text-white px-12 py-6 rounded-2xl font-bold text-xl flex items-center gap-4 mx-auto transition-all duration-300 shadow-2xl hover:shadow-indigo-500/25 hover:scale-105"
              >
                <Sparkles size={24} />
                Get Your Free Analysis
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };


const UploadPage = ({ 
  setCurrentPage,
  resumeText,
  setResumeText,
  uploadedFile,
  setUploadedFile,
  extractionProgress,
  setExtractionProgress,
  isAnalyzing,
  setIsAnalyzing,
  analysisResult,
  setAnalysisResult,
  analysisHistory,
  setAnalysisHistory,
  showToast,
  selectedProvider,
  GEMINI_API_KEY,
  fileInputRef,
  handleFileUpload
}) => {
  const [localJobDescription, setLocalJobDescription] = useState('');
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setLocalJobDescription(e.target.value);
  };

  const handleAnalyze = async () => {
  if (!resumeText.trim() || !localJobDescription.trim()) {
    showToast('Please provide resume content and job description', 'error');
    return;
  }

  setIsAnalyzing(true);

  try {
    if (!GEMINI_API_KEY) {
      showToast('Gemini API key is not configured', 'error');
      return;
    }

    // Optionally update parent state (if needed for results page)
   // onJobDescriptionSubmit(localJobDescription); // 👈 this sends it to App.js if you want to store it globally

    const result = await analyzeWithGemini(resumeText, localJobDescription, GEMINI_API_KEY);

    const fullResult = {
      id: Date.now(),
      fileName: uploadedFile?.name || "Manual Input",
      jobTitle: extractJobTitle(localJobDescription),
      analyzedAt: new Date().toLocaleString(),
      provider: selectedProvider === 'openai' ? 'OpenAI GPT-4' : 'Google Gemini',
      ...result,
    };

    setAnalysisResult(fullResult);
    setAnalysisHistory(prev => [fullResult, ...prev]);
    setCurrentPage('results');
    showToast('Analysis completed successfully!');

    // clear temporary data
    setResumeText('');
    setUploadedFile(null);
    setExtractionProgress(0);
  } catch (error) {
    console.error('Analysis error:', error);
    showToast(`Analysis failed: ${error.message}`, 'error');
  } finally {
    setIsAnalyzing(false);
  }
};


    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b ">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl overflow-hidden ">
  <img 
  src="/logo4.png" 
  alt="Logo" 
  className="w-24 h-24 object-contain"
/>
</div>
              <span className="text-gray-800 font-bold text-xl">MatchMySkill</span>
            </div>
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <Home size={20} />
              Home
            </button>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 rounded-full px-6 py-3 mb-6">
                <Target size={20} />
                <span className="font-medium">Professional Analysis</span>
              </div>
              <h1 className="text-5xl font-bold text-gray-800 mb-6">Upload Your Resume</h1>
              <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                Let our advanced AI analyze your resume against your target job and discover exactly what you need to succeed.
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-16">
              <div className="flex items-center">
                <div className="bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center font-bold shadow-lg border-4 border-indigo-100">1</div>
                <span className="ml-4 text-indigo-600 font-semibold text-lg">Upload Resume</span>
              </div>
              <div className="flex-1 border-t-2 border-indigo-300 mx-8 max-w-32 relative">
                <div className="absolute top-0 left-0 w-full h-full border-t-2 border-indigo-600 animate-pulse"></div>
              </div>
              <div className="flex items-center">
                <div className="bg-gray-200 text-gray-500 w-14 h-14 rounded-full flex items-center justify-center font-bold">2</div>
                <span className="ml-4 text-gray-500 font-semibold text-lg">Job Details</span>
              </div>
              <div className="flex-1 border-t-2 border-gray-200 mx-8 max-w-32"></div>
              <div className="flex items-center">
                <div className="bg-gray-200 text-gray-500 w-14 h-14 rounded-full flex items-center justify-center font-bold">3</div>
                <span className="ml-4 text-gray-500 font-semibold text-lg">AI Analysis</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* File Upload Section */}
              <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                    <FileText className="text-indigo-600" size={28} />
                    Resume Upload
                  </h3>
                  <p className="text-gray-600">Upload your resume in PDF, DOCX, or TXT format for analysis</p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-all duration-300 relative group">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  {!uploadedFile ? (
                    <>
                      <Upload className="mx-auto text-gray-400 mb-6 group-hover:text-indigo-500 transition-colors" size={64} />
                      <p className="text-gray-700 mb-3 font-semibold text-lg">
                        Drag and drop your resume here
                      </p>
                      <p className="text-gray-500 mb-6">or click to browse files</p>
                      <div className="inline-flex items-center gap-3 bg-indigo-100 text-indigo-700 rounded-xl px-6 py-3">
                        <FileText size={20} />
                        <span className="font-medium">PDF, DOCX, TXT supported</span>
                      </div>
                    </>
                  ) : (
                    <div>
                      <CheckCircle className="mx-auto text-green-500 mb-6" size={64} />
                      <p className="text-gray-800 font-semibold mb-3 text-lg">{uploadedFile.name}</p>
                      <p className="text-gray-600 mb-6">File uploaded successfully</p>
                      
                      {extractionProgress > 0 && extractionProgress < 100 && (
                        <div className="mb-6">
                          <div className="flex items-center justify-between text-gray-600 mb-3">
                            <span className="font-medium">Processing content...</span>
                            <span className="font-bold">{extractionProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                              style={{ width: `${extractionProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {extractionProgress === 100 && (
                        <>
                          <div className="text-green-600 flex items-center gap-2 justify-center mb-4">
                            <CheckCircle size={20} />
                            <span className="font-medium">File processed successfully</span>
                          </div>
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2 mx-auto"
                          >
                            <RefreshCw size={18} />
                            Replace File
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Job Description Section */}
              <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                    <Briefcase className="text-purple-600" size={28} />
                    Target Job Description
                  </h3>
                  <p className="text-gray-600">Paste the job description you're applying for to get targeted insights</p>
                </div>
                
                <textarea
                  
                  ref={textareaRef}
                  value={localJobDescription}
                  //onChange={handleJobDescriptionChange}
                  onChange={handleChange}
                  placeholder="Paste the complete job description here including requirements, responsibilities, and qualifications..."
                  className="w-full h-80 p-6 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-700"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-16">
              <button
                onClick={() => setCurrentPage('home')}
                className="px-8 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 flex items-center gap-3 font-medium"
              >
                <ArrowLeft size={20} />
                Back to Home
              </button>
              
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !resumeText || !localJobDescription}
                className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 font-semibold text-lg shadow-lg hover:shadow-indigo-500/25 transition-all"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="animate-spin" size={20} />
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
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


const ResultsPage = () => {
  if (!analysisResult) return null;

  const {
    matchScore,
    missingSkills,
    presentSkills,
    suggestions,
    strengthAreas,
    experienceGaps,
    keywordMatches,
    improvementPriority,
    industryAlignment,
    overallFeedback,
    nextSteps
  } = analysisResult;

  // PDF Generation Function
  const generatePDFReport = () => {
    // Show loading state
    const downloadBtn = document.querySelector('#download-btn');
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<div class="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div> Generating...';
    downloadBtn.disabled = true;

    // Create PDF content
    // const element = document.createElement('div');
    // element.innerHTML = `
    //   <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; max-width: 800px; background: white;">
    //     <!-- Header -->
    //     <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #4f46e5; padding-bottom: 20px;">
    //       <h1 style="color: #1e293b; font-size: 32px; margin-bottom: 8px; font-weight: bold;">Resume Analysis Report</h1>
    //       <p style="color: #64748b; font-size: 14px; margin: 0;">AI-Powered Career Enhancement Report</p>
    //       <p style="color: #64748b; font-size: 12px; margin-top: 5px;">Generated on ${new Date().toLocaleDateString('en-US', { 
    //         weekday: 'long', 
    //         year: 'numeric', 
    //         month: 'long', 
    //         day: 'numeric' 
    //       })}</p>
    //     </div>
        
    //     <!-- Analysis Summary Card -->
    //     <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 15px; margin-bottom: 30px;">
    //       <h2 style="color: white; margin-bottom: 15px; font-size: 20px;">Analysis Summary</h2>
    //       <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    //         <div>
    //           <p style="margin: 5px 0;"><strong>Resume File:</strong> ${analysisResult.fileName}</p>
    //           <p style="margin: 5px 0;"><strong>Target Position:</strong> ${analysisResult.jobTitle}</p>
    //         </div>
    //         <div style="text-align: center;">
    //           <div style="background: rgba(255,255,255,0.2); border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
    //             <span style="font-size: 24px; font-weight: bold;">${matchScore}%</span>
    //           </div>
    //           <p style="margin: 10px 0 0 0; font-size: 14px;">Match Score</p>
    //         </div>
    //       </div>
    //     </div>
        
    //     <!-- Overall Feedback -->
    //     <div style="margin-bottom: 30px;">
    //       <h2 style="color: #1e293b; border-left: 4px solid #f59e0b; padding-left: 15px; font-size: 18px; margin-bottom: 15px;">💡 Overall Feedback</h2>
    //       <div style="background: #fffbeb; border: 1px solid #fed7aa; border-radius: 10px; padding: 20px;">
    //         <p style="line-height: 1.7; color: #92400e; margin: 0; font-size: 14px;">${overallFeedback}</p>
    //       </div>
    //     </div>
        
    //     <!-- Industry Alignment -->
    //     <div style="margin-bottom: 30px;">
    //       <h2 style="color: #1e293b; border-left: 4px solid #6366f1; padding-left: 15px; font-size: 18px; margin-bottom: 15px;">📊 Industry Alignment</h2>
    //       <div style="background: #eef2ff; border: 1px solid #c7d2fe; border-radius: 10px; padding: 20px;">
    //         <p style="line-height: 1.7; color: #3730a3; margin: 0; font-size: 14px;">${industryAlignment}</p>
    //       </div>
    //     </div>
        
    //     <!-- Skills Comparison -->
    //     <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 30px;">
    //       <!-- Strengths -->
    //       <div>
    //         <h3 style="color: #059669; margin-bottom: 15px; font-size: 16px; display: flex; align-items: center;">
    //           <span style="background: #059669; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; margin-right: 10px; font-size: 12px;">✓</span>
    //           Your Strengths
    //         </h3>
    //         <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px; padding: 15px;">
    //           <ul style="padding-left: 0; list-style: none; margin: 0;">
    //             ${presentSkills.map(skill => `
    //               <li style="margin-bottom: 8px; color: #065f46; font-size: 13px; display: flex; align-items: center;">
    //                 <span style="color: #10b981; margin-right: 8px;">•</span>${skill}
    //               </li>
    //             `).join('')}
    //           </ul>
              
    //           <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #a7f3d0;">
    //             <h4 style="color: #059669; margin-bottom: 10px; font-size: 14px;">🏆 Strength Areas</h4>
    //             <div style="display: flex; flex-wrap: wrap; gap: 6px;">
    //               ${strengthAreas.map(area => `
    //                 <span style="background: #d1fae5; color: #047857; padding: 4px 10px; border-radius: 15px; font-size: 11px; border: 1px solid #a7f3d0;">${area}</span>
    //               `).join('')}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
          
    //       <!-- Areas for Improvement -->
    //       <div>
    //         <h3 style="color: #dc2626; margin-bottom: 15px; font-size: 16px; display: flex; align-items: center;">
    //           <span style="background: #dc2626; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; margin-right: 10px; font-size: 12px;">!</span>
    //           Areas for Improvement
    //         </h3>
    //         <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 15px;">
    //           <ul style="padding-left: 0; list-style: none; margin: 0;">
    //             ${missingSkills.map(skill => `
    //               <li style="margin-bottom: 8px; color: #991b1b; font-size: 13px; display: flex; align-items: center;">
    //                 <span style="color: #ef4444; margin-right: 8px;">•</span>${skill}
    //               </li>
    //             `).join('')}
    //           </ul>
              
    //           <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #fecaca;">
    //             <h4 style="color: #dc2626; margin-bottom: 10px; font-size: 14px;">⏰ Experience Gaps</h4>
    //             <ul style="padding-left: 0; list-style: none; margin: 0;">
    //               ${experienceGaps.map(gap => `
    //                 <li style="margin-bottom: 6px; color: #991b1b; font-size: 12px; display: flex; align-items: flex-start;">
    //                   <span style="color: #f97316; margin-right: 8px; margin-top: 2px;">•</span>
    //                   <span>${gap}</span>
    //                 </li>
    //               `).join('')}
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
        
    //     <!-- Recommendations -->
    //     <div style="margin-bottom: 30px;">
    //       <h2 style="color: #1e293b; border-left: 4px solid #8b5cf6; padding-left: 15px; font-size: 18px; margin-bottom: 20px;">✨ Actionable Recommendations</h2>
          
    //       <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
    //         <!-- Improvement Priorities -->
    //         <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 15px;">
    //           <h3 style="color: #166534; margin-bottom: 12px; font-size: 14px;">📈 Top Improvement Priorities</h3>
    //           <ol style="padding-left: 20px; margin: 0; color: #166534;">
    //             ${improvementPriority.map((item, index) => `
    //               <li style="margin-bottom: 8px; font-size: 12px; line-height: 1.5;">${item}</li>
    //             `).join('')}
    //           </ol>
    //         </div>
            
    //         <!-- Implementation Suggestions -->
    //         <div style="background: #fefce8; border: 1px solid #fde68a; border-radius: 10px; padding: 15px;">
    //           <h3 style="color: #92400e; margin-bottom: 12px; font-size: 14px;">⚡ Implementation Suggestions</h3>
    //           <ol style="padding-left: 20px; margin: 0; color: #92400e;">
    //             ${suggestions.map((suggestion, index) => `
    //               <li style="margin-bottom: 8px; font-size: 12px; line-height: 1.5;">${suggestion}</li>
    //             `).join('')}
    //           </ol>
    //         </div>
    //       </div>
          
    //       <!-- Next Steps -->
    //       <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 20px;">
    //         <h3 style="color: #1d4ed8; margin-bottom: 12px; font-size: 14px;">🎯 Next Steps</h3>
    //         <ul style="padding-left: 0; list-style: none; margin: 0;">
    //           ${nextSteps.map(step => `
    //             <li style="margin-bottom: 8px; color: #1e40af; font-size: 12px; line-height: 1.5; display: flex; align-items: flex-start;">
    //               <span style="color: #3b82f6; margin-right: 8px; margin-top: 2px;">•</span>
    //               <span>${step}</span>
    //             </li>
    //           `).join('')}
    //         </ul>
    //       </div>
    //     </div>
        
    //     <!-- Keyword Analysis -->
    //     <div style="margin-bottom: 30px;">
    //       <h2 style="color: #1e293b; border-left: 4px solid #06b6d4; padding-left: 15px; font-size: 18px; margin-bottom: 20px;">🔍 Keyword Analysis</h2>
          
    //       <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    //         <!-- Found Keywords -->
    //         <div>
    //           <h3 style="color: #059669; margin-bottom: 12px; font-size: 14px; display: flex; align-items: center;">
    //             <span style="color: #10b981; margin-right: 8px;">✓</span>
    //             Keywords Found in Resume
    //           </h3>
    //           <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px; padding: 15px;">
    //             <div style="display: flex; flex-wrap: wrap; gap: 6px;">
    //               ${keywordMatches.matched.map(keyword => `
    //                 <span style="background: #d1fae5; color: #047857; padding: 4px 8px; border-radius: 12px; font-size: 11px; border: 1px solid #a7f3d0;">${keyword}</span>
    //               `).join('')}
    //             </div>
    //           </div>
    //         </div>
            
    //         <!-- Missing Keywords -->
    //         <div>
    //           <h3 style="color: #dc2626; margin-bottom: 12px; font-size: 14px; display: flex; align-items: center;">
    //             <span style="color: #ef4444; margin-right: 8px;">✗</span>
    //             Missing Keywords
    //           </h3>
    //           <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 15px;">
    //             <div style="display: flex; flex-wrap: wrap; gap: 6px;">
    //               ${keywordMatches.missing.map(keyword => `
    //                 <span style="background: #fee2e2; color: #991b1b; padding: 4px 8px; border-radius: 12px; font-size: 11px; border: 1px solid #fecaca;">${keyword}</span>
    //               `).join('')}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
        
    //     <!-- Footer -->
    //     <div style="text-align: center; margin-top: 50px; padding-top: 25px; border-top: 2px solid #e2e8f0;">
    //       <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px;">
    //         <h3 style="color: white; margin: 0 0 10px 0; font-size: 16px;">🚀 MatchMySkill AI Resume Analyzer</h3>
    //         <p style="margin: 5px 0; font-size: 12px; opacity: 0.9;">Your AI-powered career enhancement partner</p>
    //         <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px; font-size: 11px; opacity: 0.8;">
    //           <span>Report Generated: ${new Date().toLocaleDateString()}</span>
    //           <span>Analysis ID: ${Date.now()}</span>
    //           <span>Match Score: ${matchScore}%</span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // `;
    
    // const opt = {
    //   margin: [0.5, 0.5, 0.5, 0.5],
    //   filename: `Resume_Analysis_${analysisResult.fileName.replace(/\.[^/.]+$/, "")}_${new Date().toISOString().split('T')[0]}.pdf`,
    //   image: { type: 'jpeg', quality: 0.98 },
    //   html2canvas: { 
    //     scale: 2, 
    //     useCORS: true,
    //     letterRendering: true,
    //     allowTaint: true,
    //     backgroundColor: '#ffffff'
    //   },
    //   jsPDF: { 
    //     unit: 'in', 
    //     format: 'letter', 
    //     orientation: 'portrait',
    //     compress: true
    //   },
    //   pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    // };


    // Create PDF content
// Create PDF content
const element = document.createElement('div');
element.innerHTML = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; max-width: 800px; background: white;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #4f46e5; padding-bottom: 20px;">
      <h1 style="color: #1e293b; font-size: 32px; margin-bottom: 8px; font-weight: bold;">Resume Analysis Report</h1>
      <p style="color: #64748b; font-size: 14px; margin: 0;">AI-Powered Career Enhancement Report</p>
      <p style="color: #64748b; font-size: 12px; margin-top: 5px;">Generated on ${new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}</p>
    </div>
    
    <!-- Analysis Summary Card -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 15px; margin-bottom: 30px;">
      <h2 style="color: white; margin-bottom: 15px; font-size: 20px;">Analysis Summary</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div>
          <p style="margin: 5px 0;"><strong>Resume File:</strong> ${analysisResult.fileName}</p>
          <p style="margin: 5px 0;"><strong>Target Position:</strong> ${analysisResult.jobTitle}</p>
        </div>
        <div style="text-align: center;">
          <div style="background: rgba(255,255,255,0.2); border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
            <span style="font-size: 24px; font-weight: bold;">${matchScore}%</span>
          </div>
          <p style="margin: 10px 0 0 0; font-size: 14px;">Match Score</p>
        </div>
      </div>
    </div>
    
    <!-- Overall Feedback -->
    <div style="margin-bottom: 30px; page-break-inside: avoid;">
      <h2 style="color: #1e293b; border-left: 4px solid #f59e0b; padding-left: 15px; font-size: 18px; margin-bottom: 15px;">💡 Overall Feedback</h2>
      <div style="background: #fffbeb; border: 1px solid #fed7aa; border-radius: 10px; padding: 20px;">
        <p style="line-height: 1.7; color: #92400e; margin: 0; font-size: 14px;">${overallFeedback}</p>
      </div>
    </div>
    
    <!-- Industry Alignment -->
    <div style="margin-bottom: 40px; page-break-inside: avoid; page-break-after: always;">
      <h2 style="color: #1e293b; border-left: 4px solid #6366f1; padding-left: 15px; font-size: 18px; margin-bottom: 15px;">📊 Industry Alignment</h2>
      <div style="background: #eef2ff; border: 1px solid #c7d2fe; border-radius: 10px; padding: 20px;">
        <p style="line-height: 1.7; color: #3730a3; margin: 0; font-size: 14px;">${industryAlignment}</p>
      </div>
    </div>
    
    <!-- Your Strengths - Full Width -->
    <div style="margin-bottom: 30px; page-break-inside: avoid;">
      <h3 style="color: #059669; margin-bottom: 15px; font-size: 18px; display: flex; align-items: center;">
        <span style="background: #059669; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 14px;">✓</span>
        Your Strengths
      </h3>
      <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px; padding: 20px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div>
            <h4 style="color: #059669; margin-bottom: 12px; font-size: 14px;">📋 Skills Present</h4>
            <ul style="padding-left: 0; list-style: none; margin: 0;">
              ${presentSkills.slice(0, Math.ceil(presentSkills.length/2)).map(skill => `
                <li style="margin-bottom: 8px; color: #065f46; font-size: 13px; display: flex; align-items: center;">
                  <span style="color: #10b981; margin-right: 8px;">•</span>${skill}
                </li>
              `).join('')}
            </ul>
          </div>
          <div>
            <h4 style="color: #059669; margin-bottom: 12px; font-size: 14px;">📋 Skills Present (Cont.)</h4>
            <ul style="padding-left: 0; list-style: none; margin: 0;">
              ${presentSkills.slice(Math.ceil(presentSkills.length/2)).map(skill => `
                <li style="margin-bottom: 8px; color: #065f46; font-size: 13px; display: flex; align-items: center;">
                  <span style="color: #10b981; margin-right: 8px;">•</span>${skill}
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
        
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #a7f3d0;">
          <h4 style="color: #059669; margin-bottom: 12px; font-size: 14px;">🏆 Strength Areas</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${strengthAreas.map(area => `
              <span style="background: #d1fae5; color: #047857; padding: 6px 12px; border-radius: 15px; font-size: 12px; border: 1px solid #a7f3d0;">${area}</span>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Areas for Improvement - Full Width -->
    <div style="margin-bottom: 40px; page-break-inside: avoid; page-break-after: always;">
      <h3 style="color: #dc2626; margin-bottom: 15px; font-size: 18px; display: flex; align-items: center;">
        <span style="background: #dc2626; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 14px;">!</span>
        Areas for Improvement
      </h3>
      <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 20px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div>
            <h4 style="color: #dc2626; margin-bottom: 12px; font-size: 14px;">❌ Missing Skills</h4>
            <ul style="padding-left: 0; list-style: none; margin: 0;">
              ${missingSkills.slice(0, Math.ceil(missingSkills.length/2)).map(skill => `
                <li style="margin-bottom: 8px; color: #991b1b; font-size: 13px; display: flex; align-items: center;">
                  <span style="color: #ef4444; margin-right: 8px;">•</span>${skill}
                </li>
              `).join('')}
            </ul>
          </div>
          <div>
            <h4 style="color: #dc2626; margin-bottom: 12px; font-size: 14px;">❌ Missing Skills (Cont.)</h4>
            <ul style="padding-left: 0; list-style: none; margin: 0;">
              ${missingSkills.slice(Math.ceil(missingSkills.length/2)).map(skill => `
                <li style="margin-bottom: 8px; color: #991b1b; font-size: 13px; display: flex; align-items: center;">
                  <span style="color: #ef4444; margin-right: 8px;">•</span>${skill}
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
        
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #fecaca;">
          <h4 style="color: #dc2626; margin-bottom: 12px; font-size: 14px;">⏰ Experience Gaps</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div>
              <ul style="padding-left: 0; list-style: none; margin: 0;">
                ${experienceGaps.slice(0, Math.ceil(experienceGaps.length/2)).map(gap => `
                  <li style="margin-bottom: 8px; color: #991b1b; font-size: 12px; display: flex; align-items: flex-start;">
                    <span style="color: #f97316; margin-right: 8px; margin-top: 2px;">•</span>
                    <span>${gap}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
            <div>
              <ul style="padding-left: 0; list-style: none; margin: 0;">
                ${experienceGaps.slice(Math.ceil(experienceGaps.length/2)).map(gap => `
                  <li style="margin-bottom: 8px; color: #991b1b; font-size: 12px; display: flex; align-items: flex-start;">
                    <span style="color: #f97316; margin-right: 8px; margin-top: 2px;">•</span>
                    <span>${gap}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Recommendations -->
    <div style="margin-bottom: 30px;">
      <h2 style="color: #1e293b; border-left: 4px solid #8b5cf6; padding-left: 15px; font-size: 18px; margin-bottom: 20px;">✨ Actionable Recommendations</h2>
      
      <!-- Improvement Priorities - Full Width -->
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 20px; margin-bottom: 20px; page-break-inside: avoid;">
        <h3 style="color: #166534; margin-bottom: 15px; font-size: 16px;">📈 Top Improvement Priorities</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div>
            <ol style="padding-left: 20px; margin: 0; color: #166534;">
              ${improvementPriority.slice(0, Math.ceil(improvementPriority.length/2)).map((item, index) => `
                <li style="margin-bottom: 10px; font-size: 13px; line-height: 1.5;">${item}</li>
              `).join('')}
            </ol>
          </div>
          <div>
            <ol start="${Math.ceil(improvementPriority.length/2) + 1}" style="padding-left: 20px; margin: 0; color: #166534;">
              ${improvementPriority.slice(Math.ceil(improvementPriority.length/2)).map((item, index) => `
                <li style="margin-bottom: 10px; font-size: 13px; line-height: 1.5;">${item}</li>
              `).join('')}
            </ol>
          </div>
        </div>
      </div>
      
      <!-- Implementation Suggestions - Full Width -->
      <div style="background: #fefce8; border: 1px solid #fde68a; border-radius: 10px; padding: 20px; margin-bottom: 20px; page-break-inside: avoid;">
        <h3 style="color: #92400e; margin-bottom: 15px; font-size: 16px;">⚡ Implementation Suggestions</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div>
            <ol style="padding-left: 20px; margin: 0; color: #92400e;">
              ${suggestions.slice(0, Math.ceil(suggestions.length/2)).map((suggestion, index) => `
                <li style="margin-bottom: 10px; font-size: 13px; line-height: 1.5;">${suggestion}</li>
              `).join('')}
            </ol>
          </div>
          <div>
            <ol start="${Math.ceil(suggestions.length/2) + 1}" style="padding-left: 20px; margin: 0; color: #92400e;">
              ${suggestions.slice(Math.ceil(suggestions.length/2)).map((suggestion, index) => `
                <li style="margin-bottom: 10px; font-size: 13px; line-height: 1.5;">${suggestion}</li>
              `).join('')}
            </ol>
          </div>
        </div>
      </div>
      
      <!-- Next Steps -->
      <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 20px; page-break-inside: avoid;">
        <h3 style="color: #1d4ed8; margin-bottom: 15px; font-size: 16px;">🎯 Next Steps</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div>
            <ul style="padding-left: 0; list-style: none; margin: 0;">
              ${nextSteps.slice(0, Math.ceil(nextSteps.length/2)).map(step => `
                <li style="margin-bottom: 10px; color: #1e40af; font-size: 13px; line-height: 1.5; display: flex; align-items: flex-start;">
                  <span style="color: #3b82f6; margin-right: 8px; margin-top: 2px;">•</span>
                  <span>${step}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          <div>
            <ul style="padding-left: 0; list-style: none; margin: 0;">
              ${nextSteps.slice(Math.ceil(nextSteps.length/2)).map(step => `
                <li style="margin-bottom: 10px; color: #1e40af; font-size: 13px; line-height: 1.5; display: flex; align-items: flex-start;">
                  <span style="color: #3b82f6; margin-right: 8px; margin-top: 2px;">•</span>
                  <span>${step}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Keyword Analysis -->
    <div style="margin-bottom: 30px; page-break-inside: avoid;">
      <h2 style="color: #1e293b; border-left: 4px solid #06b6d4; padding-left: 15px; font-size: 18px; margin-bottom: 20px;">🔍 Keyword Analysis</h2>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <!-- Found Keywords -->
        <div>
          <h3 style="color: #059669; margin-bottom: 12px; font-size: 14px; display: flex; align-items: center;">
            <span style="color: #10b981; margin-right: 8px;">✓</span>
            Keywords Found in Resume
          </h3>
          <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px; padding: 15px;">
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${keywordMatches.matched.map(keyword => `
                <span style="background: #d1fae5; color: #047857; padding: 4px 8px; border-radius: 12px; font-size: 11px; border: 1px solid #a7f3d0;">${keyword}</span>
              `).join('')}
            </div>
          </div>
        </div>
        
        <!-- Missing Keywords -->
        <div>
          <h3 style="color: #dc2626; margin-bottom: 12px; font-size: 14px; display: flex; align-items: center;">
            <span style="color: #ef4444; margin-right: 8px;">✗</span>
            Missing Keywords
          </h3>
          <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 15px;">
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${keywordMatches.missing.map(keyword => `
                <span style="background: #fee2e2; color: #991b1b; padding: 4px 8px; border-radius: 12px; font-size: 11px; border: 1px solid #fecaca;">${keyword}</span>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; margin-top: 50px; padding-top: 25px; border-top: 2px solid #e2e8f0;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px;">
        <h3 style="color: white; margin: 0 0 10px 0; font-size: 16px;">🚀 MatchMySkill AI Resume Analyzer</h3>
        <p style="margin: 5px 0; font-size: 12px; opacity: 0.9;">Your AI-powered career enhancement partner</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px; font-size: 11px; opacity: 0.8;">
          <span>Report Generated: ${new Date().toLocaleDateString()}</span>
          <span>Analysis ID: ${Date.now()}</span>
          <span>Match Score: ${matchScore}%</span>
        </div>
      </div>
    </div>
  </div>
`;

const opt = {
  margin: [0.5, 0.5, 0.5, 0.5],
  filename: `Resume_Analysis_${analysisResult.fileName.replace(/\.[^/.]+$/, "")}_${new Date().toISOString().split('T')[0]}.pdf`,
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { 
    scale: 2, 
    useCORS: true,
    letterRendering: true,
    allowTaint: true,
    backgroundColor: '#ffffff'
  },
  jsPDF: { 
    unit: 'in', 
    format: 'letter', 
    orientation: 'portrait',
    compress: true
  },
  pagebreak: { 
    mode: ['avoid-all', 'css', 'legacy'],
    before: '.page-break',
    after: '.page-break',
    avoid: 'div'
  }
};
    
    html2pdf().set(opt).from(element).save().then(() => {
      // Reset button state
      downloadBtn.innerHTML = originalText;
      downloadBtn.disabled = false;
    }).catch((error) => {
      console.error('PDF generation failed:', error);
      downloadBtn.innerHTML = originalText;
      downloadBtn.disabled = false;
      alert('Failed to generate PDF. Please try again.');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10  border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl overflow-hidden ">
  <img 
  src="/logo4.png" 
  alt="Logo" 
  className="w-24 h-24 object-contain"
/>
</div>
            <div>
              <span className="text-white font-bold text-2xl">MatchMySkill</span>
              <p className="text-indigo-200 text-sm">AI Resume Analyzer</p>
            </div>
          </div>
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20"
          >
            <ArrowLeft size={18} />
            New Analysis
          </button>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
              <Sparkles className="text-yellow-400" size={20} />
              <span className="text-white/90 font-medium">Analysis Complete</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-6 leading-tight">
              Your Resume Analysis
            </h1>
            
            <div className="text-xl text-gray-300 mb-8">
              Resume: <span className="text-indigo-300 font-medium">{analysisResult.fileName}</span>
              <br />
              Job: <span className="text-purple-300 font-medium">{analysisResult.jobTitle}</span>
            </div>
          </div>

          {/* Match Score Hero Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 mb-12 text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="relative w-64 h-64">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeDasharray={`${matchScore * 2.82}, 282`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-6xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{matchScore}%</div>
                  <div className="text-gray-300 text-lg">Match Score</div>
                </div>
              </div>
            </div>
            <div className="inline-block bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 text-indigo-200 px-6 py-3 rounded-full text-xl font-medium">
              {matchScore >= 80 ? '🎉 Excellent match' : matchScore >= 60 ? '👍 Good match' : '⚡ Needs improvement'}
            </div>
          </div>

          {/* Overall Feedback & Industry Alignment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h3 className="font-bold text-white mb-6 flex items-center gap-3 text-2xl">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-xl">
                  <Lightbulb className="text-white" size={24} />
                </div>
                Overall Feedback
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">{overallFeedback}</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h3 className="font-bold text-white mb-6 flex items-center gap-3 text-2xl">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-xl">
                  <BarChart3 className="text-white" size={24} />
                </div>
                Industry Alignment
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">{industryAlignment}</p>
            </div>
          </div>

          {/* Skills Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h3 className="font-bold text-white mb-6 flex items-center gap-3 text-2xl">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl">
                  <CheckCircle className="text-white" size={24} />
                </div>
                Your Strengths
              </h3>
              <ul className="space-y-4">
                {presentSkills.map((skill, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={18} />
                    <span className="text-gray-300 text-lg">{skill}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <h4 className="font-bold text-white mb-4 flex items-center gap-3 text-xl">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                    <Award className="text-white" size={20} />
                  </div>
                  Strength Areas
                </h4>
                <div className="flex flex-wrap gap-3">
                  {strengthAreas.map((area, index) => (
                    <span 
                      key={index} 
                      className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 text-blue-200 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h3 className="font-bold text-white mb-6 flex items-center gap-3 text-2xl">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-xl">
                  <AlertCircle className="text-white" size={24} />
                </div>
                Areas for Improvement
              </h3>
              <ul className="space-y-4">
                {missingSkills.map((skill, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="text-red-400 mt-1 flex-shrink-0" size={18} />
                    <span className="text-gray-300 text-lg">{skill}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <h4 className="font-bold text-white mb-4 flex items-center gap-3 text-xl">
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-2 rounded-lg">
                    <Clock className="text-white" size={20} />
                  </div>
                  Experience Gaps
                </h4>
                <ul className="space-y-3">
                  {experienceGaps.map((gap, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-orange-400 mt-1 flex-shrink-0">•</span>
                      <span className="text-gray-300 text-lg">{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-12">
            <h3 className="font-bold text-white mb-8 flex items-center gap-3 text-3xl">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <Sparkles className="text-white" size={28} />
              </div>
              Actionable Recommendations
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-white mb-6 flex items-center gap-3 text-xl">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
                    <TrendingUp className="text-white" size={20} />
                  </div>
                  Top Improvement Priorities
                </h4>
                <ol className="space-y-4">
                  {improvementPriority.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-300 text-lg">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-6 flex items-center gap-3 text-xl">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-lg">
                    <Zap className="text-white" size={20} />
                  </div>
                  Implementation Suggestions
                </h4>
                <ul className="space-y-4">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-300 text-lg">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="font-bold text-white mb-6 flex items-center gap-3 text-xl">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
                  <ArrowRight className="text-white" size={20} />
                </div>
                Next Steps
              </h4>
              <ul className="space-y-3">
                {nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="text-blue-400 mt-1 flex-shrink-0 text-xl">•</span>
                    <span className="text-gray-300 text-lg">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Keywords Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-12">
            <h3 className="font-bold text-white mb-8 flex items-center gap-3 text-3xl">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-xl">
                <Search className="text-white" size={28} />
              </div>
              Keyword Analysis
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-green-400 mb-6 flex items-center gap-3 text-xl">
                  <CheckCircle size={20} />
                  Keywords Found in Resume
                </h4>
                <div className="flex flex-wrap gap-3">
                  {keywordMatches.matched.map((keyword, index) => (
                    <span 
                      key={index} 
                      className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 text-green-200 px-4 py-2 rounded-full font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-red-400 mb-6 flex items-center gap-3 text-xl">
                  <X size={20} />
                  Missing Keywords
                </h4>
                <div className="flex flex-wrap gap-3">
                  {keywordMatches.missing.map((keyword, index) => (
                    <span 
                      key={index} 
                      className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 text-red-200 px-4 py-2 rounded-full font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => setCurrentPage('upload')}
              className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl hover:bg-white/20 flex items-center gap-3 font-medium text-lg transition-all duration-300"
            >
              <RefreshCw size={20} />
              Analyze Another
            </button>
            <button
              id="download-btn"
              onClick={generatePDFReport}
              className="group bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-medium text-lg transition-all duration-300 shadow-2xl hover:shadow-indigo-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Download size={20} />
              Download Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


  return (

    <div className="font-sans">
      {currentPage === 'home' && <HomePage />}
      
      {/* Always render UploadPage, just hide/show */}
      {/* {currentPage === 'upload' && (
  <UploadPage 
    setCurrentPage={setCurrentPage} 
    onJobDescriptionSubmit={(value) => setJobDescription(value)} 
  />
)} */}

      {currentPage === 'upload' && (
  <UploadPage 
    setCurrentPage={setCurrentPage}
    onJobDescriptionSubmit={(value) => setJobDescription(value)}
    resumeText={resumeText}
    setResumeText={setResumeText}
    uploadedFile={uploadedFile}
    setUploadedFile={setUploadedFile}
    isAnalyzing={isAnalyzing}
    setIsAnalyzing={setIsAnalyzing}
    analysisResult={analysisResult}
    setAnalysisResult={setAnalysisResult}
    analysisHistory={analysisHistory}
    setAnalysisHistory={setAnalysisHistory}
    showToast={showToast}
    extractionProgress={extractionProgress}
    setExtractionProgress={setExtractionProgress}
    selectedProvider={selectedProvider}
    setSelectedProvider={setSelectedProvider}
    GEMINI_API_KEY={GEMINI_API_KEY}
    fileInputRef={fileInputRef} // <-- ADD THIS LINE
    handleFileUpload={handleFileUpload}
  />
)}

      {currentPage === 'results' && <ResultsPage />}
    </div>
  );

};


export default ResumeGapAnalyzer;