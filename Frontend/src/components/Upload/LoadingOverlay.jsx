import React from 'react';
import { motion } from 'framer-motion';
import UniqueLoading from '../UI/MorphLoading';

const LoadingOverlay = () => {
    return (
        <div className="fixed inset-0 z-50 bg-[#000000]/90 backdrop-blur-xl flex flex-col items-center justify-center min-h-screen text-white font-sans">
            <div className="mb-12">
                <UniqueLoading variant="morph" size="lg" />
            </div>
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-3 tracking-tight text-white"
            >
                Analyzing your resume...
            </motion.h2>
            <p className="text-gray-400 text-lg flex items-center gap-2">
                This may take 30-60 seconds
                <span className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-[bounce_1s_infinite_0ms]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-[bounce_1s_infinite_200ms]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-[bounce_1s_infinite_400ms]"></span>
                </span>
            </p>
        </div>
    );
}

export default LoadingOverlay;
