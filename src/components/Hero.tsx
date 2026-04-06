'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { ReceiptVisual } from './ReceiptVisual';
import { Button } from './ui/Button';

export const Hero = () => {
    const { publicKey } = useWallet();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative min-h-[85vh] flex items-center justify-center py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                {/* Left Column: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="lg:col-span-7 text-left space-y-10"
                >
                    <div className="space-y-4">
                        <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="inline-block px-4 py-1.5 bg-zinc-50 border border-zinc-100 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 italic italic"
                        >
                            The Solana Tipping Protocol
                        </motion.span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-black tracking-tight leading-[0.9] italic uppercase italic">
                            Your Tip <br/>
                            <span className="text-secondary">Waits</span> for them.
                        </h1>
                    </div>
                    
                    <p className="text-lg md:text-xl text-zinc-500 max-w-2xl leading-relaxed font-medium">
                        Send SOL to any handle on X instantly. If the creator isn't on Bags yet, your tip is secured in a vault until they join to claim it.
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                        {!mounted ? (
                            <div className="w-full sm:w-[220px] h-15 bg-zinc-50 animate-pulse rounded-2xl" />
                        ) : (
                            <Button 
                                href={publicKey ? "/tip/demo" : undefined}
                                onClick={!publicKey ? () => document.querySelector('.wallet-adapter-button')?.dispatchEvent(new MouseEvent('click', {bubbles:true})) : undefined}
                                className="w-full sm:w-[220px] h-15 text-lg shadow-2xl shadow-black/10"
                            >
                                Start Tipping
                            </Button>
                        )}
                        
                        <Button 
                            variant="ghost"
                            href="/claim"
                            className="w-full sm:w-[220px] h-15 text-lg border-2 border-zinc-100 hover:border-black"
                        >
                            Claim Your Tips
                        </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="pt-10 flex flex-wrap gap-8 items-center border-t border-zinc-50 opacity-40 grayscale flex sm:flex-row flex-col">
                        <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-black italic">SOLANA Mainnet-READY</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-green-500" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-black italic">SECURE VAULT ACTIVE</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Visual Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 30 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="lg:col-span-5 hidden lg:block"
                >
                    <ReceiptVisual />
                </motion.div>
            </div>

            {/* Premium Background Atmosphere */}
            <div className="absolute -z-10 top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] right-[10%] w-[40rem] h-[40rem] bg-secondary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] left-[5%] w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] bg-center [mask-image:radial-gradient(white,transparent_85%)]" />
            </div>
        </section>
    );
};
