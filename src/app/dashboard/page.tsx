'use client';

import React, { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getTipperDashboard } from '@/lib/api';

export default function DashboardGateway() {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const router = useRouter();
    
    const [balance, setBalance] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (publicKey) {
            connection.getBalance(publicKey).then((b) => setBalance(b / LAMPORTS_PER_SOL));
            const id = connection.onAccountChange(publicKey, (account) => {
                setBalance(account.lamports / LAMPORTS_PER_SOL);
            });
            return () => connection.removeAccountChangeListener(id);
        }
    }, [publicKey, connection]);

    const shortenedWallet = publicKey 
        ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
        : '';

    return (
        <div className="min-h-screen flex flex-col bg-white selection:bg-secondary/30">
            <Navbar />
            <main className="flex-grow flex flex-col items-center justify-center px-6 py-12">
                <AnimatePresence mode="wait">
                    {!mounted ? (
                        <motion.div key="loading" className="w-12 h-12 border-4 border-zinc-100 border-t-black rounded-full animate-spin" />
                    ) : !publicKey ? (
                        <motion.div 
                            key="connect"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="max-w-md w-full bg-zinc-50 border border-zinc-100 p-12 rounded-[2.5rem] text-center"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-primary text-2xl font-bold">🔒</span>
                            </div>
                            <h1 className="text-3xl font-bold text-black mb-4">Connect Wallet</h1>
                            <p className="text-zinc-500 mb-8 leading-relaxed">
                                Please connect your Solana wallet to access your BagsTip dashboard.
                            </p>
                            <div className="flex justify-center">
                                <WalletMultiButton />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="dashboard"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl w-full"
                        >
                            {/* Account Overview */}
                            <div className="bg-zinc-50 border border-zinc-100 p-6 rounded-3xl mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-lg">
                                        <span className="text-white text-xl">💳</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Connected Wallet</p>
                                        <p className="text-lg font-bold text-black">{shortenedWallet}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                    <div>
                                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">SOL Balance</p>
                                        <p className="text-lg font-bold text-black">{balance?.toFixed(4) ?? '0.0000'} SOL</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Network</p>
                                        <span className="inline-block px-2 py-0.5 bg-secondary/10 text-secondary text-xs font-bold rounded-full">Devnet</span>
                                    </div>
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Tipper Card */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={async () => {
                                        await getTipperDashboard(publicKey.toBase58());
                                        router.push('/dashboard/tipper');
                                    }}
                                    className="group bg-white border border-zinc-100 p-10 rounded-[2.5rem] text-left hover:border-black/10 hover:shadow-2xl hover:shadow-zinc-200 transition-all"
                                >
                                    <div className="w-14 h-14 bg-zinc-50 group-hover:bg-primary/10 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-colors">
                                        💸
                                    </div>
                                    <h2 className="text-2xl font-bold text-black mb-3">I am a Tipper</h2>
                                    <p className="text-zinc-500 leading-relaxed mb-6">
                                        View your sent tips history, manage your off-chain balance, and find new creators to support.
                                    </p>
                                    <span className="text-sm font-bold text-black group-hover:translate-x-1 inline-block transition-transform">
                                        Open Tipper Dashboard →
                                    </span>
                                </motion.button>

                                {/* Creator Card */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => router.push('/dashboard/creator')}
                                    className="group bg-white border border-zinc-100 p-10 rounded-[2.5rem] text-left hover:border-black/10 hover:shadow-2xl hover:shadow-zinc-200 transition-all"
                                >
                                    <div className="w-14 h-14 bg-zinc-50 group-hover:bg-secondary/10 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-colors">
                                        ✨
                                    </div>
                                    <h2 className="text-2xl font-bold text-black mb-3">I am a Creator</h2>
                                    <p className="text-zinc-500 leading-relaxed mb-6">
                                        Link your X account, claim your pending tips, and see who's been supporting your work.
                                    </p>
                                    <span className="text-sm font-bold text-black group-hover:translate-x-1 inline-block transition-transform">
                                        Open Creator Dashboard →
                                    </span>
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
}
