import React from 'react';
import { CheckCircle } from 'lucide-react';

const FeaturesGrid = () => {
    return (
        <section className="py-12 px-6" id="features">
            <div className="max-w-5xl mx-auto text-center mb-16">
                <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-400 font-semibold tracking-wider text-xs uppercase mb-6">
                    Features
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Comprehensive analysis <br className="hidden md:block" /> before you apply.</h2>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="md:col-span-3 border border-white/5 rounded-2xl bg-[#0a0a0a] p-10 relative group hover:border-white/10 transition-colors overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-white mb-2">Automated Keyword Extraction</h3>
                        <p className="text-sm text-gray-400 mb-8 max-w-sm">Our engine instantly cross-references your file with the JD to flag critical omissions.</p>

                        <div className="border border-white/10 rounded-xl bg-[#111] p-4 flex flex-wrap gap-2 mt-auto">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className={`h-8 rounded flex-1 min-w-[30px] transition-colors duration-500 ${i === 4 ? 'bg-brand-500/20 border-brand-500/50 border shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'bg-white/5'}`} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 border border-white/5 rounded-2xl bg-[#0a0a0a] p-10 relative group hover:border-white/10 transition-colors">
                    <div className="relative z-10 flex flex-col h-full justify-center">
                        <h3 className="text-xl font-bold text-white mb-2">Expert Feedback</h3>
                        <p className="text-sm text-gray-400 mb-8">Get personalized, bulleted action items.</p>
                        <ul className="space-y-4">
                            {['Score Analysis', 'Action Items', 'Format Fixes'].map((item, i) => (
                                <li key={i} className="flex items-center justify-between text-sm font-medium text-gray-300 border-b border-white/5 pb-3 group-hover:border-white/10 transition-colors">
                                    {item} <CheckCircle className="w-4 h-4 text-brand-500" />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesGrid;
