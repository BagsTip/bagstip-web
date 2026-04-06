'use client';

import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';

export const Navbar = () => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="sticky top-4 z-50 w-full px-4 md:px-6 flex justify-center pointer-events-none">
            <motion.nav 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-7xl flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-xl border border-zinc-100 rounded-3xl shadow-sm pointer-events-auto"
            >
                <a href="/" className="flex items-center gap-3 shrink-0 transition-opacity hover:opacity-80">
                    <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center shadow-lg shadow-black/10">
                        <span className="text-white font-black text-sm italic">B</span>
                    </div>
                    <span className="text-xl font-black tracking-tight text-black italic uppercase">BagsTip</span>
                </a>

            <div className="flex items-center gap-6">
                <a 
                    href="/dashboard" 
                    className="hidden md:block text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors"
                >
                    Dashboard
                </a>
                <a 
                    href="/claim" 
                    className="hidden sm:block text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors"
                >
                    Claim
                </a>
                <div className="h-4 w-px bg-zinc-200 hidden sm:block" />
                {mounted ? (
                    <WalletMultiButton className="!h-10 !px-4 !rounded-xl !text-xs !font-bold !bg-black hover:!bg-zinc-800 !transition-all shrink-0" />
                ) : (
                    <div className="w-32 h-10 bg-zinc-100 animate-pulse rounded-xl shrink-0" />
                )}
            </div>
            </motion.nav>
        </div>
    );
};
