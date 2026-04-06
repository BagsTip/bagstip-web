'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PendingBalanceProps {
    sol: number;
    usd: number;
    verified: boolean;
    handle: string;
    wallet: string;
    onRefresh: () => void;
}

export const PendingBalance = ({ sol, usd, verified, handle, wallet, onRefresh }: PendingBalanceProps) => {
    const [status, setStatus] = useState<'idle' | 'claiming' | 'success'>('idle');
    const [error, setError] = useState<string | null>(null);

    const handleWithdraw = async () => {
        if (!verified || status !== 'idle') return;
        
        setStatus('claiming');
        setError(null);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
            const res = await fetch(`${apiUrl}/claim/release`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ handle, wallet }),
            });

            if (!res.ok) throw new Error('Withdrawal request failed');

            setStatus('success');
            onRefresh();
            setTimeout(() => setStatus('idle'), 3000);
        } catch (err: any) {
            console.error('Withdrawal failed:', err);
            setError(err.message || 'Withdrawal failed');
            setStatus('idle');
        }
    };

    return (
        <div className={`bg-white border border-zinc-100 p-10 rounded-[2.5rem] shadow-sm relative overflow-hidden h-full flex flex-col justify-between transition-opacity ${!verified ? 'opacity-70' : ''}`}>
            {!verified && (
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-10 flex items-center justify-center p-8 text-center">
                    <div className="bg-black text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl">
                        Link your X account to claim your tips.
                    </div>
                </div>
            )}

            <div>
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">Pending Balance</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-6xl font-black text-black tracking-tight">${usd.toFixed(2)}</h3>
                    <span className="text-xl font-bold text-zinc-400">USD</span>
                </div>
                <p className="text-lg font-bold text-secondary mt-1">{sol.toFixed(4)} SOL</p>
            </div>

            <div className="mt-12">
                <button 
                    onClick={handleWithdraw}
                    disabled={!verified || status !== 'idle'}
                    className="w-full py-5 bg-black text-white rounded-2xl font-bold transition-all hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-black active:scale-[0.98]"
                >
                    {status === 'idle' ? 'Withdraw to wallet' : status === 'success' ? 'Withdrawal Requested!' : 'Processing...'}
                </button>
                {error && <p className="text-red-500 text-xs mt-3 font-medium text-center">{error}</p>}
                <p className="text-center text-[10px] text-zinc-400 mt-4 font-bold uppercase tracking-widest">
                    Funds will be sent directly to your connected wallet
                </p>
            </div>
        </div>
    );
};
