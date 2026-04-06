'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ReceiptVisual = () => {
    return (
        <div className="relative w-full max-w-md mx-auto perspective-1000">
            {/* Main Receipt Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: -15, y: 50 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="bg-white border border-zinc-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-8 md:p-10 relative z-10 overflow-hidden"
            >
                {/* Receipt Header */}
                <div className="flex flex-col items-center mb-8 border-b-2 border-dashed border-zinc-100 pb-8">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4 shadow-lg shadow-secondary/20">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h4 className="text-xl font-black text-black italic uppercase italic">Tip Sent!</h4>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">Proof of Support</p>
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Recipient</span>
                        <span className="text-black font-black italic uppercase italic px-3 py-1 bg-zinc-50 rounded-lg">@BagsTip</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Amount</span>
                        <div className="text-right">
                            <span className="text-xl font-black text-black">1.0 SOL</span>
                            <p className="text-[10px] font-bold text-zinc-400">≈ $184.20 USD</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-sm pt-4 border-t border-zinc-50">
                        <span className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Transaction ID</span>
                        <span className="text-[10px] font-mono text-zinc-400 bg-zinc-50 px-2 py-1 rounded">2q5k...m8vz</span>
                    </div>
                </div>

                {/* Footer Brand */}
                <div className="mt-8 pt-6 border-t-2 border-dashed border-zinc-100 flex items-center justify-center gap-2 grayscale opacity-30">
                    <div className="w-5 h-5 bg-black rounded flex items-center justify-center">
                         <span className="text-[8px] text-white font-black italic italic">B</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest italic italic">BagsTip</span>
                </div>
            </motion.div>

            {/* Decorative "Floaty" items background */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 0.15, x: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute -right-8 -top-8 w-24 h-24 bg-primary rounded-3xl blur-3xl"
            />
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.1, x: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute -left-12 bottom-12 w-32 h-32 bg-secondary rounded-full blur-3xl"
            />
        </div>
    );
};
