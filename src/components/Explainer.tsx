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
        <section className="py-20 px-6 bg-zinc-50 border-y border-zinc-100 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col items-center mb-16 text-center max-w-2xl mx-auto space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Seamless Protocol</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight italic uppercase">How it works.</h2>
                    <p className="text-slate-500 font-medium text-lg">BagsTip removes friction with an automated vault system.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    {/* Bento Card 1 : Wide */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 bg-white p-10 lg:p-14 rounded-[3rem] border border-zinc-100 shadow-soft hover:shadow-xl transition-all relative overflow-hidden group"
                    >
                        <div className="relative z-10 max-w-lg">
                            <span className="text-6xl font-black text-black/5 mb-4 block leading-none">01</span>
                            <h3 className="text-3xl font-black text-black mb-4 italic uppercase">Tip @handle</h3>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed">Send Solana to any handle on X instantly. No wallet connection or setup needed for the creator whatsoever.</p>
                        </div>
                        {/* Decorative visual for wide card */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <svg className="w-96 h-96 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                    </motion.div>

                    {/* Bento Card 2 : Tall/Square */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-4 bg-primary p-10 lg:p-14 rounded-[3rem] shadow-soft hover:shadow-xl transition-all relative overflow-hidden group"
                    >
                        <div className="relative z-10">
                            <span className="text-6xl font-black text-white/20 mb-4 block leading-none">02</span>
                            <h3 className="text-3xl font-black text-white mb-4 italic uppercase">Held in<br/>Vault</h3>
                            <p className="text-blue-100 font-medium leading-relaxed">Your tip is secured in a decentralized vault. It waits safely until the recipient is ready.</p>
                        </div>
                    </motion.div>

                    {/* Bento Card 3 : Full Width Bottom */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:col-span-12 bg-white p-10 lg:p-14 rounded-[3rem] border border-zinc-100 shadow-soft hover:shadow-xl transition-all relative overflow-hidden group flex flex-col md:flex-row items-center gap-10"
                    >
                        <div className="flex-1 relative z-10">
                            <span className="text-6xl font-black text-black/5 mb-4 block leading-none">03</span>
                            <h3 className="text-3xl font-black text-black mb-4 italic uppercase">Creator Claims</h3>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-xl">The creator joins Bags, verifies their X identity using standard web2 OAuth, and claims their SOL instantly to their new or existing wallet.</p>
                        </div>
                        <div className="shrink-0 w-full md:w-[400px] h-40 bg-zinc-50 rounded-[2rem] border border-zinc-100 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 bg-center" />
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white font-black italic">X</div>
                                <div className="w-6 h-1 bg-zinc-200 rounded-full" />
                                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
