'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { ReceiptVisual } from './ReceiptVisual';
import { Button } from './ui/Button';
import { GeometricProps } from './landing/GeometricProps';

export const Hero = () => {
    const { publicKey } = useWallet();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative min-h-[75vh] flex items-center justify-center pt-24 pb-20 px-6 overflow-hidden bg-white">
            {/* 3D Abstract Background Atmosphere */}
            <GeometricProps />

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                
                {/* Left Column: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-7 text-left space-y-10"
                >
                    <div className="space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50/50 border border-blue-100/50 rounded-full"
                        >
                            <span className="text-xs font-semibold tracking-wide text-primary">
                                The Solana Tipping Protocol
                            </span>
                        </motion.div>
                        <h1 className="text-6xl lg:text-[5rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-800 to-slate-500 tracking-tighter leading-[1.05]">
                            Your tip <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">waits</span><br/> for them.
                        </h1>
                    </div>
                    
                    <p className="text-xl text-slate-500 max-w-xl leading-relaxed">
                        Send SOL to any handle on X instantly. If the creator isn't on Bags yet, your tip is secured in a vault <span className="text-slate-800 font-semibold">until they join to claim it.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                        {!mounted ? (
                            <div className="w-full sm:w-[200px] h-14 bg-slate-100 animate-pulse rounded-full" />
                        ) : (
                            <Button 
                                href={publicKey ? "/tip/demo" : undefined}
                                onClick={!publicKey ? () => document.querySelector('.wallet-adapter-button')?.dispatchEvent(new MouseEvent('click', {bubbles:true})) : undefined}
                                className="w-full sm:w-[200px] h-14 text-base font-semibold rounded-full bg-primary text-white border-transparent shadow-[0_8px_20px_-6px_rgba(0,102,255,0.4)] hover:shadow-[0_12px_24px_-8px_rgba(0,102,255,0.6)] hover:bg-blue-600 transition-all"
                            >
                                Start Tipping
                            </Button>
                        )}
                        
                        <Button 
                            variant="ghost"
                            href="/claim"
                            className="w-full sm:w-[200px] h-14 text-base font-semibold border-2 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 rounded-full transition-all"
                        >
                            Claim Tips
                        </Button>
                    </div>

                    {/* On-Chain Indicators */}
                    <div className="pt-10 flex flex-wrap gap-8 items-center justify-start border-t border-slate-100">
                        <div className="flex items-center gap-2.5">
                             <div className="w-2 h-2 rounded-full bg-secondary" />
                             <span className="text-xs font-semibold tracking-wide text-slate-400 uppercase">Solana Devnet</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                             <div className="w-2 h-2 rounded-full bg-primary" />
                             <span className="text-xs font-semibold tracking-wide text-slate-400 uppercase">Secure Vault</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Visual Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: 10, y: 50 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-5 hidden lg:block relative"
                >
                    <div className="relative group">
                         {/* Card Glow Effect */}
                         <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-75 group-hover:scale-95 transition-transform duration-1000" />
                         <ReceiptVisual />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
