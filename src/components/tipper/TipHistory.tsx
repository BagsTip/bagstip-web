'use client';

import React from 'react';
import { TipRecord } from '@/lib/types';
import { motion } from 'framer-motion';

export const TipHistory = ({ tips }: { tips: TipRecord[] }) => {
    return (
        <div className="bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm overflow-hidden h-full">
            <div className="px-8 py-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                <h3 className="text-lg font-bold text-black tracking-tight">Tip History</h3>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{tips.length} Total Tips</span>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-zinc-50 bg-zinc-50/20">
                            <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Creator</th>
                            <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Amount</th>
                            <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                            <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Date</th>
                            <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Tx</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                        {tips.map((tip, index) => (
                            <motion.tr 
                                key={tip.id}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group hover:bg-zinc-50/50 transition-colors"
                            >
                                <td className="px-8 py-5 font-bold text-black">@{tip.creator_x_handle}</td>
                                <td className="px-8 py-5">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-black">${tip.amount_usd.toFixed(2)}</span>
                                        <span className="text-[10px] font-bold text-zinc-400">{tip.amount_sol.toFixed(4)} SOL</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <span className={`inline-block px-2.5 py-1 text-[10px] font-black uppercase rounded-full tracking-widest ${
                                        tip.status === 'confirmed' ? 'bg-secondary/10 text-secondary' : 
                                        tip.status === 'pending' ? 'bg-zinc-100 text-zinc-500' : 
                                        'bg-red-50 text-red-500'
                                    }`}>
                                        {tip.status}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-sm font-medium text-zinc-500">
                                    {new Date(tip.created_at).toLocaleDateString(undefined, { 
                                        month: 'short', day: 'numeric', year: 'numeric' 
                                    })}
                                </td>
                                <td className="px-8 py-5">
                                    {tip.tx_sig ? (
                                        <a 
                                            href={`https://solscan.io/tx/${tip.tx_sig}?cluster=devnet`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:text-accent transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    ) : (
                                        <span className="text-zinc-300">—</span>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
                {tips.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-zinc-400 text-sm font-medium">No tips found in your history.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
