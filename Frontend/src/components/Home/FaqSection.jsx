import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FaqSection = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            q: "Is MatchMySkill really free?",
            a: "Yes! Core resume parsing and job description matching is completely free to use to help you land your next role faster."
        },
        {
            q: "How accurate is the AI?",
            a: "Our Gemini-backed engine has an industry-leading 98% accuracy rate in mapping missing constraints vs. job requirements."
        },
        {
            q: "What file formats are supported?",
            a: "We currently support standard PDF, DOCX (Microsoft Word), DOC, and plain TXT files."
        },
        {
            q: "Do you store my resume data?",
            a: "Absolutely not. We process your data in memory entirely for the analysis and never permanently store your sensitive information on our servers."
        }
    ];

    return (
        <section className="py-24 px-6 border-t border-white/5 bg-[#050505]" id="faq">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions.</h2>
                    <p className="text-gray-400 text-sm">Everything you need to know about the product and how it analyzes your resume.</p>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            className="border border-white/5 bg-[#0a0a0a] p-5 rounded-xl cursor-pointer hover:border-white/20 transition-all shadow-sm overflow-hidden"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-white font-medium">{faq.q}</span>
                                <motion.div
                                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                </motion.div>
                            </div>
                            <AnimatePresence>
                                {openFaq === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                        animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-3">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
