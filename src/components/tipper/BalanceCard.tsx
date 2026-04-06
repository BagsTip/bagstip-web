'use client';

import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { TransactionStatus } from '@/components/ui/TransactionStatus';

interface BalanceCardProps {
    sol: number;
    usd: number;
    onRefresh: () => void;
}

export const BalanceCard = ({ sol, usd, onRefresh }: BalanceCardProps) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'confirming' | 'logging' | 'success' | 'error'>('idle');
    const [txSig, setTxSig] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<string>('');

    const handleTopUp = async () => {
        if (!publicKey || !amount) return;
        setStatus('sending');
        setStatusMessage('Sending transaction...');
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
            setTxSig(signature);
            setStatus('confirming');
            setStatusMessage('Waiting for confirmation...');

            const latestBlockhash = await connection.getLatestBlockhash();
            await connection.confirmTransaction({
                signature,
                ...latestBlockhash,
            }, 'processed');

            setStatus('logging');
            setStatusMessage('Syncing with balance...');
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
            setStatusMessage('Top Up Successful');
            setAmount('');
            onRefresh();
        } catch (err: any) {
            console.error('Top up failed:', err);
            setError(err.message || 'Transaction failed');
            setStatus('error');
            setStatusMessage('Top Up Failed');
        }
    };

    return (
        <div className="space-y-6 flex flex-col h-full">
            <div className="bg-black text-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-between flex-1 relative overflow-hidden">
                {/* Background Grain/Texture */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-black" />

                <div className="relative z-10">
                    <p className="text-zinc-400 text-xs font-black uppercase tracking-widest mb-2">Tipping Balance</p>
                    <h3 className="text-5xl font-black mb-1">{sol.toFixed(3)} SOL</h3>
                    <p className="text-xl font-bold text-secondary">${usd.toFixed(2)} USD</p>
                </div>

                <div className="mt-8 relative z-10">
                    <div className="flex gap-2">
                        <input 
                            type="number"
                            placeholder="Amount in SOL"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="flex-1 bg-white/10 border border-white/10 p-4 rounded-2xl text-sm font-bold placeholder:text-white/20 focus:ring-2 focus:ring-secondary/50 outline-hidden transition-all"
                        />
                        <Button 
                            variant="secondary"
                            onClick={handleTopUp}
                            isLoading={status === 'sending' || status === 'confirming' || status === 'logging'}
                            disabled={!amount || parseFloat(amount) <= 0}
                            className="px-8 !rounded-2xl"
                        >
                            Top Up
                        </Button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {status !== 'idle' && (
                    <TransactionStatus 
                        status={status === 'success' ? 'success' : status === 'error' ? 'error' : 'processing'}
                        message={statusMessage}
                        txSig={txSig}
                        error={error}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
