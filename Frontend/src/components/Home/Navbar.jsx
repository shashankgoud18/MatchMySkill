import React from 'react';
import { motion } from 'framer-motion';
import { FileCheck } from 'lucide-react';

const Navbar = ({ onStartAnalysis }) => {
    return (
        <div className="fixed top-4 sm:top-6 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-4xl bg-[#000000]/60 backdrop-blur-xl border border-white/10 rounded-full py-2.5 px-4 sm:px-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] pointer-events-auto"
            >
                <div className="flex items-center justify-between relative">
                    <div className="flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => window.scrollTo(0, 0)}>
                        <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center shrink-0">
                            <FileCheck className="text-white w-4 h-4 ml-0.5" />
                        </div>
                        <span className="font-bold text-base tracking-tight text-white hidden sm:block">MatchMySkill</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                        <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</a>
                        <a href="#how-it-works" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">How it works</a>
                        <a href="#faq" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">FAQ</a>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                        <button className="hidden sm:block text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            Log in
                        </button>
                        <button
                            onClick={onStartAnalysis}
                            className="px-4 sm:px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-200 hover:scale-105 transition-all shadow-md whitespace-nowrap"
                        >
                            Get started
                        </button>
                    </div>
                </div>
            </motion.nav>
        </div>
    );
};

export default Navbar;
