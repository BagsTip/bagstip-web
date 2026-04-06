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

                        <div className="grid grid-cols-1 gap-8">
                            <section className="bg-zinc-50 border border-zinc-100 p-8 rounded-[2.5rem] relative overflow-hidden group">
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-black/5 rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">📱</div>
                                <h2 className="text-xl font-black text-black mb-4 flex items-center gap-4">
                                    <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold font-mono">01</span>
                                    Download Coinbase or Kraken
                                </h2>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    Go to the App Store or Google Play Store and download a trusted exchange like **Coinbase** or **Kraken**. These are the easiest platforms to turn your crypto into real money.
                                </p>
                            </section>

                            <section className="bg-zinc-50 border border-zinc-100 p-8 rounded-[2.5rem] relative overflow-hidden group">
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-black/5 rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">🆔</div>
                                <h2 className="text-xl font-black text-black mb-4 flex items-center gap-4">
                                    <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold font-mono">02</span>
                                    Verify Your Account
                                </h2>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    Sign up and complete the "Know Your Customer" (KYC) verification. You'll usually need to take a photo of your ID. This ensures your funds stay secure and legal.
                                </p>
                            </section>

                            <section className="bg-zinc-50 border border-zinc-100 p-8 rounded-[2.5rem] relative overflow-hidden group">
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-black/5 rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">💸</div>
                                <h2 className="text-xl font-black text-black mb-4 flex items-center gap-4">
                                    <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold font-mono">03</span>
                                    Send SOL to the Exchange
                                </h2>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    In your new exchange app, find your **Solana (SOL) Deposit Address**. Open your Phantom wallet, click **Send**, paste that address, and transfer your SOL.
                                </p>
                            </section>

                            <section className="bg-zinc-50 border border-zinc-100 p-8 rounded-[2.5rem] relative overflow-hidden group">
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-black/5 rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">💱</div>
                                <h2 className="text-xl font-black text-black mb-4 flex items-center gap-4">
                                    <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold font-mono">04</span>
                                    Sell SOL for Your Currency
                                </h2>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    Once the SOL arrives in your exchange account, use the **"Sell"** button to convert it into your local currency (like USD or EUR).
                                </p>
                            </section>

                            <section className="bg-zinc-50 border border-zinc-100 p-8 rounded-[2.5rem] relative overflow-hidden group">
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-black/5 rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">🏦</div>
                                <h2 className="text-xl font-black text-black mb-4 flex items-center gap-4">
                                    <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold font-mono">05</span>
                                    Withdraw to Bank
                                </h2>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    The final step! Link your bank account to the exchange and click **Withdraw**. Your money will typically arrive in 1-3 business days.
                                </p>
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
