'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion, AnimatePresence } from 'framer-motion';

type Status = 'idle' | 'sending' | 'confirmed' | 'failed';

export default function ClientTipForm({ handle }: { handle: string }) {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    
    const [amount, setAmount] = useState<string>('');
    const [solPrice, setSolPrice] = useState<number | null>(null);
    const [status, setStatus] = useState<Status>('idle');
    const [txSig, setTxSig] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [statusMessage, setStatusMessage] = useState<string>('');

    // Fetch SOL price from Binance
    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT');
                const data = await response.json();
                setSolPrice(parseFloat(data.price));
            } catch (err) {
                console.error('Failed to fetch SOL price:', err);
            }
        };
        fetchPrice();
        const interval = setInterval(fetchPrice, 30000); // Update every 30s
        return () => clearInterval(interval);
    }, []);

    const [mounted, setMounted] = useState(false);

    // Handle mounting for hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    const usdValue = useMemo(() => {
        if (!amount || !solPrice) return '0.00';
        return (parseFloat(amount) * solPrice).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }, [amount, solPrice]);

    const handleSendTip = async () => {
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
            
            setStatusMessage('Waiting for confirmation...');
            
            const latestBlockhash = await connection.getLatestBlockhash();
            await connection.confirmTransaction({
                signature,
                ...latestBlockhash,
            }, 'processed');

            // POST to backend log
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
            try {
                await fetch(`${apiUrl}/tip/log`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        tipper_wallet: publicKey.toBase58(),
                        creator_x_handle: handle,
                        amount_sol: parseFloat(amount),
                        tx_sig_inbound: signature
                    })
                });
            } catch (logErr) {
                console.error('Failed to log tip to backend:', logErr);
                // We don't fail the UI if the log fails, as the SOL is already sent
            }

            setStatus('confirmed');
            setStatusMessage('Tip sent successfully');
        } catch (err: any) {
            console.error('Transaction failed:', err);
            setError(err.message || 'Transaction failed');
            setStatus('failed');
            setStatusMessage('Transaction failed');
        }
    };

    const quickAmounts = ['0.1', '0.5', '1.0'];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-2xl shadow-zinc-200/50"
        >
            <div className="text-center mb-8">
                <span className="text-sm font-bold text-secondary tracking-widest uppercase mb-2 block">Send Tip</span>
                <h1 className="text-3xl font-black text-black">@{handle}</h1>
            </div>

            <div className="space-y-6">
                {/* Amount Input */}
                <div>
                    <label className="block text-sm font-semibold text-zinc-500 mb-2 ml-1">Amount in SOL</label>
                    <div className="relative group">
                        <input 
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-zinc-50 border border-zinc-100 p-6 rounded-3xl text-2xl font-bold text-black focus:outline-hidden focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-zinc-300"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-end">
                            <span className="text-sm font-bold text-zinc-400">SOL</span>
                            <span className="text-xs font-medium text-zinc-400 mt-0.5">${usdValue} USD</span>
                        </div>
                    </div>
                </div>

                {/* Quick Amounts */}
                <div className="flex gap-2">
                    {quickAmounts.map((q) => (
                        <button
                            key={q}
                            onClick={() => setAmount(q)}
                            className="flex-1 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm font-bold text-zinc-600 hover:bg-black hover:text-white hover:border-black transition-all"
                        >
                            {q} SOL
                        </button>
                    ))}
                </div>

                {/* Action Button */}
                <div className="pt-4">
                    {!mounted ? (
                        <div className="w-full h-14 bg-zinc-50 animate-pulse rounded-2xl" />
                    ) : !publicKey ? (
                        <div className="flex justify-center">
                            <WalletMultiButton className="w-full !justify-center !h-14 !rounded-2xl" />
                        </div>
                    ) : (
                        <motion.button
                            disabled={status === 'sending' || !amount}
                            onClick={handleSendTip}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 bg-black text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {status === 'sending' ? 'Processing...' : `Send Tip to @${handle}`}
                        </motion.button>
                    )}
                </div>

                {/* Status Dashboard */}
                <AnimatePresence mode="wait">
                    {status !== 'idle' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className={`mt-6 p-6 rounded-3xl border ${
                                status === 'confirmed' ? 'bg-secondary/5 border-secondary/20' : 
                                status === 'failed' ? 'bg-red-50 border-red-100' : 
                                'bg-zinc-50 border-zinc-100'
                            }`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                                        {status === 'sending' && (
                                            <div className="w-6 h-6 border-4 border-black/10 border-t-black rounded-full animate-spin" />
                                        )}
                                        {status === 'confirmed' && (
                                            <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                        {status === 'failed' && (
                                            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold">!</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-black capitalize">{statusMessage}</p>
                                        {status === 'confirmed' && (
                                            <a 
                                                href={`https://solana.fm/tx/${txSig}?cluster=devnet-solana`} 
                                                target="_blank" 
                                                className="text-xs font-bold text-secondary hover:underline"
                                            >
                                                View on Explorer
                                            </a>
                                        )}
                                        {status === 'failed' && <p className="text-xs text-red-500">{error}</p>}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
