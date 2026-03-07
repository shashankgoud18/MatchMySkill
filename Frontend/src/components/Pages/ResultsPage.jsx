import React from 'react';
import html2pdf from 'html2pdf.js';
import ResultsNavbar from '../Results/ResultsNavbar';
import MatchScoreHero from '../Results/MatchScoreHero';
import AnalysisDetails from '../Results/AnalysisDetails';
import { Download } from 'lucide-react';

const ResultsPage = ({ analysisResult, onBack }) => {
  const [expandedSections, setExpandedSections] = React.useState({
    strengths: true,
    improvements: true,
    keywords: true,
  });

  if (!analysisResult) return null;

  const {
    matchScore,
    missingSkills = [],
    presentSkills = [],
    suggestions = [],
    strengthAreas = [],
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
    downloadBtn.innerHTML = '<div class="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2 inline-block align-middle"></div> Generating PDF...';
    downloadBtn.disabled = true;

    const element = document.createElement('div');
    element.innerHTML = `
      <div style="font-family: 'Manrope', 'Segoe UI', Tahoma, Verdana, sans-serif; padding: 40px; max-width: 800px; background: white; color: #111;">
        <div style="text-align: center; margin-bottom: 40px; border-bottom: 1px solid #e5e5e5; padding-bottom: 30px;">
          <h1 style="color: #000; font-size: 36px; margin-bottom: 12px; font-weight: 800; letter-spacing: -0.5px;">Executive Match Analysis</h1>
          <p style="color: #666; font-size: 16px; margin: 0;">MatchMySkill AI Strategy Report</p>
          <p style="color: #999; font-size: 13px; margin-top: 8px;">Generated on ${new Date().toLocaleDateString(
      'en-US',
      { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    )}</p>
        </div>
        
        <div style="background: #fafafa; border: 1px solid #eaeaea; padding: 30px; border-radius: 12px; margin-bottom: 40px; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Candidate File</p>
            <p style="margin: 0 0 20px 0; font-size: 18px; color: #111; font-weight: 700;">${fileName}</p>
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Target Role</p>
            <p style="margin: 0; font-size: 18px; color: #111; font-weight: 700;">${jobTitle}</p>
          </div>
          <div style="text-align: center;">
            <div style="background: ${matchScore >= 80 ? '#ecfdf5' : matchScore >= 60 ? '#fefce8' : '#fef2f2'}; border: 4px solid ${matchScore >= 80 ? '#10b981' : matchScore >= 60 ? '#eab308' : '#ef4444'}; border-radius: 50%; width: 100px; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0 auto; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
              <span style="font-size: 28px; font-weight: 800; color: ${matchScore >= 80 ? '#047857' : matchScore >= 60 ? '#a16207' : '#b91c1c'}; leading-none;">${matchScore}%</span>
            </div>
            <p style="margin: 12px 0 0 0; font-size: 14px; font-weight: 600; color: #444;">Match Rank</p>
          </div>
        </div>

        <div style="margin-bottom: 40px;">
          <h2 style="color: #000; border-bottom: 1px solid #eaeaea; padding-bottom: 10px; font-size: 20px; margin-bottom: 20px; font-weight: 800;">Executive Summary</h2>
          <p style="line-height: 1.8; color: #333; margin: 0; font-size: 15px;">${overallFeedback}</p>
        </div>

        <div style="margin-bottom: 40px;">
          <h2 style="color: #000; border-bottom: 1px solid #eaeaea; padding-bottom: 10px; font-size: 20px; margin-bottom: 20px; font-weight: 800;">Actionable Intelligence</h2>
          <ul style="padding-left: 20px; margin: 0;">
            ${nextSteps.slice(0, 5).map(step => `<li style="line-height: 1.8; color: #333; margin-bottom: 10px; font-size: 15px;">${step}</li>`).join('')}
          </ul>
        </div>

        <div style="text-align: center; margin-top: 60px; padding-top: 30px; border-top: 1px solid #eaeaea;">
          <h3 style="color: #ef4444; margin: 0 0 8px 0; font-size: 16px; font-weight: 800;">MatchMySkill AI</h3>
          <p style="margin: 0; font-size: 13px; color: #666;">Empowering careers through data intelligence</p>
        </div>
      </div>
    `;

    const opt = {
      margin: 0,
      filename: `MatchMySkill_Report_${fileName.replace(/\.[^/.]+$/, '')}.pdf`,
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

  const getScoreColor = () => {
    if (matchScore >= 80) return { stroke: '#10B981', glow: 'rgba(16, 185, 129, 0.4)' };
    if (matchScore >= 60) return { stroke: '#EAB308', glow: 'rgba(234, 179, 8, 0.4)' };
    return { stroke: '#ef4444', glow: 'rgba(239, 68, 68, 0.4)' };
  };

  const radius = 95;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (matchScore / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#000000] text-[#E5E5E5] font-sans pb-32 overflow-hidden selection:bg-brand-500/30 selection:text-white relative">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[150px] pointer-events-none" />

      <ResultsNavbar onBack={onBack} generatePDFReport={generatePDFReport} />

      <div className="w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-12 relative z-10">
        <MatchScoreHero
          matchScore={matchScore}
          fileName={fileName}
          jobTitle={jobTitle}
          getScoreColor={getScoreColor}
          radius={radius}
          circumference={circumference}
          strokeDashoffset={strokeDashoffset}
        />

        <AnalysisDetails
          presentSkills={presentSkills}
          missingSkills={missingSkills}
          overallFeedback={overallFeedback}
          industryAlignment={industryAlignment}
          nextSteps={nextSteps}
          strengthAreas={strengthAreas}
          suggestions={suggestions}
          improvementPriority={improvementPriority}
          keywordMatches={keywordMatches}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        />
      </div>

      <div className="fixed bottom-6 left-0 w-full flex justify-center z-40 pointer-events-none px-4">
        <button
          id="download-btn"
          onClick={generatePDFReport}
          className="pointer-events-auto w-auto px-8 bg-brand-500 hover:bg-brand-600 text-white font-semibold py-4 rounded-full shadow-[0_10px_40px_rgba(239,68,68,0.4)] transition-all duration-300 hover:shadow-[0_15px_50px_rgba(239,68,68,0.6)] hover:-translate-y-1 flex items-center justify-center gap-3 text-sm uppercase tracking-wider"
        >
          <Download size={18} className="animate-bounce" />
          Download Executive Report
        </button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .glow-left-border {
           box-shadow: 0 0 20px rgba(239,68,68,0.4);
        }
      `}} />
    </div>
  );
};

export default ResultsPage;
