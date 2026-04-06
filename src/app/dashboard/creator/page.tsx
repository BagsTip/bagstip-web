'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { StatWidget } from '@/components/dashboard/StatWidget';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { XVerification } from '@/components/shared/XVerification';
import { PendingBalance } from '@/components/creator/PendingBalance';
import { TipsReceivedTable } from '@/components/creator/TipsReceivedTable';
import { BagsPromo } from '@/components/creator/BagsPromo';
import { getCreatorDashboard } from '@/lib/api';
import { CreatorDashboard } from '@/lib/types';

export default function CreatorDashboardPage() {
    const { publicKey } = useWallet();
    const [data, setData] = useState<CreatorDashboard | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshData = useCallback(async () => {
        if (publicKey) {
            // In a real app, we might use the linked X handle from the user's profile
            // For the mock, we'll use 'nevan' as the sample handle
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
                        <div className="text-4xl text-black">🔒</div>
                        <h1 className="text-2xl font-black italic uppercase italic tracking-tight">Please Connect Wallet</h1>
                        <p className="text-zinc-500 font-medium leading-relaxed">Access your creator dashboard to manage and claim your tips.</p>
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
                        label="Pending Balance" 
                        value={`${data?.pending_balance.sol.toFixed(2) ?? '0.00'} SOL`}
                        subValue={`≈ $${data?.pending_balance.usd.toFixed(2) ?? '0.00'}`}
                        icon={<span className="text-xl">💰</span>}
                    />
                    <StatWidget 
                        label="Total Received" 
                        value={data?.tips_received.length ?? 0}
                        subValue="All Time"
                        icon={<span className="text-xl">📈</span>}
                    />
                    <StatWidget 
                        label="Verification" 
                        value={data?.profile.verified ? "Verified" : "Pending"}
                        subValue={data?.profile.verified ? `@${data.profile.x_handle}` : "Link X to claim"}
                        icon={<span className="text-xl">✅</span>}
                    />
                    <StatWidget 
                        label="Protocol" 
                        value="Solana"
                        subValue="Live on Devnet"
                        icon={<span className="text-xl">🌐</span>}
                    />
                </div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div 
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-zinc-100 animate-pulse h-96 rounded-[2.5rem]"
                        />
                    ) : (
                        <motion.div 
                            key="content"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-10"
                        >
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

                            <div className="grid grid-cols-1">
                                <TipsReceivedTable tips={data?.tips_received ?? []} />
                            </div>

                            <div className="grid grid-cols-1">
                                <BagsPromo />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DashboardShell>
    );
}
