'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';

export default function FiatGuidePage() {
    return (
        <div className="min-h-screen flex flex-col bg-white selection:bg-secondary/30">
            <Navbar />
            <main className="flex-grow py-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                    >
                        <header className="text-center">
                            <h1 className="text-5xl font-black text-black mb-6">How to Withdraw to Your Bank</h1>
                            <p className="text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto">
                                Once you've claimed your tips in SOL, follow these steps to convert them into your local currency.
                            </p>
                        </header>

                        <div className="grid grid-cols-1 gap-12">
                            <section className="bg-zinc-50 border border-zinc-100 p-10 rounded-[2.5rem]">
                                <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-4">
                                    <span className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-sm">1</span>
                                    Get an Account on an Exchange
                                </h2>
                                <p className="text-zinc-600 leading-relaxed mb-6">
                                    To convert SOL to fiat (USD, EUR, etc.), you'll need an account on a major cryptocurrency exchange that supports withdrawals to a bank account. 
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {['Coinbase', 'Kraken', 'Binance', 'Bybit'].map((ex) => (
                                        <div key={ex} className="p-4 bg-white border border-zinc-100 rounded-2xl text-center font-bold text-sm text-black">
                                            {ex}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="bg-zinc-50 border border-zinc-100 p-10 rounded-[2.5rem]">
                                <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-4">
                                    <span className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-sm">2</span>
                                    Send SOL to the Exchange
                                </h2>
                                <p className="text-zinc-600 leading-relaxed">
                                    In your exchange account, find your **Solana (SOL) Deposit Address**. Copy this address carefully. Open your Solana wallet (e.g., Phantom), click **Send**, paste the exchange address, and transfer your claimed SOL.
                                </p>
                            </section>

                            <section className="bg-zinc-50 border border-zinc-100 p-10 rounded-[2.5rem]">
                                <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-4">
                                    <span className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-sm">3</span>
                                    Convert and Withdraw
                                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full uppercase tracking-widest font-black">Final Step</span>
                                </h2>
                                <p className="text-zinc-600 leading-relaxed mb-6">
                                    Once the SOL arrives at the exchange, use the **Convert** or **Sell** feature to change it into your local currency. From there, use the **Withdraw** option to send the funds to your linked bank account.
                                </p>
                                <div className="p-6 bg-secondary/5 border border-secondary/20 rounded-3xl">
                                    <p className="text-sm font-bold text-black italic">
                                        Note: Withdrawals typically take 1-3 business days depending on your bank and exchange.
                                    </p>
                                </div>
                            </section>
                        </div>

                        <div className="text-center pt-8">
                            <a 
                                href="/dashboard" 
                                className="inline-block px-8 py-4 bg-black text-white rounded-2xl font-bold text-sm hover:translate-y-[-2px] transition-all shadow-xl shadow-black/10"
                            >
                                Back to Dashboard
                            </a>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
