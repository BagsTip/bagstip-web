'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { StatWidget } from '@/components/dashboard/StatWidget';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { XVerification } from '@/components/shared/XVerification';
import { BalanceCard } from '@/components/tipper/BalanceCard';
import { TipHistory } from '@/components/tipper/TipHistory';
import { getTipperDashboard } from '@/lib/api';
import { TipperDashboard } from '@/lib/types';

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
                        <div className="text-4xl text-black">🔒</div>
                        <h1 className="text-2xl font-black italic uppercase italic">Please Connect Wallet</h1>
                        <p className="text-zinc-500 font-medium">Access your tipper dashboard to manage balances and history.</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <DashboardShell>
            <div className="space-y-10">
                {/* Information Bar: Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatWidget 
                        label="Account Balance" 
                        value={`${data?.balance.sol.toFixed(2) ?? '0.00'} SOL`}
                        subValue={`≈ $${data?.balance.usd.toFixed(2) ?? '0.00'}`}
                        icon={<span className="text-xl">💰</span>}
                    />
                    <StatWidget 
                        label="Tips Sent" 
                        value={data?.tips_sent.length ?? 0}
                        subValue="All Time"
                        icon={<span className="text-xl">✨</span>}
                    />
                    <StatWidget 
                        label="Network Fee" 
                        value="< 0.0001"
                        subValue="SOL per TX"
                        icon={<span className="text-xl">⚡</span>}
                    />
                    <StatWidget 
                        label="Status" 
                        value="Verified"
                        subValue="Linked to X"
                        icon={<span className="text-xl">✅</span>}
                    />
                </div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div 
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                        >
                            <div className="lg:col-span-12 h-64 bg-zinc-100 animate-pulse rounded-[2.5rem]" />
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="content"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-10"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div className="lg:col-span-7">
                                    <BalanceCard 
                                        sol={data?.balance.sol ?? 0}
                                        usd={data?.balance.usd ?? 0}
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

                            <div className="grid grid-cols-1">
                                <TipHistory tips={data?.tips_sent ?? []} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DashboardShell>
    );
}
