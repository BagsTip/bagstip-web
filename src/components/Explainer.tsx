'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    {
        number: '01',
        title: 'Tip a creator from X',
        description: 'Send Solana or tokens to any handle on X. No setup required for the sender.'
    },
    {
        number: '02',
        title: 'Funds are held safely',
        description: 'Tips are locked in a secure vault until the creator links their X account to BagsTip.'
    },
    {
        number: '03',
        title: 'Creator claims tips',
        description: 'Once they join Bags, their tips are automatically available for claiming.'
    }
];

export const Explainer = () => {
    return (
        <section className="py-24 px-6 bg-zinc-50 border-y border-zinc-100">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center mb-16 text-center max-w-2xl mx-auto">
                    <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 px-3 py-1 bg-secondary/10 rounded-full">How it works</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-black mb-4 tracking-tight">The simplest way to tip.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <span className="text-4xl font-black text-black/5 mb-4 block leading-none">{step.number}</span>
                            <h3 className="text-xl font-bold text-black mb-3 leading-tight">{step.title}</h3>
                            <p className="text-zinc-500 leading-relaxed">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
