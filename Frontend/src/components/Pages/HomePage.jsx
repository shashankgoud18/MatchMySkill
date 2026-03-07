import React from 'react';
import {
  Sparkles,
  Upload,
  Brain,
  Target,
  CheckCircle,
  Rocket,
  ArrowRight,
  Shield,
  Zap,
  Star,
  FileCheck,
  ChevronRight,
  Play,
} from 'lucide-react';

const HomePage = ({ onStartAnalysis }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-40 left-10 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 container mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/logo4.png"
                alt="Logo"
                className="w-16 h-16 sm:w-24 sm:h-24 object-contain"
              />
            </div>
            <div>
              <span className="text-white font-bold text-xl sm:text-2xl">MatchMySkill</span>
              <p className="text-indigo-200 text-sm">AI Resume Analyzer</p>
            </div>
          </div>

          {/* Only visible on medium and up */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">
              Features
            </a>
            <a href="#features" className="text-white/80 hover:text-white transition-colors">
              How it Works
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16">
        <div className="text-center max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
              <Sparkles className="text-yellow-400" size={20} />
              <span className="text-white/90 font-medium text-sm sm:text-base">
                Powered by Advanced AI
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-6 leading-tight">
              Match Your
              <br />
              <span className="text-indigo-400">Dream Job</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              AI-powered resume analysis that reveals exactly what recruiters want.
              <br />
              <span className="text-indigo-300 font-medium">
                Close skill gaps. Land interviews. Get hired.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12">
              <button
                onClick={onStartAnalysis}
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-semibold text-lg sm:text-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl hover:shadow-indigo-500/25 hover:scale-105"
              >
                <Rocket size={24} />
                Start Free Analysis
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://www.linkedin.com/posts/shashank-goud18_introducing-matchmyskill-ai-powered-activity-7343889561418145792-ImRI?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFH3yhsBgHiLpv_pmY-TjkSQOXZ9jJshzDk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 hover:text-white group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Play size={20} />
                </div>
                <span className="font-medium text-sm sm:text-base">Watch Demo</span>
              </a>
            </div>

            {/* Benefits Row */}
            <div className="flex flex-wrap justify-center gap-6 text-white/60 text-sm">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-16">
            {[
              {
                icon: Star,
                value: 'Free',
                label: 'Always Available',
                color: 'text-yellow-400',
              },
              { icon: Brain, value: 'AI-Powered', label: 'Smart Analysis', color: 'text-blue-400' },
              { icon: FileCheck, value: 'ATS', label: 'Optimized Format', color: 'text-purple-400' },
              { icon: Shield, value: 'Secure', label: 'Data Handling', color: 'text-purple-400' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 group text-center"
              >
                <stat.icon
                  className={`${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  size={36}
                />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div id="features" className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-12 mb-20">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
              How MatchMySkill Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
              {[
                {
                  icon: Upload,
                  title: 'Smart Upload',
                  description:
                    'Upload your resume in any format. Our AI extracts and analyzes every detail with 99.9% accuracy using advanced OCR and NLP.',
                  gradient: 'from-green-500 to-emerald-600',
                },
                {
                  icon: Brain,
                  title: 'AI Analysis',
                  description:
                    'Our advanced AI analyzes 300+ factors including skills, experience, keywords, and industry trends to provide comprehensive insights.',
                  gradient: 'from-indigo-500 to-purple-600',
                },
                {
                  icon: Target,
                  title: 'Actionable Results',
                  description:
                    'Get personalized recommendations, priority improvements, and strategic advice tailored to your target role and industry.',
                  gradient: 'from-orange-500 to-red-600',
                },
              ].map((feature, index) => (
                <div key={index} className="text-center group">
                  <div
                    className={`bg-gradient-to-br ${feature.gradient} w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="text-white" size={30} />
                  </div>
                  <h4 className="font-bold text-white mb-4 text-xl sm:text-2xl">{feature.title}</h4>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-lg">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Land Your Dream Job?
            </h3>
            <p className="text-base sm:text-xl text-gray-300 mb-8">
              Join thousands of professionals who've improved their resumes with MatchMySkill
            </p>
            <button
              onClick={onStartAnalysis}
              className="group bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-2xl font-bold text-lg sm:text-xl flex items-center gap-3 mx-auto transition-all duration-300 shadow-2xl hover:shadow-indigo-500/25 hover:scale-105"
            >
              <Sparkles size={20} />
              Get Your Free Analysis
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
