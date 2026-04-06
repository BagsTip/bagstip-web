'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from './ToastProvider';

interface TransactionStatusProps {
    status: 'idle' | 'processing' | 'success' | 'error';
    message: string;
    txSig?: string | null;
    error?: string | null;
}

export const TransactionStatus = ({ status, message, txSig, error }: TransactionStatusProps) => {
    const { showToast } = useToast();

    if (status === 'idle') return null;

    const copyToClipboard = () => {
        if (txSig) {
            navigator.clipboard.writeText(txSig);
            showToast('Transaction signature copied');
        }
    };

    const statusColors = {
        processing: "bg-zinc-50 border-zinc-100 text-zinc-500",
        success: "bg-secondary/5 border-secondary/20 text-secondary-dark",
        error: "bg-red-50 border-red-100 text-red-600",
        idle: ""
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-3xl border ${statusColors[status]} transition-colors`}
        >
            <div className="flex items-center gap-4">
                {status === 'processing' && (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
                )}
                {status === 'success' && <span className="text-xl shrink-0">✅</span>}
                {status === 'error' && <span className="text-xl shrink-0">⚠️</span>}
                
                <div className="flex-1">
                    <p className="text-sm font-bold tracking-tight">{message}</p>
                    {status === 'error' && error && (
                        <p className="text-xs mt-1 font-medium opacity-80">{error}</p>
                    )}
                </div>
            </div>

            {txSig && (
                <div className="mt-4 pt-4 border-t border-current/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Signature</span>
                        <code className="text-xs font-mono bg-black/5 px-2 py-1 rounded truncate max-w-[150px]">
                            {txSig.slice(0, 8)}...{txSig.slice(-8)}
                        </code>
                        <button 
                            onClick={copyToClipboard}
                            className="p-1.5 hover:bg-black/5 rounded-lg transition-colors"
                            title="Copy Signature"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                        </button>
                    </div>
                    
                    <a 
                        href={`https://solscan.io/tx/${txSig}?cluster=devnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold underline hover:opacity-70 transition-opacity"
                    >
                        View on Solscan →
                    </a>
                </div>
            )}
        </motion.div>
    );
};
