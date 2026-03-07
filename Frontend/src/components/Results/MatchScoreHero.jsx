import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target } from 'lucide-react';

const MatchScoreHero = ({ matchScore, fileName, jobTitle, getScoreColor, radius, circumference, strokeDashoffset }) => {
    const scoreColor = getScoreColor();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#050505] border border-white/5 rounded-[2rem] p-10 sm:p-16 mb-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl group"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative z-10 flex flex-col md:w-1/2 text-left mb-10 md:mb-0">
                <span className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold tracking-widest uppercase text-brand-400 mb-6">
                    <Sparkles size={12} /> Analysis Verified
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                    {matchScore >= 80 ? 'Exceptional fit.' : matchScore >= 60 ? 'Strong potential.' : 'Gap detected.'}
                </h1>
                <p className="text-gray-400 text-base max-w-sm mb-8 leading-relaxed">
                    Your resume <strong className="text-gray-200">{fileName}</strong> has been systematically parsed against <strong className="text-gray-200">{jobTitle}</strong>.
                </p>
                <div className="flex gap-4 items-center">
                    <span className="text-sm font-medium text-gray-400 flex items-center"><Target size={16} className="mr-2 text-brand-500" /> Ranked Context</span>
                </div>
            </div>

            <div className="relative z-10 w-full md:w-1/2 flex justify-center md:justify-end pr-0 md:pr-10">
                <div className="relative w-[280px] h-[280px] flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50 rounded-full blur-xl border border-white/5 shadow-inner" />
                    <svg className="w-full h-full -rotate-90 transform drop-shadow-2xl" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
                        <motion.circle
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                            cx="100"
                            cy="100"
                            r={radius}
                            fill="none"
                            stroke={scoreColor.stroke}
                            strokeWidth="8"
                            strokeDasharray={circumference}
                            strokeLinecap="round"
                            style={{ filter: `drop-shadow(0 0 10px ${scoreColor.glow})` }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
                            className="text-7xl font-black bg-white bg-clip-text text-transparent tracking-tighter"
                        >
                            {matchScore}<span className="text-3xl text-gray-500 font-medium ml-1">%</span>
                        </motion.span>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mt-2">Overall Match</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MatchScoreHero;
