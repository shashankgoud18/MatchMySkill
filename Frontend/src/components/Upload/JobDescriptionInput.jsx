import React from 'react';

const JobDescriptionInput = ({
    textareaRef,
    localJobDescription,
    setLocalJobDescription
}) => {
    return (
        <div className="flex flex-col h-full relative group">
            <div className="absolute -inset-1 bg-gradient-to-b from-brand-500/10 to-transparent blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 bg-[#0a0a0a] rounded-3xl p-8 sm:p-12 border border-white/10 flex-1 flex flex-col shadow-[0_0_30px_rgba(239,68,68,0.02)] transition-colors hover:border-brand-500/30">
                <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">Paste Job Description</h2>
                    <p className="text-gray-400 text-sm">Target critical role specifics (minimum 50 characters)</p>
                </div>

                <div className="relative flex-1 flex flex-col min-h-[300px] lg:min-h-0">
                    <textarea
                        ref={textareaRef}
                        value={localJobDescription}
                        onChange={(e) => setLocalJobDescription(e.target.value)}
                        placeholder="Paste the complete job description here including core requirements, qualifications, and responsibilities..."
                        className="w-full h-full flex-1 bg-[#050505] border border-white/10 focus:border-brand-500/50 rounded-2xl p-6 focus:outline-none focus:ring-1 focus:ring-brand-500/50 resize-none text-sm sm:text-base text-gray-300 leading-relaxed transition-colors duration-200 placeholder:text-gray-700 custom-scrollbar shadow-inner"
                    />
                    <div className={`absolute bottom-4 right-4 text-xs font-semibold px-2 py-1 rounded-md bg-[#111] border border-white/5 shadow-sm
            ${localJobDescription.length < 50 ? 'text-gray-600' :
                            localJobDescription.length > 50000 ? 'text-[#EF4444]' : 'text-brand-400'}`}>
                        {localJobDescription.length.toLocaleString()} / 50k
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDescriptionInput;
