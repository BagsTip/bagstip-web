'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ReceiptVisual = () => {
    return (
        <div className="relative w-full max-w-md mx-auto perspective-1000">
            {/* Generic Payment Receipt Template */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: -15, y: 50 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="bg-white border border-zinc-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-8 md:p-10 relative z-10 overflow-hidden"
            >
                {/* Header: Verified Support */}
                <div className="flex flex-col items-center mb-8 border-b-2 border-dashed border-zinc-100 pb-8">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4 shadow-lg shadow-secondary/20">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h4 className="text-xl font-black text-black italic uppercase italic">On-Chain Receipt</h4>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Proof of Payment</p>
                </div>

                {/* Details Section: Generic Template */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-400 font-bold uppercase tracking-widest text-[9px]">Recipient Handle</span>
                        <div className="w-24 h-4 bg-zinc-50 animate-pulse rounded" />
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-400 font-bold uppercase tracking-widest text-[9px]">Amount (SOL)</span>
                        <div className="w-16 h-4 bg-zinc-50 animate-pulse rounded" />
                    </div>

                    <div className="flex justify-between items-center text-sm pt-4 border-t border-zinc-50">
                        <span className="text-zinc-400 font-bold uppercase tracking-widest text-[9px]">Network Status</span>
                        <span className="text-[10px] font-black text-secondary uppercase tracking-widest italic">Confirmed</span>
                    </div>
                </div>

                {/* Brand Footprint */}
                <div className="mt-8 pt-6 border-t-2 border-dashed border-zinc-100 flex items-center justify-center gap-2 grayscale opacity-20">
                    <div className="w-5 h-5 bg-black rounded flex items-center justify-center">
                         <span className="text-[8px] text-white font-black italic italic">B</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest italic italic">BagsTip Protocol</span>
                </div>
            </motion.div>

            {/* Premium Atmosphere Elements */}
            <motion.div 
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.15, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -right-8 -top-8 w-24 h-24 bg-primary rounded-3xl blur-3xl"
            />
            <motion.div 
                animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.05, 0.1, 0.05]
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -left-12 bottom-12 w-32 h-32 bg-secondary rounded-full blur-3xl"
            />
        </div>
    );
};
