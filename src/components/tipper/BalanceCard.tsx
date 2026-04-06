'use client';

import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';

interface BalanceCardProps {
    sol: number;
    usd: number;
    onRefresh: () => void;
}

export const BalanceCard = ({ sol, usd, onRefresh }: BalanceCardProps) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'confirming' | 'logging' | 'success'>('idle');
    const [error, setError] = useState<string | null>(null);

    const handleTopUp = async () => {
        if (!publicKey || !amount) return;
        setStatus('sending');
        setError(null);

        try {
            const vaultAddress = process.env.NEXT_PUBLIC_VAULT_ADDRESS;
            if (!vaultAddress) throw new Error('Vault address not configured');

            const destination = new PublicKey(vaultAddress);
            const lamports = Math.floor(parseFloat(amount) * LAMPORTS_PER_SOL);

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: destination,
                    lamports,
                })
            );

            const signature = await sendTransaction(transaction, connection);
            setStatus('confirming');

            const latestBlockhash = await connection.getLatestBlockhash();
            await connection.confirmTransaction({
                signature,
                ...latestBlockhash,
            }, 'processed');

            setStatus('logging');
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
            await fetch(`${apiUrl}/tip/deposit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    wallet: publicKey.toBase58(),
                    amount_sol: parseFloat(amount),
                    tx_sig: signature,
                }),
            });

            setStatus('success');
            setAmount('');
            onRefresh();
            setTimeout(() => setStatus('idle'), 3000);
        } catch (err: any) {
            console.error('Top up failed:', err);
            setError(err.message || 'Transaction failed');
            setStatus('idle');
        }
    };

    return (
        <div className="bg-black text-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-between h-full relative overflow-hidden">
            {/* Background Grain/Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-black" />

            <div>
                <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">Tipping Balance</p>
                <h3 className="text-5xl font-black mb-1">{sol.toFixed(3)} SOL</h3>
                <p className="text-xl font-bold text-secondary">${usd.toFixed(2)} USD</p>
            </div>

            <div className="mt-8 relative z-10">
                <div className="flex gap-2">
                    <input 
                        type="number"
                        placeholder="0.0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="flex-1 bg-white/10 border border-white/10 p-4 rounded-2xl text-sm font-bold placeholder:text-white/20 focus:ring-2 focus:ring-secondary/50 outline-hidden transition-all"
                    />
                    <button 
                        onClick={handleTopUp}
                        disabled={status !== 'idle' || !amount}
                        className="px-6 py-4 bg-secondary text-black rounded-2xl font-bold text-sm hover:translate-y-[-2px] active:translate-y-0 transition-all disabled:opacity-50"
                    >
                        {status === 'idle' ? 'Top Up' : status === 'success' ? 'Added!' : 'Processing...'}
                    </button>
                </div>
                {error && <p className="text-red-400 text-xs mt-2 font-medium">{error}</p>}
                <AnimatePresence>
                    {status !== 'idle' && status !== 'success' && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-4 flex items-center gap-2 text-xs font-bold text-zinc-400"
                        >
                            <div className="w-3 h-3 border-2 border-white/10 border-t-secondary rounded-full animate-spin" />
                            {status === 'sending' ? 'Waiting for signature...' : status === 'confirming' ? 'Confirming on-chain...' : 'Syncing with dashboard...'}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
