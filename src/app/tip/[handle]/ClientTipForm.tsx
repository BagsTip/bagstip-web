'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { TransactionStatus } from '@/components/ui/TransactionStatus';

type Status = 'idle' | 'sending' | 'confirming' | 'logging' | 'confirmed' | 'failed';

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
    useEffect(() => setMounted(true), []);

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
            setStatus('confirming');
            setStatusMessage('Waiting for confirmation...');
            
            const latestBlockhash = await connection.getLatestBlockhash();
            await connection.confirmTransaction({ signature, ...latestBlockhash }, 'processed');

            setStatus('logging');
            setStatusMessage('Finalizing payment...');
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
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

            setStatus('confirmed');
            setStatusMessage('Payment Successful');
        } catch (err: any) {
            console.error('Transaction failed:', err);
            setError(err.message || 'Transaction failed');
            setStatus('failed');
            setStatusMessage('Payment Failed');
        }
    };

    const quickAmounts = ['0.1', '0.5', '1.0'];

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-white p-8 md:p-12 rounded-[3.5rem] border border-zinc-100 shadow-2xl shadow-zinc-200/50"
        >
            <div className="text-center mb-10">
                <div className="w-20 h-20 bg-zinc-50 border border-zinc-100 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <span className="text-3xl">💸</span>
                </div>
                <h1 className="text-4xl font-black text-black tracking-tight italic uppercase">Tip @{handle}</h1>
                <p className="text-zinc-400 font-bold text-xs uppercase tracking-widest mt-2">Support this creator instantly</p>
            </div>

            <div className="space-y-8">
                {/* Amount Input */}
                <div className="space-y-3">
                    <div className="relative group">
                        <input 
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-zinc-50 border-2 border-zinc-100 p-8 rounded-[2.5rem] text-4xl font-black text-center text-black focus:outline-hidden focus:border-black transition-all placeholder:text-zinc-200"
                        />
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 font-black text-zinc-300 text-xl pointer-events-none group-focus-within:text-black transition-colors">
                            SOL
                        </div>
                    </div>
                    <div className="flex justify-center gap-2">
                        {quickAmounts.map((q) => (
                            <button
                                key={q}
                                onClick={() => setAmount(q)}
                                className="px-5 py-2 bg-white border border-zinc-100 rounded-full text-xs font-bold text-zinc-500 hover:border-black hover:text-black transition-all"
                            >
                                {q} SOL
                            </button>
                        ))}
                    </div>
                    <p className="text-center text-sm font-bold text-zinc-400">
                        ≈ ${usdValue} USD
                    </p>
                </div>

                {/* Dashboard Summary */}
                <div className="bg-zinc-50 border border-zinc-100 p-6 rounded-3xl space-y-4">
                    <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-zinc-400 uppercase tracking-widest">Network Fee</span>
                        <span className="text-black">~0.000005 SOL</span>
                    </div>
                    <div className="pt-4 border-t border-zinc-200 flex justify-between items-center">
                        <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Total Pay</span>
                        <span className="text-2xl font-black text-black">{amount || '0'} SOL</span>
                    </div>
                </div>

                {/* Action Button */}
                <div className="space-y-6 pt-2">
                    {!mounted ? (
                        <div className="w-full h-14 bg-zinc-50 animate-pulse rounded-2xl" />
                    ) : !publicKey ? (
                        <div className="flex justify-center flex-col gap-4">
                            <WalletMultiButton className="w-full !justify-center !h-14 !rounded-2xl !bg-black !transition-all hover:!opacity-80" />
                            <p className="text-[10px] text-center text-zinc-400 font-bold uppercase tracking-widest">Connect wallet to send SOL</p>
                        </div>
                    ) : (
                        <Button 
                            onClick={handleSendTip}
                            isLoading={status === 'sending' || status === 'confirming' || status === 'logging'}
                            disabled={!amount || parseFloat(amount) <= 0}
                            className="w-full h-14 text-lg"
                        >
                            Confirm Payment
                        </Button>
                    )}

                    <TransactionStatus 
                        status={status === 'confirmed' ? 'success' : status === 'failed' ? 'error' : (status === 'idle' ? 'idle' : 'processing')}
                        message={statusMessage}
                        txSig={txSig}
                        error={error}
                    />
                </div>
            </div>
        </motion.div>
    );
}
