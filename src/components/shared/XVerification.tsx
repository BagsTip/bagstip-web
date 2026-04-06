'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initVerification, confirmVerification } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';

interface XVerificationProps {
    wallet: string;
    onVerified?: () => void;
}

export const XVerification = ({ wallet, onVerified }: XVerificationProps) => {
    const { showToast } = useToast();
    const [handle, setHandle] = useState('');
    const [code, setCode] = useState<string | null>(null);
    const [tweetUrl, setTweetUrl] = useState('');
    const [status, setStatus] = useState<'idle' | 'generating' | 'verifying' | 'success' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!handle) return;
        setStatus('generating');
        setError(null);
        try {
            const res = await initVerification({ wallet, x_handle: handle });
            if (res.success) {
                setCode(`BAGSTIP-${Math.random().toString(36).substring(7).toUpperCase()}`);
                setStatus('idle');
                showToast('Verification code generated');
            } else {
                throw new Error('Failed to generate code');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to generate code');
            setStatus('error');
        }
    };

    const handleVerify = async () => {
        if (!tweetUrl) return;
        setStatus('verifying');
        setError(null);
        try {
            const res = await confirmVerification({ wallet, oauth_token: tweetUrl });
            if (res.success) {
                setStatus('success');
                showToast('X Account Linked Successfully');
                if (onVerified) onVerified();
            } else {
                throw new Error('Verification failed. Check the tweet URL.');
            }
        } catch (err: any) {
            setError(err.message || 'Verification failed');
            setStatus('error');
        }
    };

    return (
        <div className="bg-white border border-zinc-100 p-8 md:p-10 rounded-[2.5rem] shadow-sm h-full flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#1DA1F2]/10 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </div>
                    <h3 className="text-xl font-bold text-black">Link X Account</h3>
                </div>

                <div className="space-y-6">
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div 
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-8 bg-secondary/10 border border-secondary/20 rounded-3xl text-center"
                            >
                                <span className="text-3xl block mb-2">✅</span>
                                <h4 className="text-lg font-bold text-black mb-1">X Account Linked</h4>
                                <p className="text-sm text-zinc-600">Your identity is now confirmed.</p>
                            </motion.div>
                        ) : !code ? (
                            <motion.div 
                                key="input"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-4"
                            >
                                <p className="text-sm text-zinc-500 leading-relaxed">
                                    Link your Solana wallet to your X handle to verify your identity.
                                </p>
                                <div className="space-y-4">
                                    <input 
                                        type="text"
                                        placeholder="@handle"
                                        value={handle}
                                        onChange={(e) => setHandle(e.target.value)}
                                        className="w-full bg-zinc-50 border border-zinc-100 p-5 rounded-2xl text-lg font-bold focus:ring-2 focus:ring-primary/20 outline-hidden transition-all"
                                    />
                                    <Button 
                                        onClick={handleGenerate}
                                        isLoading={status === 'generating'}
                                        disabled={!handle}
                                        className="w-full py-5"
                                    >
                                        Generate Verification Code
                                    </Button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="verify"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <div className="p-6 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-3xl text-center">
                                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Your Code</p>
                                    <p className="text-3xl font-black text-black tracking-widest">{code}</p>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-xs text-zinc-500 text-center font-medium">
                                        Post a tweet with this code and paste the URL below.
                                    </p>
                                    <input 
                                        type="text"
                                        placeholder="Tweet URL (https://x.com/...)"
                                        value={tweetUrl}
                                        onChange={(e) => setTweetUrl(e.target.value)}
                                        className="w-full bg-zinc-50 border border-zinc-100 p-5 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-hidden transition-all"
                                    />
                                    <div className="flex gap-2">
                                        <Button 
                                            variant="ghost"
                                            onClick={() => setCode(null)}
                                            className="px-6"
                                        >
                                            Back
                                        </Button>
                                        <Button 
                                            onClick={handleVerify}
                                            isLoading={status === 'verifying'}
                                            disabled={!tweetUrl}
                                            className="flex-1"
                                        >
                                            Verify Tweet
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold flex items-center gap-2">
                    <span>⚠️</span> {error}
                </div>
            )}
        </div>
    );
};
