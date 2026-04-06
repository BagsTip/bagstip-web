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
        <motion.nav 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 mx-auto max-w-7xl glass rounded-2xl mt-4"
        >
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
                    <span className="text-white font-bold text-xs">B</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-black">BagsTip</span>
            </div>

            <div className="flex items-center gap-4">
                <a 
                    href="/claim" 
                    className="hidden sm:block text-sm font-medium text-zinc-600 hover:text-black transition-colors"
                >
                    Claim Tips
                </a>
                {mounted && <WalletMultiButton />}
            </div>
        </motion.nav>
    );
};
