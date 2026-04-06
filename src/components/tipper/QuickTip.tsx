'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export const QuickTip = () => {
    const [handle, setHandle] = useState('');
    const router = useRouter();

    const handleRedirect = (e: React.FormEvent) => {
        e.preventDefault();
        if (!handle) return;
        const cleanHandle = handle.startsWith('@') ? handle.slice(1) : handle;
        router.push(`/tip/${cleanHandle}`);
    };

    return (
        <div className="bg-zinc-50 border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm h-full flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center">
                        <span className="text-xl">🎯</span>
                    </div>
                    <h3 className="text-lg font-bold text-black tracking-tight">Quick Tip via Web</h3>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                    Enter any X handle to visit their tipping page and send SOL instantly.
                </p>
            </div>

            <form onSubmit={handleRedirect} className="space-y-3">
                <input 
                    type="text"
                    placeholder="@handle"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full bg-white border border-zinc-100 p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-hidden transition-all"
                />
                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={!handle}
                    className="w-full py-4 bg-black text-white rounded-2xl font-bold text-sm hover:bg-zinc-800 transition-colors disabled:opacity-50"
                >
                    Visit Tipper Page
                </motion.button>
            </form>
        </div>
    );
};
