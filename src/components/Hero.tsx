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
        <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-32 px-6 overflow-hidden bg-white">
            {/* 3D Abstract Background Atmosphere */}
            <GeometricProps />

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-20 items-center relative z-10">
                
                {/* Left Column: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-7 text-left space-y-12"
                >
                    <div className="space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3 px-5 py-2 bg-zinc-50 border border-zinc-100 rounded-full"
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 italic">
                                The Solana Tipping Protocol
                            </span>
                            <div className="flex items-center gap-1.5 border-l border-zinc-200 pl-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                            </div>
                        </motion.div>
                        <h1 className="text-6xl md:text-8xl font-black text-black tracking-tight leading-[0.9] italic uppercase">
                            Your Tip <br/>
                            <span className="text-primary italic">Waits</span> for them.
                        </h1>
                    </div>
                    
                    <p className="text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed font-medium">
                        Send SOL to any handle on X instantly. If the creator isn't on Bags yet, your tip is secured in a vault <span className="text-black font-bold">until they join to claim it.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 pt-4">
                        {!mounted ? (
                            <div className="w-full sm:w-[220px] h-14 bg-zinc-50 animate-pulse rounded-full" />
                        ) : (
                            <Button 
                                href={publicKey ? "/tip/demo" : undefined}
                                onClick={!publicKey ? () => document.querySelector('.wallet-adapter-button')?.dispatchEvent(new MouseEvent('click', {bubbles:true})) : undefined}
                                className="w-full sm:w-[220px] h-14 text-lg rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,102,255,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(0,102,255,0.4)]"
                            >
                                Start Tipping
                            </Button>
                        )}
                        
                        <Button 
                            variant="ghost"
                            href="/claim"
                            className="w-full sm:w-[220px] h-14 text-lg border-2 border-zinc-100 hover:border-black rounded-[2rem]"
                        >
                            Claim Your Tips
                        </Button>
                    </div>

                    {/* On-Chain Indicators */}
                    <div className="pt-10 flex flex-wrap gap-10 items-center justify-start border-t border-zinc-50">
                        <div className="flex items-center gap-3">
                             <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">Solana Devnet</span>
                        </div>
                        <div className="flex items-center gap-3">
                             <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">Secure Vault Protocol</span>
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
