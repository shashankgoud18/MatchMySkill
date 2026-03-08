import React from 'react';
import { FileCheck, Twitter, Github, Linkedin } from 'lucide-react';

const FooterSection = ({ onStartAnalysis }) => {
    return (
        <>
            {/* Footer CTA */}
            <section className="py-12 px-6">
                <div className="max-w-4xl mx-auto bg-brand-500 rounded-3xl p-12 text-center relative overflow-hidden shadow-[0_0_40px_rgba(239,68,68,0.2)]">
                    <div className="relative z-10">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Build your resume faster, for free.</h2>
                        <p className="text-brand-100 mb-8 max-w-lg mx-auto text-sm sm:text-base">Upload your document and a job description. Let AI do the heavy lifting in seconds and secure your next interview.</p>
                        <button
                            onClick={onStartAnalysis}
                            className="bg-white text-brand-600 font-bold px-8 py-3.5 rounded-xl hover:scale-105 transition-all shadow-xl"
                        >
                            Start Analysis Now
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#050505] pt-20 pb-10 border-t border-white/5 mt-auto">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-16">

                        {/* Brand Column */}
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2 -ml-2 mb-6">
                                <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                                    <FileCheck className="text-white w-4 h-4 ml-0.5" />
                                </div>
                                <span className="font-bold text-xl tracking-tight text-white">MatchMySkill</span>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed mb-6 pe-4">
                                The ultimate AI-powered resume parser engineered to secure your next interview by perfectly matching job descriptions.
                            </p>
                            <div className="flex gap-4">
                                <a href="https://x.com/shashankgoud_19" target='_blank' rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-500/20 hover:text-brand-500 text-gray-400 transition-colors">
                                    <Twitter className="w-4 h-4" />
                                </a>
                                <a href="https://www.linkedin.com/in/shashank-goud18" target='_blank' rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-500/20 hover:text-brand-500 text-gray-400 transition-colors">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                                <a href="https://github.com/shashankgoud18/" target='_blank' rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-500/20 hover:text-brand-500 text-gray-400 transition-colors">
                                    <Github className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {/* Links Columns */}
                        <div>
                            <h4 className="text-white font-bold mb-6 tracking-wide">Product</h4>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><a href="#!" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#!" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#!" className="hover:text-white transition-colors">How it Works</a></li>
                                <li><a href="#!" className="hover:text-white transition-colors">Release Notes</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6 tracking-wide">Resources</h4>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><a href="#!" className="hover:text-white transition-colors">Resume Templates</a></li>
                                <li><a href="#!" className="hover:text-white transition-colors">Career Blog</a></li>
                                <li><a href="#!" className="hover:text-white transition-colors">Cover Letter Guide</a></li>
                                <li><a href="#!" className="hover:text-white transition-colors">Help Center</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6 tracking-wide">Company</h4>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><a href="#!" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#!" className="hover:text-white transition-colors">Contact</a></li>
                                <li><a href="#!" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#!" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            </ul>
                        </div>

                    </div>

                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-500 font-medium">© {new Date().getFullYear()} MatchMySkill AI. All rights reserved.</p>
                        <div className="flex gap-6 text-sm text-gray-500 font-medium">
                            <span>Made for job seekers locally.</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterSection;
