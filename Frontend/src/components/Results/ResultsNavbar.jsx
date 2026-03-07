import React from 'react';
import { ArrowLeft, Download, FileCheck } from 'lucide-react';

const ResultsNavbar = ({ onBack, generatePDFReport }) => {
    return (
        <nav className="sticky top-0 z-50 bg-[#000000]/40 backdrop-blur-2xl border-b border-white/[0.04]">
            <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                <button
                    onClick={onBack}
                    className="group flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:inline">Back to Match</span>
                </button>

                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="px-4 py-2 border border-white/10 hover:border-white/20 bg-transparent rounded-lg transition-colors duration-200 text-sm font-medium hidden sm:block text-gray-300 hover:text-white"
                    >
                        Analyze Another
                    </button>
                    <button
                        onClick={generatePDFReport}
                        className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-4 sm:px-6 py-2 rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all hover:-translate-y-0.5 flex items-center gap-2 text-sm"
                    >
                        <Download size={16} />
                        <span className="hidden sm:inline">Export PDF</span>
                        <span className="sm:hidden">PDF</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default ResultsNavbar;
