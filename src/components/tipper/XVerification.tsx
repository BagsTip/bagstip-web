'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initVerification, confirmVerification } from '@/lib/api';

export const XVerification = ({ wallet }: { wallet: string }) => {
    const [handle, setHandle] = useState('');
    const [code, setCode] = useState<string | null>(null);
    const [tweetUrl, setTweetUrl] = useState('');
    const [status, setStatus] = useState<'idle' | 'generating' | 'verifying' | 'success'>('idle');

    const handleGenerate = async () => {
        if (!handle) return;
        setStatus('generating');
        const res = await initVerification({ wallet, x_handle: handle });
        if (res.success) {
            setCode(`BAGSTIP-${Math.random().toString(36).substring(7).toUpperCase()}`);
            setStatus('idle');
        }
    };

    const handleVerify = async () => {
        if (!tweetUrl) return;
        setStatus('verifying');
        const res = await confirmVerification({ wallet, oauth_token: tweetUrl });
        if (res.success) {
            setStatus('success');
        }
    };

    return (
        <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#1DA1F2]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </div>
                <h3 className="text-xl font-bold text-black">X Verification</h3>
            </div>

            <div className="space-y-6">
                {!code && status !== 'success' && (
                    <div className="space-y-4">
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            Link your Solana wallet to your X handle to start your tipping identity.
                        </p>
                        <input 
                            type="text"
                            placeholder="@handle"
                            value={handle}
                            onChange={(e) => setHandle(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-100 p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-hidden transition-all"
                        />
                        <button 
                            onClick={handleGenerate}
                            disabled={status === 'generating' || !handle}
                            className="w-full py-4 bg-black text-white rounded-2xl font-bold text-sm hover:bg-zinc-800 transition-colors disabled:opacity-50"
                        >
                            {status === 'generating' ? 'Generating code...' : 'Generate Verification Code'}
                        </button>
                    </div>
                )}

                {code && status !== 'success' && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-4"
                    >
                        <div className="p-6 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-2xl text-center">
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Your Code</p>
                            <p className="text-2xl font-black text-black tracking-widest">{code}</p>
                        </div>
                        <p className="text-xs text-zinc-500 text-center">
                            Post a tweet with this code and paste the URL below.
                        </p>
                        <input 
                            type="text"
                            placeholder="Tweet URL (https://x.com/...)"
                            value={tweetUrl}
                            onChange={(e) => setTweetUrl(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-100 p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-hidden transition-all"
                        />
                        <button 
                            onClick={handleVerify}
                            disabled={status === 'verifying' || !tweetUrl}
                            className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-accent transition-colors disabled:opacity-50"
                        >
                            {status === 'verifying' ? 'Verifying...' : 'Verify Tweet'}
                        </button>
                    </motion.div>
                )}

                {status === 'success' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-8 bg-secondary/10 border border-secondary/20 rounded-3xl text-center"
                    >
                        <span className="text-3xl block mb-2">✅</span>
                        <h4 className="text-lg font-bold text-black mb-1">Verified</h4>
                        <p className="text-sm text-zinc-600">Your X handle is now linked to your wallet.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
