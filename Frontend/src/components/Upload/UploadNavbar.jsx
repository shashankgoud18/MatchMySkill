import React from 'react';
import { ArrowLeft, FileCheck } from 'lucide-react';

const UploadNavbar = ({ onBack }) => {
    return (
        <nav className="sticky top-0 w-full z-40 bg-[#000000]/40 backdrop-blur-2xl border-b border-white/[0.04] mb-8">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="group flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </button>
                <div className="flex items-center gap-2 cursor-pointer z-50">
                    <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                        <FileCheck className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white">MatchMySkill</span>
                </div>
            </div>
        </nav>
    );
};

export default UploadNavbar;
