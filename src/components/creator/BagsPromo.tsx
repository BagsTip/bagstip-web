'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const BagsPromo = () => {
    return (
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-black/5 p-8 rounded-[2.5rem] shadow-sm h-full flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            {/* Animated background shape */}
            <motion.div 
                animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/30 rounded-full blur-3xl pointer-events-none"
            />

            <div className="flex-1 relative z-10 text-center md:text-left">
                <h3 className="text-2xl font-black text-black mb-3 italic tracking-tight uppercase">Unlock More Creator Tools</h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                    Move your tipping flow to **Bags.fm** for advanced analytics, multiple token support, and exclusive creator perks.
                </p>
            </div>

            <div className="relative z-10">
                <motion.a 
                    href="https://bags.fm"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block px-8 py-4 bg-black text-white rounded-2xl font-bold text-sm shadow-xl shadow-black/10 hover:bg-zinc-800 transition-colors"
                >
                    Learn about Bags.fm
                </motion.a>
            </div>
        </div>
    );
};
