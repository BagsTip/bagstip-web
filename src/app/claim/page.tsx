'use client';

import React, { useState, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { XVerification } from '@/components/shared/XVerification';
import { getCreator, releaseClaim } from '@/lib/api';
import { Creator } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClaimPage() {
    const { publicKey } = useWallet();
    const [step, setStep] = useState(1);
    const [handle, setHandle] = useState('');
    const [creatorData, setCreatorData] = useState<Creator | null>(null);
    const [loading, setLoading] = useState(false);
    const [claiming, setClaiming] = useState(false);
    const [txSig, setTxSig] = useState<string | null>(null);

    const handleIdentify = async () => {
        if (!handle) return;
        setLoading(true);
        try {
            const cleanHandle = handle.startsWith('@') ? handle.slice(1) : handle;
            const data = await getCreator(cleanHandle);
            setCreatorData(data);
            setStep(2);
        } catch (err) {
            console.error('Creator not found:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleFinalClaim = async () => {
        if (!publicKey || !creatorData) return;
        setClaiming(true);
        try {
            const res = await releaseClaim({ 
                handle: creatorData.x_handle, 
                wallet: publicKey.toBase58() 
            });
            if (res.success) {
                setTxSig(res.tx_sig_outbound || 'mock_sig');
                setStep(3);
            }
        } catch (err) {
            console.error('Claim failed:', err);
        } finally {
            setClaiming(false);
        }
    };

    const renderStepIndicator = () => (
        <div className="flex items-center justify-center mb-16 gap-4">
            {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-lg ${
                        step >= s ? 'bg-black text-white shadow-black/20' : 'bg-zinc-100 text-zinc-400'
                    }`}>
                        {s}
                    </div>
                    {s < 3 && <div className={`w-12 h-0.5 transition-colors ${step > s ? 'bg-black' : 'bg-zinc-100'}`} />}
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-white selection:bg-secondary/30">
            <Navbar />
            <main className="flex-grow py-20 px-6">
                <div className="max-w-3xl mx-auto">
                    {renderStepIndicator()}

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div 
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-zinc-50 border border-zinc-100 p-12 rounded-[2.5rem] shadow-sm text-center"
                            >
                                <h1 className="text-4xl font-black text-black mb-4">Find Your Tips</h1>
                                <p className="text-zinc-500 mb-10 leading-relaxed max-w-sm mx-auto">
                                    Enter your X handle to see how much you've earned from your supporters.
                                </p>
                                <div className="space-y-4 max-w-sm mx-auto">
                                    <input 
                                        type="text"
                                        placeholder="@yourhandle"
                                        value={handle}
                                        onChange={(e) => setHandle(e.target.value)}
                                        className="w-full bg-white border border-zinc-100 p-5 rounded-2xl text-lg font-black focus:ring-2 focus:ring-primary/20 outline-hidden transition-all text-center"
                                    />
                                    <button 
                                        onClick={handleIdentify}
                                        disabled={!handle || loading}
                                        className="w-full py-5 bg-black text-white rounded-2xl font-black text-sm hover:translate-y-[-2px] transition-all disabled:opacity-50 shadow-xl shadow-black/10"
                                    >
                                        {loading ? 'Searching...' : 'Find My Tips'}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div 
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="bg-black text-white p-10 rounded-[2.5rem] shadow-2xl flex justify-between items-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-4xl">💰</div>
                                    <div>
                                        <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1">Pending Amount</p>
                                        <h2 className="text-4xl font-black">${creatorData?.pending_amount_usd.toFixed(2)}</h2>
                                        <p className="text-sm font-bold text-secondary">{creatorData?.pending_amount_sol.toFixed(4)} SOL</p>
                                    </div>
                                    <button 
                                        onClick={() => setStep(1)}
                                        className="text-xs font-bold text-zinc-400 hover:text-white border-b border-zinc-500 transition-colors uppercase tracking-widest"
                                    >
                                        Change Handle
                                    </button>
                                </div>

                                {!publicKey ? (
                                    <div className="bg-zinc-50 border border-zinc-100 p-12 rounded-[2.5rem] text-center">
                                        <h3 className="text-2xl font-bold mb-4">Connect Wallet</h3>
                                        <p className="text-zinc-500 mb-8 max-w-xs mx-auto">Link your Solana wallet to prove your identity and receive funds.</p>
                                        <div className="flex justify-center">
                                            <WalletMultiButton />
                                        </div>
                                    </div>
                                ) : (
                                    <XVerification 
                                        wallet={publicKey.toBase58()} 
                                        onVerified={() => setStep(3)} 
                                    />
                                )}
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div 
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-8"
                            >
                                {txSig ? (
                                    <div className="bg-white border border-zinc-100 p-12 rounded-[3rem] shadow-sm text-center">
                                        <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                                            <span className="text-3xl">🎉</span>
                                        </div>
                                        <h1 className="text-4xl font-black text-black mb-2">Claim Successful</h1>
                                        <p className="text-zinc-500 mb-4">You've received ${creatorData?.pending_amount_usd.toFixed(2)}</p>
                                        
                                        <a 
                                            href={`https://solscan.io/tx/${txSig}?cluster=devnet`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline transition-all"
                                        >
                                            View transaction on Solscan
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        </a>

                                        <div className="mt-12 space-y-4">
                                            <a 
                                                href="/guide/fiat"
                                                className="w-full inline-block py-5 bg-black text-white rounded-2xl font-black text-sm shadow-xl shadow-black/10 hover:translate-y-[-2px] transition-all"
                                            >
                                                How to withdraw to bank
                                            </a>
                                            <a href="/dashboard" className="block text-sm font-bold text-zinc-400 hover:text-black transition-colors uppercase tracking-widest pt-4">
                                                Go to Dashboard
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-zinc-50 border border-zinc-100 p-12 rounded-[2.5rem] text-center">
                                        <h3 className="text-4xl font-black text-black mb-2 italic uppercase">Verified!</h3>
                                        <p className="text-zinc-500 mb-10 max-w-xs mx-auto">Your identity is linked. Click below to release the funds to your wallet.</p>
                                        <button 
                                            onClick={handleFinalClaim}
                                            disabled={claiming}
                                            className="w-full py-5 bg-secondary text-black rounded-2xl font-black text-sm hover:translate-y-[-2px] transition-all shadow-xl shadow-secondary/20"
                                        >
                                            {claiming ? 'Processing...' : 'Claim Funds'}
                                        </button>
                                        <button 
                                            onClick={() => setStep(2)}
                                            className="mt-6 text-xs font-bold text-zinc-400 hover:text-black uppercase tracking-widest"
                                        >
                                            ← Back to Verification
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
            <Footer />
        </div>
    );
}
