'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        question: "Is my tip safe in the vault?",
        answer: "Yes. Every tip is held in a secure, decentralized vault on the Solana blockchain. Funds can only be released once the creator successfully verifies their X identity through our multi-step protocol."
    },
    {
        question: "How long can a tip stay in the vault?",
        answer: "There is no time limit. Your tip will wait securely until the creator joins Bags and links their account. You can track the status of your tip in your Tipper Dashboard."
    },
    {
        question: "Does the creator need a Solana wallet?",
        answer: "Initially, no. You can tip any handle regardless of whether they have a wallet. The creator will only need to connect a wallet when they are ready to claim their accumulated tips."
    },
    {
        question: "What are the fees?",
        answer: "BagsTip is built on Solana for ultra-low fees. There is a minimal protocol fee of 1% to ensure the sustainability of the vault infrastructure."
    }
];

export const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-20 px-6 bg-white relative">
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="flex flex-col items-center mb-12 text-center space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Got Questions?</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight italic uppercase">Common Concerns.</h2>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index}
                            className="bg-white border border-zinc-100 rounded-[2.5rem] overflow-hidden shadow-soft hover:shadow-xl transition-all"
                        >
                            <button 
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full p-8 text-left flex justify-between items-center hover:bg-zinc-50 transition-colors group"
                            >
                                <span className="text-xl font-black text-black italic uppercase italic tracking-tight group-hover:text-primary transition-colors">
                                    {faq.question}
                                </span>
                                <motion.span 
                                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                    className="text-primary bg-primary/5 p-2 rounded-xl"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </motion.span>
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-8 pb-8 text-slate-500 font-medium leading-relaxed prose prose-sm max-w-none">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
