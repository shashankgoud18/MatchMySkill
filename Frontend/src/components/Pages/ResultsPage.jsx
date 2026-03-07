import React from 'react';
import {
  ArrowLeft,
  Sparkles,
  Lightbulb,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Download,
  Eye,
  EyeOff,
  TrendingUp,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import html2pdf from 'html2pdf.js';

const ResultsPage = ({ analysisResult, onBack }) => {
  const [expandedSections, setExpandedSections] = React.useState({
    strengths: true,
    improvements: true,
    recommendations: true,
  });

  if (!analysisResult) return null;

  const {
    matchScore,
    missingSkills = [],
    presentSkills = [],
    suggestions = [],
    strengthAreas = [],
    experienceGaps = [],
    keywordMatches = { matched: [], missing: [] },
    improvementPriority = [],
    industryAlignment = '',
    overallFeedback = '',
    nextSteps = [],
    fileName = 'Resume',
    jobTitle = 'Target Position',
  } = analysisResult;

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const generatePDFReport = () => {
    const downloadBtn = document.querySelector('#download-btn');
    if (!downloadBtn) return;

    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<div class="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div> Generating...';
    downloadBtn.disabled = true;

    const element = document.createElement('div');
    element.innerHTML = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; max-width: 800px; background: white;">
        <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #4f46e5; padding-bottom: 20px;">
          <h1 style="color: #1e293b; font-size: 32px; margin-bottom: 8px; font-weight: bold;">Resume Analysis Report</h1>
          <p style="color: #64748b; font-size: 14px; margin: 0;">AI-Powered Career Enhancement Report</p>
          <p style="color: #64748b; font-size: 12px; margin-top: 5px;">Generated on ${new Date().toLocaleDateString(
            'en-US',
            { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
          )}</p>
        </div>
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 15px; margin-bottom: 30px;">
          <h2 style="color: white; margin-bottom: 15px; font-size: 20px;">Analysis Summary</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <p style="margin: 5px 0;"><strong>Resume File:</strong> ${fileName}</p>
              <p style="margin: 5px 0;"><strong>Target Position:</strong> ${jobTitle}</p>
            </div>
            <div style="text-align: center;">
              <div style="background: rgba(255,255,255,0.2); border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
                <span style="font-size: 24px; font-weight: bold;">${matchScore}%</span>
              </div>
              <p style="margin: 10px 0 0 0; font-size: 14px;">Match Score</p>
            </div>
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1e293b; border-left: 4px solid #f59e0b; padding-left: 15px; font-size: 18px; margin-bottom: 15px;">Overall Feedback</h2>
          <div style="background: #fffbeb; border: 1px solid #fed7aa; border-radius: 10px; padding: 20px;">
            <p style="line-height: 1.7; color: #92400e; margin: 0; font-size: 14px;">${overallFeedback}</p>
          </div>
        </div>
        
        <div style="margin-bottom: 40px;">
          <h2 style="color: #1e293b; border-left: 4px solid #6366f1; padding-left: 15px; font-size: 18px; margin-bottom: 15px;">Industry Alignment</h2>
          <div style="background: #eef2ff; border: 1px solid #c7d2fe; border-radius: 10px; padding: 20px;">
            <p style="line-height: 1.7; color: #3730a3; margin: 0; font-size: 14px;">${industryAlignment}</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 50px; padding-top: 25px; border-top: 2px solid #e2e8f0;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px;">
            <h3 style="color: white; margin: 0 0 10px 0; font-size: 16px;">MatchMySkill AI Resume Analyzer</h3>
            <p style="margin: 5px 0; font-size: 12px; opacity: 0.9;">Your AI-powered career enhancement partner</p>
          </div>
        </div>
      </div>
    `;

    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `Resume_Analysis_${fileName.replace(/\.[^/.]+$/, '')}_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      },
      jsPDF: {
        unit: 'in',
        format: 'letter',
        orientation: 'portrait',
        compress: true,
      },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
      })
      .catch((error) => {
        console.error('PDF generation failed:', error);
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
        alert('Failed to generate PDF. Please try again.');
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl overflow-hidden">
              <img src="/logo4.png" alt="Logo" className="w-16 h-16 sm:w-24 sm:h-24 object-contain" />
            </div>
            <div>
              <span className="text-white font-bold text-xl sm:text-2xl">MatchMySkill</span>
              <p className="text-indigo-200 text-xs sm:text-sm">AI Resume Analyzer</p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="hidden sm:flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20"
          >
            <ArrowLeft size={18} />
            New Analysis
          </button>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
              <Sparkles className="text-yellow-400" size={20} />
              <span className="text-white/90 font-medium text-sm sm:text-base">Analysis Complete</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-6">
              Your Resume Analysis
            </h1>

            <div className="text-base sm:text-xl text-gray-300 mb-10">
              Resume: <span className="text-indigo-300 font-medium">{fileName}</span>
              <br />
              Job: <span className="text-purple-300 font-medium">{jobTitle}</span>
            </div>
          </div>

          {/* Match Score Hero Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-0 sm:p-12 mb-12 text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="relative w-64 h-64">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
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
                  <div className="text-6xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    {matchScore}%
                  </div>
                  <div className="text-gray-300 text-lg">Match Score</div>
                </div>
              </div>
            </div>
            <div className="inline-block bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 text-indigo-200 px-6 py-3 rounded-full text-xl font-medium">
              {matchScore >= 80
                ? '🎉 Excellent match'
                : matchScore >= 60
                  ? '👍 Good match'
                  : '⚡ Needs improvement'}
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

          {/* Skills Section - Collapsible */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Strengths */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
              <button
                onClick={() => toggleSection('strengths')}
                className="w-full p-8 flex items-center justify-between hover:bg-white/10 transition-colors"
              >
                <h3 className="font-bold text-white flex items-center gap-3 text-2xl">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl">
                    <CheckCircle className="text-white" size={24} />
                  </div>
                  Your Strengths
                </h3>
                {expandedSections.strengths ? (
                  <ChevronUp className="text-gray-400" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </button>

              {expandedSections.strengths && (
                <div className="px-8 pb-8 border-t border-white/10 space-y-6">
                  <div>
                    <h4 className="text-green-300 font-semibold mb-4 flex items-center gap-2">
                      <Award size={20} />
                      Skills Present
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {presentSkills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-green-500/20 border border-green-400/30 text-green-200 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {strengthAreas.length > 0 && (
                    <div>
                      <h4 className="text-green-300 font-semibold mb-4 flex items-center gap-2">
                        <TrendingUp size={20} />
                        Strength Areas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {strengthAreas.map((area, i) => (
                          <span
                            key={i}
                            className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 px-3 py-1 rounded-full text-sm"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Areas for Improvement */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
              <button
                onClick={() => toggleSection('improvements')}
                className="w-full p-8 flex items-center justify-between hover:bg-white/10 transition-colors"
              >
                <h3 className="font-bold text-white flex items-center gap-3 text-2xl">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-xl">
                    <AlertCircle className="text-white" size={24} />
                  </div>
                  Areas for Improvement
                </h3>
                {expandedSections.improvements ? (
                  <ChevronUp className="text-gray-400" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </button>

              {expandedSections.improvements && (
                <div className="px-8 pb-8 border-t border-white/10 space-y-6">
                  <div>
                    <h4 className="text-red-300 font-semibold mb-4">Missing Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {missingSkills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-red-500/20 border border-red-400/30 text-red-200 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {experienceGaps.length > 0 && (
                    <div>
                      <h4 className="text-orange-300 font-semibold mb-4">Experience Gaps</h4>
                      <ul className="space-y-2">
                        {experienceGaps.map((gap, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-orange-400 mt-1">•</span>
                            {gap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden mb-12">
            <button
              onClick={() => toggleSection('recommendations')}
              className="w-full p-8 flex items-center justify-between hover:bg-white/10 transition-colors"
            >
              <h3 className="font-bold text-white flex items-center gap-3 text-2xl">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                  <Sparkles className="text-white" size={24} />
                </div>
                Actionable Recommendations
              </h3>
              {expandedSections.recommendations ? (
                <ChevronUp className="text-gray-400" />
              ) : (
                <ChevronDown className="text-gray-400" />
              )}
            </button>

            {expandedSections.recommendations && (
              <div className="px-8 pb-8 border-t border-white/10 space-y-6">
                {improvementPriority.length > 0 && (
                  <div>
                    <h4 className="text-purple-300 font-semibold mb-4">Top Improvement Priorities</h4>
                    <ol className="space-y-2 list-decimal list-inside text-gray-300 text-sm">
                      {improvementPriority.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {suggestions.length > 0 && (
                  <div>
                    <h4 className="text-purple-300 font-semibold mb-4">Implementation Suggestions</h4>
                    <ol className="space-y-2 list-decimal list-inside text-gray-300 text-sm">
                      {suggestions.map((suggestion, i) => (
                        <li key={i}>{suggestion}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {nextSteps.length > 0 && (
                  <div>
                    <h4 className="text-purple-300 font-semibold mb-4">Next Steps</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      {nextSteps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-purple-400 mt-1">•</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Keyword Analysis */}
          {keywordMatches && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <h3 className="font-bold text-white mb-6 flex items-center gap-3 text-2xl">
                  <CheckCircle className="text-green-400" size={24} />
                  Keywords Found
                </h3>
                <div className="flex flex-wrap gap-2">
                  {keywordMatches.matched?.map((keyword, i) => (
                    <span
                      key={i}
                      className="bg-green-500/20 border border-green-400/30 text-green-200 px-3 py-1 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <h3 className="font-bold text-white mb-6 flex items-center gap-3 text-2xl">
                  <AlertCircle className="text-red-400" size={24} />
                  Missing Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {keywordMatches.missing?.map((keyword, i) => (
                    <span
                      key={i}
                      className="bg-red-500/20 border border-red-400/30 text-red-200 px-3 py-1 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Download Button */}
          <div className="flex justify-center mb-12">
            <button
              id="download-btn"
              onClick={generatePDFReport}
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 transition-all duration-300 shadow-2xl hover:shadow-indigo-500/25 hover:scale-105"
            >
              <Download size={20} />
              Download PDF Report
            </button>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20"
            >
              <ArrowLeft size={18} />
              Start New Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
