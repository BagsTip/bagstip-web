'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { TransactionStatus } from '@/components/ui/TransactionStatus';

interface PendingBalanceProps {
    sol: number;
    usd: number;
    verified: boolean;
    handle: string;
    wallet: string;
    onRefresh: () => void;
}

export const PendingBalance = ({ sol, usd, verified, handle, wallet, onRefresh }: PendingBalanceProps) => {
    const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [txSig, setTxSig] = useState<string | null>(null);

    const handleWithdraw = async () => {
        if (!verified || status !== 'idle') return;
        
        setStatus('processing');
        setStatusMessage('Requesting withdrawal...');
        setError(null);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
            const res = await fetch(`${apiUrl}/claim/release`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ handle, wallet }),
            });

            if (!res.ok) throw new Error('Withdrawal request failed');
            const data = await res.json();

            setTxSig(data.tx_sig_outbound || 'mock_sig_outbound');
            setStatus('success');
            setStatusMessage('Withdrawal Successful');
            onRefresh();
        } catch (err: any) {
            console.error('Withdrawal failed:', err);
            setError(err.message || 'Withdrawal failed');
            setStatus('error');
            setStatusMessage('Withdrawal Failed');
        }
    };

    return (
        <div className="space-y-6 flex flex-col h-full">
            <div className={`bg-white border border-zinc-100 p-10 rounded-[2.5rem] shadow-sm relative overflow-hidden flex-1 flex flex-col justify-between transition-opacity ${!verified ? 'opacity-70' : ''}`}>
                {!verified && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-10 flex items-center justify-center p-8 text-center">
                        <div className="bg-black text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl">
                            Link your X account to claim your tips.
                        </div>
                    </div>
                )}

                <div>
                    <p className="text-zinc-400 text-xs font-black uppercase tracking-widest mb-2">Pending Balance</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-6xl font-black text-black tracking-tight">${usd.toFixed(2)}</h3>
                        <span className="text-xl font-bold text-zinc-400">USD</span>
                    </div>
                    <p className="text-lg font-bold text-secondary mt-1">{sol.toFixed(4)} SOL</p>
                </div>

                <div className="mt-12">
                    <Button 
                        onClick={handleWithdraw}
                        isLoading={status === 'processing'}
                        disabled={!verified || status !== 'idle'}
                        className="w-full h-15 text-lg"
                    >
                        Withdraw to wallet
                    </Button>
                    <p className="text-center text-[10px] text-zinc-400 mt-4 font-bold uppercase tracking-widest">
                        Funds will be sent directly to your connected wallet
                    </p>
                </div>
            </div>

            <AnimatePresence>
                {status !== 'idle' && (
                    <TransactionStatus 
                        status={status}
                        message={statusMessage}
                        txSig={txSig}
                        error={error}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
