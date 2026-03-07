import React from 'react';
import { Sparkles } from 'lucide-react';

const ActionButtons = ({
    onBack,
    onAnalyzeClick,
    isAnalyzing,
    resumeText,
    localJobDescriptionLength
}) => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-t border-white/5 py-4 px-6 z-40">
            <div className="max-w-7xl mx-auto flex flex-row items-center justify-between sm:justify-end gap-4">
                <button
                    onClick={onBack}
                    className="w-1/3 sm:w-auto text-sm text-gray-400 hover:text-white bg-transparent hover:bg-white/5 px-6 py-3.5 rounded-xl font-medium transition-colors duration-200"
                >
                    Cancel
                </button>

                <button
                    onClick={onAnalyzeClick}
                    disabled={isAnalyzing || !resumeText || localJobDescriptionLength < 50}
                    className="w-2/3 sm:w-auto bg-brand-500 hover:bg-brand-600 disabled:bg-[#222222] disabled:text-gray-600 disabled:cursor-not-allowed text-white font-semibold px-8 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(239,68,68,0.2)] hover:shadow-[0_4px_30px_rgba(239,68,68,0.4)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 text-base"
                >
                    <Sparkles size={18} className={!resumeText || localJobDescriptionLength < 50 ? 'opacity-50' : ''} />
                    Analyze Match
                </button>
            </div>
        </div>
    );
};

export default ActionButtons;
