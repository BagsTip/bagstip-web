'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { XVerification } from '@/components/tipper/XVerification';
import { BalanceCard } from '@/components/tipper/BalanceCard';
import { TipHistory } from '@/components/tipper/TipHistory';
import { QuickTip } from '@/components/tipper/QuickTip';
import { getTipperDashboard } from '@/lib/api';
import { TipperDashboard } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function TipperDashboardPage() {
    const { publicKey } = useWallet();
    const [data, setData] = useState<TipperDashboard | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshData = useCallback(async () => {
        if (publicKey) {
            const dashboardData = await getTipperDashboard(publicKey.toBase58());
            setData(dashboardData);
            setLoading(false);
        }
    }, [publicKey]);

    useEffect(() => {
        refreshData();
    }, [refreshData]);

    if (!publicKey) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <Navbar />
                <main className="flex-grow flex items-center justify-center p-6">
                    <div className="text-center space-y-4">
                        <div className="text-4xl">🔒</div>
                        <h1 className="text-2xl font-bold">Please Connect Wallet</h1>
                        <p className="text-zinc-500">Access your tipper dashboard to manage balances and history.</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-white selection:bg-secondary/30">
            <Navbar />
            <main className="flex-grow py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <header className="mb-12">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">
                            <a href="/dashboard" className="hover:text-black transition-colors">Dashboard</a>
                            <span>/</span>
                            <span className="text-black">Tipper</span>
                        </div>
                        <h1 className="text-4xl font-black text-black">Tipper Dashboard</h1>
                    </header>

                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div 
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                <div className="h-64 bg-zinc-50 animate-pulse rounded-[2.5rem]" />
                                <div className="h-64 bg-zinc-50 animate-pulse rounded-[2.5rem]" />
                                <div className="h-64 bg-zinc-50 animate-pulse rounded-[2.5rem]" />
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="content"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                {/* Top Row: Balance & Verification & Quick Tip */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                    <div className="lg:col-span-5">
                                        <BalanceCard 
                                            sol={data?.balance.sol ?? 0}
                                            usd={data?.balance.usd ?? 0}
                                            onRefresh={refreshData}
                                        />
                                    </div>
                                    <div className="lg:col-span-4">
                                        <XVerification wallet={publicKey.toBase58()} />
                                    </div>
                                    <div className="lg:col-span-3">
                                        <QuickTip />
                                    </div>
                                </div>

                                {/* Bottom Row: History */}
                                <div className="grid grid-cols-1">
                                    <TipHistory tips={data?.tips_sent ?? []} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
            <Footer />
        </div>
    );
}
