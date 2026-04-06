'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { XVerification } from '@/components/shared/XVerification';
import { PendingBalance } from '@/components/creator/PendingBalance';
import { TipsReceivedTable } from '@/components/creator/TipsReceivedTable';
import { BagsPromo } from '@/components/creator/BagsPromo';
import { getCreatorDashboard } from '@/lib/api';
import { CreatorDashboard } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreatorDashboardPage() {
    const { publicKey } = useWallet();
    const [data, setData] = useState<CreatorDashboard | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshData = useCallback(async () => {
        if (publicKey) {
            // In a real app, we might use the linked X handle from the user's profile
            // For the mock, we'll use a sample handle
            const dashboardData = await getCreatorDashboard('nevan');
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
                        <p className="text-zinc-500">Access your creator dashboard to manage and claim your tips.</p>
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
                            <span className="text-black">Creator</span>
                        </div>
                        <h1 className="text-4xl font-black text-black tracking-tight">Creator Dashboard</h1>
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
                                {/* Top Row: Branding & Verification */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                    <div className="lg:col-span-7">
                                        <PendingBalance 
                                            sol={data?.pending_balance.sol ?? 0}
                                            usd={data?.pending_balance.usd ?? 0}
                                            verified={data?.profile.verified ?? false}
                                            handle={data?.profile.x_handle ?? ''}
                                            wallet={publicKey.toBase58()}
                                            onRefresh={refreshData}
                                        />
                                    </div>
                                    <div className="lg:col-span-5">
                                        <XVerification 
                                            wallet={publicKey.toBase58()} 
                                            onVerified={refreshData}
                                        />
                                    </div>
                                </div>

                                {/* History Row */}
                                <div className="grid grid-cols-1">
                                    <TipsReceivedTable tips={data?.tips_received ?? []} />
                                </div>

                                {/* Promo Row */}
                                <div className="grid grid-cols-1 mt-12">
                                    <BagsPromo />
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
