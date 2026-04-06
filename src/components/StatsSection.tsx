'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { label: 'Total Tipped', value: '$1.2M+' },
    { label: 'Active Creators', value: '50k+' },
    { label: 'Avg. Claim Time', value: '< 5s' },
    { label: 'On-Chain Security', value: '100%' },
];

export const StatsSection = () => {
    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center space-y-2 border-l border-zinc-100 first:border-l-0 md:border-l md:first:border-l-0"
                        >
                            <h4 className="text-3xl md:text-5xl font-black text-black tracking-tight italic uppercase italic">
                                {stat.value}
                            </h4>
                            <p className="text-[10px] md:text-xs font-black text-zinc-400 uppercase tracking-widest italic italic">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
