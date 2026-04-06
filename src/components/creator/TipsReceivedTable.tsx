'use client';

import React from 'react';
import { TipReceivedRecord } from '@/lib/types';
import { motion } from 'framer-motion';

export const TipsReceivedTable = ({ tips }: { tips: TipReceivedRecord[] }) => {
    return (
        <div className="bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm overflow-hidden h-full">
            <div className="px-8 py-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                <h3 className="text-lg font-bold text-black tracking-tight">Tips Received</h3>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{tips.length} Total Tips</span>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-zinc-50 bg-zinc-50/20">
                            <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">From</th>
                            <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Amount (USD)</th>
                            <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                            <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Date</th>
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
                                <td className="px-8 py-5 font-bold text-black">
                                    {tip.from_x_handle ? `@${tip.from_x_handle}` : 'Anonymous'}
                                </td>
                                <td className="px-8 py-5">
                                    <span className="text-sm font-bold text-black">${tip.amount_usd.toFixed(2)}</span>
                                </td>
                                <td className="px-8 py-5">
                                    <span className={`inline-block px-2.5 py-1 text-[10px] font-black uppercase rounded-full tracking-widest ${
                                        tip.status === 'claimed' ? 'bg-secondary/10 text-secondary' : 
                                        'bg-zinc-100 text-zinc-500'
                                    }`}>
                                        {tip.status}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-sm font-medium text-zinc-500">
                                    {new Date(tip.created_at).toLocaleDateString(undefined, { 
                                        month: 'short', day: 'numeric', year: 'numeric' 
                                    })}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
                {tips.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-zinc-400 text-sm font-medium">No tips received yet. Keep building!</p>
                    </div>
                )}
            </div>
        </div>
    );
};
