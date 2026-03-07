import React from 'react';
import { Target, Zap, Shield, BrainCircuit, ChevronRight } from 'lucide-react';

const StatsAndHighlights = () => {
    return (
        <>
            {/* Trust & Stats */}
            <section className="py-20 border-y border-white/5 bg-[#050505]">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 hover:scale-110 transition-transform">
                            <Target className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-400">Over <span className="text-white font-semibold">100+</span><br /> resumes analyzed</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 hover:scale-110 transition-transform">
                            <Zap className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-400"><span className="text-white font-semibold">&lt; 10s</span> average<br /> processing time</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 hover:scale-110 transition-transform">
                            <Shield className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-400"><span className="text-white font-semibold">100%</span> private<br /> and secure</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center mb-4 border border-brand-500/20 hover:scale-110 transition-transform shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                            <BrainCircuit className="w-5 h-5 text-brand-500" />
                        </div>
                        <p className="text-sm text-brand-400"><span className="text-brand-500 font-semibold">Gemini AI</span><br /> powered analysis</p>
                    </div>
                </div>
            </section>

            {/* Dual Highlights Section */}
            <section className="py-24 px-6 relative" id="how-it-works">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-white/5 rounded-2xl bg-[#0a0a0a] p-10 flex flex-col justify-between relative overflow-hidden group hover:border-white/10 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <span className="text-xs font-bold tracking-widest text-[#666] uppercase mb-4 block">Stats & Metrics</span>
                            <div className="flex gap-4 items-end mb-8 mt-8">
                                <div>
                                    <h3 className="text-5xl font-black text-white mb-1 tracking-tighter">98<span className="text-3xl text-gray-500">%</span></h3>
                                    <p className="text-xs text-brand-400 flex items-center gap-1 font-semibold uppercase tracking-wider mt-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span> Match Accuracy</p>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-4xl font-black text-gray-300 mb-1 tracking-tighter">50<span className="text-2xl text-gray-600">+</span></h3>
                                    <p className="text-xs text-emerald-400 flex items-center gap-1 font-semibold uppercase tracking-wider mt-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span> Skill Checks</p>
                                </div>
                            </div>
                            <div className="flex items-end gap-2 h-24 mt-auto border-b border-white/10 pb-2">
                                {[40, 65, 45, 80, 55, 90, 70, 100].map((height, i) => (
                                    <div key={i} className="flex-1 bg-white/5 rounded-t-sm relative group cursor-pointer hover:bg-white/10 transition-colors" style={{ height: `${height}%` }}>
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-lg">
                                            {height}%
                                        </div>
                                        {i === 7 && <div className="absolute inset-x-0 bottom-0 top-0 bg-brand-500/80 rounded-t-sm shadow-[0_0_15px_rgba(239,68,68,0.5)]" />}
                                        {i === 3 && <div className="absolute inset-x-0 bottom-0 top-0 bg-emerald-500/60 rounded-t-sm" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border border-white/5 rounded-2xl bg-[#0a0a0a] p-10 flex flex-col justify-center relative overflow-hidden group hover:border-white/10 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-bl from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <span className="text-xs font-bold tracking-widest text-[#666] uppercase mb-4 block">Capabilities</span>
                            <h3 className="text-2xl font-bold text-white mb-4">Easy to extract, customize for your new application.</h3>
                            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                MatchMySkill instantly identifies exactly what your resume is missing based on real-time job descriptions. Optimize your profile in minutes.
                            </p>
                            <button className="text-sm text-brand-500 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                                Try it out <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default StatsAndHighlights;
