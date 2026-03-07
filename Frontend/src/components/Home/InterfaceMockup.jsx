import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';

const InterfaceMockup = () => {
    return (
        <section className="relative px-6 pb-24 z-10 -mt-8">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="max-w-5xl mx-auto relative"
            >
                <div className="absolute -inset-1 bg-gradient-to-b from-brand-500/20 to-transparent rounded-2xl blur-xl" />
                <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-2xl flex flex-col">
                    <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2 bg-[#050505]">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#0a0a0a]">
                        {/* Left Column: Match Score */}
                        <div className="md:col-span-1 border border-white/5 rounded-xl p-6 bg-[#111111]/50 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-b from-brand-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative w-36 h-36 flex items-center justify-center mb-6 mt-4">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="72" cy="72" r="64" fill="transparent" stroke="#222" strokeWidth="6" />
                                    <circle cx="72" cy="72" r="64" fill="transparent" stroke="#ef4444" strokeWidth="8" strokeDasharray="402" strokeDashoffset="48" strokeLinecap="round" className="drop-shadow-[0_0_12px_rgba(239,68,68,0.5)] transition-all duration-1000" />
                                </svg>
                                <div className="absolute flex flex-col items-center justify-center">
                                    <span className="text-5xl font-black text-white tracking-tighter">88%</span>
                                    <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-1 font-bold">Match Rank</span>
                                </div>
                            </div>
                            <h3 className="text-white font-bold text-lg leading-tight mb-1">Senior Frontend Engineer</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Stripe • Remote</p>
                            <div className="mt-6 w-full px-4 pt-6 border-t border-white/5">
                                <div className="flex justify-between items-center text-xs mb-2">
                                    <span className="text-gray-400">Readability</span>
                                    <span className="text-emerald-500 font-bold">Excellent</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-400">Formatting</span>
                                    <span className="text-yellow-500 font-bold">Needs Polish</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Insights & Keywords */}
                        <div className="md:col-span-2 flex flex-col gap-4">
                            <div className="border border-white/5 rounded-xl p-5 bg-[#111111]/50 flex border-l-2 border-l-brand-500 shadow-lg">
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-white mb-1">Executive Summary</h4>
                                    <p className="text-xs text-gray-400 leading-relaxed max-w-lg">Your technical background aligns strongly. However, the job description heavily emphasizes <span className="text-white font-semibold">Web Performance Optimization</span> and <span className="text-white font-semibold">System Design</span>, which are not currently highlighted in your recent experience.</p>
                                </div>
                            </div>

                            <div className="border border-white/5 rounded-xl p-5 bg-[#111111]/50 flex-1 flex flex-col">
                                <div className="flex justify-between items-center mb-5">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Crucial Skill Analysis</h4>
                                    <span className="text-[10px] text-brand-500 font-bold bg-brand-500/10 px-2 py-1 rounded border border-brand-500/20 uppercase tracking-wide">3 Missing</span>
                                </div>
                                <div className="space-y-3 flex-1">
                                    <div className="flex justify-between items-center bg-[#050505] border border-white/5 rounded-lg py-3 px-4 shadow-sm hover:border-white/10 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                                            <span className="text-sm text-gray-200 font-medium">React & TypeScript</span>
                                        </div>
                                        <span className="text-xs text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded font-semibold overflow-hidden whitespace-nowrap hidden sm:block">Found 6 times</span>
                                    </div>

                                    <div className="flex justify-between items-center bg-[#050505] border border-brand-500/20 rounded-lg py-3 px-4 shadow-sm relative overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500" />
                                        <div className="flex items-center gap-3">
                                            <AlertCircle className="w-4 h-4 text-brand-500" />
                                            <span className="text-sm text-white font-medium">GraphQL API Design</span>
                                        </div>
                                        <button className="text-[10px] uppercase font-bold text-brand-500 hover:text-white bg-brand-500/10 hover:bg-brand-500 transition-colors px-3 py-1.5 rounded">
                                            Add Context
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-center bg-[#050505] border border-yellow-500/20 rounded-lg py-3 px-4 shadow-sm relative overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500" />
                                        <div className="flex items-center gap-3">
                                            <AlertCircle className="w-4 h-4 text-yellow-500" />
                                            <span className="text-sm text-white font-medium">CI/CD Pipelines</span>
                                        </div>
                                        <span className="text-xs text-yellow-500 font-semibold px-2 py-0.5 hidden sm:block">Weak Match</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default InterfaceMockup;
