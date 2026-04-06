'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Hero = () => {
    return (
        <section className="relative flex flex-col items-center justify-center py-24 px-6 text-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-4xl mx-auto"
            >
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-black mb-6 leading-tight">
                    Tip any creator from X. <br/>
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
                        They join Bags to claim it.
                    </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-zinc-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    If they’re not on Bags yet, your tip waits safely in a vault until they join.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 bg-black text-white rounded-full font-semibold text-lg shadow-xl shadow-zinc-200 hover:bg-zinc-800 transition-all w-full sm:w-auto"
                    >
                        Connect Wallet to Tip
                    </motion.button>
                    
                    <motion.a
                        href="/claim"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 bg-white text-black border border-zinc-200 rounded-full font-semibold text-lg hover:bg-zinc-50 transition-all w-full sm:w-auto"
                    >
                        Claim Your Tips
                    </motion.a>
                </div>
            </motion.div>

            {/* Decorative background element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        </section>
    );
};
