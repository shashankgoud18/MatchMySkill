import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle } from 'lucide-react';

const FileUploadZone = ({
    uploadedFile,
    fileInputRef,
    onFileInputChange,
    extractionProgress,
    onReplaceFile,
    onRemoveFile
}) => {
    return (
        <div className="flex flex-col h-full relative group">
            <div className="absolute -inset-1 bg-gradient-to-b from-brand-500/10 to-transparent blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div
                onClick={() => !uploadedFile && fileInputRef.current?.click()}
                className={`relative z-10 flex-1 rounded-3xl p-8 sm:p-12 transition-all duration-300 min-h-[400px] flex flex-col justify-center
          ${!uploadedFile
                        ? 'bg-[#0a0a0a] hover:bg-[#111111] border border-dashed border-white/20 hover:border-brand-500/50 cursor-pointer'
                        : 'bg-[#0a0a0a] border border-white/10 shadow-[0_0_30px_rgba(239,68,68,0.05)]'
                    }`}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    accept=".pdf,.docx,.doc,.txt"
                    onChange={onFileInputChange}
                    className="hidden"
                />

                {!uploadedFile ? (
                    <div className="text-center group-hover:-translate-y-1 transition-transform duration-300">
                        <div className="bg-[#111111] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5 group-hover:border-brand-500/30 group-hover:bg-brand-500/5 transition-colors shadow-lg">
                            <Upload className="text-gray-500 group-hover:text-brand-400 transition-colors" size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Drag & drop your resume here</h3>
                        <p className="text-gray-500 text-sm mb-6">or click to browse</p>
                        <p className="text-xs text-gray-600 font-medium">Maximum file size: 10MB</p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center h-full"
                    >
                        <div className="bg-brand-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                            <FileText className="text-brand-400" size={36} />
                        </div>

                        <div className="text-center w-full max-w-sm">
                            <h3 className="text-lg font-semibold text-white mb-1 truncate px-4">{uploadedFile.name}</h3>
                            <p className="text-gray-400 text-xs mb-8 uppercase tracking-wider block">
                                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • {uploadedFile.name.split('.').pop()}
                            </p>

                            {extractionProgress > 0 && extractionProgress < 100 ? (
                                <div className="w-full bg-[#111111] rounded-full h-2 mb-2 overflow-hidden border border-white/5">
                                    <div
                                        className="bg-brand-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${extractionProgress}%` }}
                                    ></div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2 text-[#10B981] mb-8 font-medium bg-[#10B981]/10 px-4 py-2 rounded-lg inline-flex border border-[#10B981]/20 shadow-sm">
                                    <CheckCircle size={18} />
                                    Ready for analysis
                                </div>
                            )}

                            <div className="flex items-center justify-center gap-4">
                                <button
                                    onClick={onReplaceFile}
                                    className="text-sm font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl transition-all duration-200"
                                >
                                    Replace File
                                </button>
                                <button
                                    onClick={onRemoveFile}
                                    className="text-sm font-medium text-[#EF4444] hover:text-[#EF4444] bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/20 hover:border-[#EF4444]/50 px-4 py-2.5 rounded-xl transition-all duration-200"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default FileUploadZone;
