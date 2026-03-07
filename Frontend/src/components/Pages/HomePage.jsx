import React from 'react';
import Navbar from '../Home/Navbar';
import HeroSection from '../Home/HeroSection';
import InterfaceMockup from '../Home/InterfaceMockup';
import StatsAndHighlights from '../Home/StatsAndHighlights';
import FeaturesGrid from '../Home/FeaturesGrid';
import FaqSection from '../Home/FaqSection';
import FooterSection from '../Home/FooterSection';

const HomePage = ({ onStartAnalysis }) => {
  return (
    <div className="min-h-screen bg-[#000000] text-gray-100 font-sans selection:bg-brand-500/30 selection:text-white overflow-hidden flex flex-col">
      <Navbar onStartAnalysis={onStartAnalysis} />
      <HeroSection onStartAnalysis={onStartAnalysis} />
      <InterfaceMockup />
      <StatsAndHighlights />
      <FeaturesGrid />
      <FaqSection />
      <FooterSection onStartAnalysis={onStartAnalysis} />
    </div>
  );
};

export default HomePage;
