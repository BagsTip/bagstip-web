'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    {
        number: '01',
        title: 'Tip @handle',
        description: 'Send Solana to any handle on X. No wallet connection or setup needed for the creator.',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        number: '02',
        title: 'Held in Vault',
        description: 'Your tip is secured in a decentralized vault. It waits safely until the recipient is ready.',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zM10 11V7a2 2 0 114 0v4" />
            </svg>
        )
    },
    {
        number: '03',
        title: 'Creator Claims',
        description: 'The creator joins Bags, verifies their X handle, and claims their SOL instantly.',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        )
    }
];

export const Explainer = () => {
    return (
        <section className="py-32 px-6 bg-zinc-50 border-y border-zinc-100">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center mb-20 text-center max-w-2xl mx-auto space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary italic">Step-by-Step Flow</span>
                    <h2 className="text-4xl md:text-6xl font-black text-black tracking-tight italic uppercase italic">How it works.</h2>
                    <p className="text-zinc-500 font-medium">BagsTip removes the friction from supporting creators.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group"
                        >
                            <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors">
                                {step.icon}
                            </div>
                            <span className="text-4xl font-black text-black/5 mb-4 block leading-none">{step.number}</span>
                            <h3 className="text-2xl font-black text-black mb-4 italic uppercase italic">{step.title}</h3>
                            <p className="text-zinc-500 font-medium leading-relaxed">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
