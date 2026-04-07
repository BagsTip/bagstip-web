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
                className="w-full max-w-7xl flex items-center justify-between px-6 py-4 bg-white/60 backdrop-blur-3xl ring-1 ring-slate-900/5 shadow-xl shadow-slate-200/50 rounded-3xl pointer-events-auto transition-all"
            >
                <a href="/" className="flex items-center gap-3 shrink-0 transition-opacity hover:opacity-80">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-md shadow-slate-900/20">
                        <span className="text-white font-bold text-lg">B</span>
                    </div>
                    <span className="text-xl font-extrabold tracking-tight text-slate-900">BagsTip</span>
                </a>

            <div className="flex items-center gap-6">
                <a 
                    href="/dashboard" 
                    className="hidden md:block text-sm font-semibold tracking-wide text-slate-500 hover:text-slate-900 transition-colors"
                >
                    Dashboard
                </a>
                <a 
                    href="/claim" 
                    className="hidden sm:block text-sm font-semibold tracking-wide text-slate-500 hover:text-slate-900 transition-colors"
                >
                    Claim
                </a>
                <div className="h-4 w-px bg-slate-200 hidden sm:block" />
                {mounted ? (
                    <WalletMultiButton className="!h-10 !px-5 !rounded-xl !text-sm !font-semibold !bg-primary hover:!bg-blue-600 !transition-all shrink-0 !shadow-[0_8px_20px_-6px_rgba(0,102,255,0.4)] hover:!shadow-[0_12px_24px_-8px_rgba(0,102,255,0.6)]" />
                ) : (
                    <div className="w-32 h-10 bg-slate-100 animate-pulse rounded-xl shrink-0" />
                )}
            </div>
            </motion.nav>
        </div>
    );
};
