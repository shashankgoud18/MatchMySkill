import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = ({ onStartAnalysis }) => {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 pointer-events-none">
                <div className="absolute inset-0 rounded-[100%] bg-brand-500 blur-[120px]" />
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
                >
                    <Sparkles className="w-4 h-4 text-brand-500" />
                    <span className="text-xs font-semibold text-gray-300">MatchMySkill AI v2.0 is live</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
                >
                    Deliver an enterprise quality <br className="hidden md:block" />
                    <span className="text-gray-400">resume match in seconds.</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
                >
                    <button
                        onClick={onStartAnalysis}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                    >
                        Start for free <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => { document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }) }}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#111111] border border-white/5 hover:bg-[#1a1a1a] text-white font-semibold transition-all"
                    >
                        Learn more
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
