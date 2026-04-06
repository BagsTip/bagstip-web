'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const creators = [
    {
        handle: '@jason_design',
        name: 'Jason Maning',
        role: 'Product Designer',
        avatar: '/avatar_jason_maning_1775494833367.png'
    },
    {
        handle: '@sarah_dev',
        name: 'Sarah Chen',
        role: 'Fullstack Dev',
        avatar: '/avatar_sarah_chen_1775494860030.png'
    },
    {
        handle: '@creator_x',
        name: 'Alex Rivera',
        role: 'Content Artist',
        avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Alex' // Fallback for failed generations
    }
];

export const VerifiedCreators = () => {
    return (
        <section className="py-24 px-6 overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center mb-16 text-center space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary italic">Verified on Bags</span>
                    <h2 className="text-4xl md:text-6xl font-black text-black tracking-tight italic uppercase italic">Top Creators.</h2>
                    <p className="text-zinc-500 font-medium">Join thousands of creators receiving tips instantly on X.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {creators.map((creator, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-[3rem] border border-zinc-100 shadow-soft hover:shadow-xl transition-all group relative overflow-hidden"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-[1.5rem] bg-zinc-50 overflow-hidden shrink-0 border border-zinc-100 group-hover:scale-105 transition-transform">
                                    <img 
                                        src={creator.avatar} 
                                        alt={creator.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xl font-black text-black italic uppercase italic leading-tight">{creator.name}</h4>
                                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{creator.role}</p>
                                    <div className="flex items-center gap-2 pt-1">
                                        <span className="text-primary font-black italic text-[10px] uppercase">{creator.handle}</span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
