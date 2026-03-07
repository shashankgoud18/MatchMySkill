import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle,
    AlertCircle,
    Sparkles,
    Target,
    TrendingUp,
    Lightbulb,
    ChevronDown,
    Check,
    ArrowRight
} from 'lucide-react';

const AnalysisDetails = ({
    presentSkills,
    missingSkills,
    overallFeedback,
    industryAlignment,
    nextSteps,
    strengthAreas,
    suggestions,
    improvementPriority,
    keywordMatches,
    expandedSections,
    toggleSection
}) => {
    return (
        <div className="space-y-6">

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/5 relative overflow-hidden group"
                >
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex justify-center items-center">
                            <CheckCircle size={18} className="text-emerald-500" />
                        </div>
                        Acquired Skills
                    </h3>
                    {presentSkills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {presentSkills.map((skill, i) => (
                                <span key={i} className="bg-white/5 border border-white/5 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No matched skills detected.</p>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/5 relative overflow-hidden"
                >
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex justify-center items-center">
                            <AlertCircle size={18} className="text-red-500" />
                        </div>
                        Missing Requirements
                    </h3>
                    {missingSkills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {missingSkills.map((skill, i) => (
                                <span key={i} className="bg-red-500/5 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-lg text-sm font-medium shadow-[0_0_10px_rgba(239,68,68,0.05)]">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">You satisfy all critical core skills.</p>
                    )}
                </motion.div>
            </div>

            {/* Expert Feedback Panel */}
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="bg-[#080808] border border-white/10 p-8 sm:p-10 rounded-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-500 glow-left-border" />
                <h3 className="text-xl font-extrabold text-white mb-6 flex items-center gap-3">
                    <Sparkles size={20} className="text-brand-500" />
                    Intelligence Briefing
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed tracking-wide">{overallFeedback}</p>
                {industryAlignment && (
                    <div className="mt-8 pt-6 border-t border-white/5">
                        <h4 className="text-xs font-bold tracking-[0.15em] text-gray-500 uppercase mb-3">Industry Alignment Vector</h4>
                        <p className="text-gray-400 leading-relaxed text-sm bg-white/5 p-4 rounded-xl border border-white/5">{industryAlignment}</p>
                    </div>
                )}
            </motion.div>

            {/* Actionable Pipeline */}
            {nextSteps.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="bg-[#0a0a0a] p-8 sm:p-10 rounded-2xl border border-white/5 shadow-2xl relative"
                >
                    <div className="absolute right-0 top-0 w-64 h-64 bg-brand-500/5 rounded-full blur-[80px] pointer-events-none" />
                    <h3 className="text-xl font-extrabold text-white mb-8 flex items-center gap-3">
                        <Target size={22} className="text-brand-500" />
                        Strategic Action Plan
                    </h3>
                    <div className="space-y-3">
                        {nextSteps.map((step, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-xl bg-black border border-white/5 hover:border-brand-500/30 transition-all duration-300 group">
                                <div className="w-8 h-8 rounded-lg bg-white/5 text-gray-400 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                                    0{idx + 1}
                                </div>
                                <p className="text-gray-300 leading-relaxed text-sm flex-1">{step}</p>
                                <ArrowRight size={16} className="text-gray-600 sm:opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Expandable Meta Data */}
            <div className="space-y-3 pt-6">

                {/* Strengths Accordion */}
                {strengthAreas.length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden transition-all duration-300">
                        <button
                            onClick={() => toggleSection('strengths')}
                            className="w-full px-8 py-6 flex items-center justify-between bg-transparent hover:bg-white/5 transition-colors focus:outline-none"
                        >
                            <h3 className="text-base font-bold text-white flex items-center gap-3">
                                <TrendingUp size={18} className="text-emerald-500" /> Validation Areas
                            </h3>
                            <ChevronDown size={18} className={`text-gray-500 transition-transform duration-300 ${expandedSections.strengths ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {expandedSections.strengths && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-8 pb-8 pt-2"
                                >
                                    <ul className="space-y-4">
                                        {strengthAreas.map((area, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <Check size={16} className="text-emerald-500 mt-1 shrink-0" />
                                                <span className="text-gray-400 text-sm leading-relaxed">{area}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Suggestions Accordion */}
                {suggestions.length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden transition-all duration-300">
                        <button
                            onClick={() => toggleSection('improvements')}
                            className="w-full px-8 py-6 flex items-center justify-between bg-transparent hover:bg-white/5 transition-colors focus:outline-none"
                        >
                            <h3 className="text-base font-bold text-white flex items-center gap-3">
                                <Lightbulb size={18} className="text-yellow-500" /> Enhancement Directives
                            </h3>
                            <ChevronDown size={18} className={`text-gray-500 transition-transform duration-300 ${expandedSections.improvements ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {expandedSections.improvements && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                    className="px-8 pb-8 pt-2"
                                >
                                    <div className="space-y-6">
                                        {improvementPriority.length > 0 && (
                                            <div>
                                                <div className="inline-flex items-center px-2.5 py-1 rounded bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-widest mb-4 border border-red-500/20">
                                                    High Priority
                                                </div>
                                                <ol className="space-y-3 pl-2">
                                                    {improvementPriority.map((item, idx) => (
                                                        <li key={idx} className="text-gray-400 text-sm leading-relaxed pl-4 relative border-l-2 border-white/5 pb-2">
                                                            <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>
                                        )}
                                        <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent my-6"></div>
                                        <ul className="space-y-3 pl-2">
                                            {suggestions.map((suggestion, idx) => (
                                                <li key={idx} className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5">
                                                    <span className="text-yellow-500/50 font-bold text-xs mt-0.5 shrink-0 w-4">{idx + 1}.</span>
                                                    <span className="text-gray-400 text-sm leading-relaxed">{suggestion}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Keyword Meta Data */}
                {keywordMatches && (keywordMatches.matched?.length > 0 || keywordMatches.missing?.length > 0) && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden transition-all duration-300">
                        <button
                            onClick={() => toggleSection('keywords')}
                            className="w-full px-8 py-6 flex items-center justify-between bg-transparent hover:bg-white/5 transition-colors focus:outline-none"
                        >
                            <h3 className="text-base font-bold text-white flex items-center gap-3">
                                <span className="w-6 h-6 rounded bg-[#111] border border-white/10 flex items-center justify-center text-xs font-mono text-gray-400">{'{}'}</span>
                                Raw Keyword Parsing
                            </h3>
                            <ChevronDown size={18} className={`text-gray-500 transition-transform duration-300 ${expandedSections.keywords ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {expandedSections.keywords && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                    className="px-8 pb-8 pt-2 grid grid-cols-1 sm:grid-cols-2 gap-8"
                                >
                                    <div>
                                        <h4 className="text-xs font-bold tracking-widest text-emerald-500 uppercase mb-4 flex items-center gap-2">
                                            Found Variables
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {keywordMatches.matched?.map((keyword, i) => (
                                                <span key={i} className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded text-xs">
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold tracking-widest text-red-500 uppercase mb-4 flex items-center gap-2">
                                            Missing Variables
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {keywordMatches.missing?.map((keyword, i) => (
                                                <span key={i} className="bg-red-500/5 text-red-400 border border-red-500/10 px-2.5 py-1 rounded text-xs opacity-70 hover:opacity-100 transition-opacity">
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default AnalysisDetails;
