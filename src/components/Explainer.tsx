'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    {
        number: '01',
        title: 'Tip @handle',
        description: 'Send Solana to any handle on X. No wallet connection or setup needed for the creator.',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        number: '02',
        title: 'Held in Vault',
        description: 'Your tip is secured in a decentralized vault. It waits safely until the recipient is ready.',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zM10 11V7a2 2 0 114 0v4" />
            </svg>
        )
    },
    {
        number: '03',
        title: 'Creator Claims',
        description: 'The creator joins Bags, verifies their X handle, and claims their SOL instantly.',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        )
    }
];

export const Explainer = () => {
    return (
        <section className="py-24 px-6 bg-slate-50/50 border-y border-slate-100 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col items-center mb-16 text-center max-w-2xl mx-auto space-y-4">
                    <span className="text-xs font-semibold tracking-widest text-primary uppercase">Seamless Protocol</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-800 to-slate-500 tracking-tighter">How it works.</h2>
                    <p className="text-slate-500 text-lg">BagsTip removes friction with an automated vault system.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    {/* Bento Card 1 : Wide */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 bg-white p-10 lg:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-[0_30px_60px_-20px_rgba(0,102,255,0.15)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group flex flex-col justify-between min-h-[340px]"
                    >
                        <div className="relative z-10 max-w-lg">
                            <span className="text-5xl font-extrabold text-slate-100 transition-colors duration-500 group-hover:text-blue-50 mb-6 block leading-none">01</span>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Tip any @handle</h3>
                            <p className="text-slate-500 leading-relaxed text-lg">Send Solana to any handle on X instantly. No wallet connection or setup needed for the creator whatsoever.</p>
                        </div>
                        {/* Decorative visual for wide card */}
                        <div className="absolute right-0 bottom-0 translate-y-1/4 translate-x-1/4 opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700 pointer-events-none">
                            <svg className="w-64 h-64 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                    </motion.div>

                    {/* Bento Card 2 : Tall/Square */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-4 bg-primary p-10 lg:p-12 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,102,255,0.4)] hover:shadow-[0_40px_80px_-20px_rgba(0,102,255,0.6)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group flex flex-col justify-between min-h-[340px]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <span className="text-5xl font-extrabold text-white/20 group-hover:text-white/40 transition-colors duration-500 block leading-none">02</span>
                            <div className="pt-12">
                                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Held in Vault</h3>
                                <p className="text-blue-100 leading-relaxed text-base">Your tip is secured in a decentralized vault. It waits safely until the recipient is ready.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bento Card 3 : Full Width Bottom */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:col-span-12 bg-white p-10 lg:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-[0_30px_60px_-20px_rgba(0,102,255,0.15)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group flex flex-col md:flex-row items-center gap-12"
                    >
                        <div className="flex-1 relative z-10 w-full">
                            <span className="text-5xl font-extrabold text-slate-100 group-hover:text-blue-50 transition-colors duration-500 mb-6 block leading-none">03</span>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Creator Claims</h3>
                            <p className="text-slate-500 leading-relaxed max-w-xl">The creator joins Bags, verifies their X identity using standard web2 OAuth, and claims their SOL instantly to their new or existing wallet.</p>
                        </div>
                        <div className="shrink-0 w-full md:w-[350px] h-[140px] bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center relative shadow-inner group-hover:border-blue-100 transition-colors duration-500">
                            <div className="flex items-center gap-5 relative z-10">
                                <div className="w-14 h-14 bg-slate-900 shadow-md shadow-slate-900/20 group-hover:scale-105 transition-transform duration-500 rounded-xl flex items-center justify-center text-white font-extrabold text-lg">X</div>
                                <div className="w-8 h-px bg-slate-300 relative overflow-hidden">
                                     <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-700 delay-100" />
                                </div>
                                <div className="w-14 h-14 bg-primary shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 group-hover:scale-105 transition-all duration-500 delay-150 rounded-xl flex items-center justify-center text-white">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
