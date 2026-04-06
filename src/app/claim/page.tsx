'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';

export default function ClaimPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-secondary/30">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-6 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-zinc-50 border border-zinc-100 p-12 rounded-[2.5rem] text-center"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-primary text-2xl font-bold">!</span>
          </div>
          <h1 className="text-3xl font-bold text-black mb-4">Claim Your Tips</h1>
          <p className="text-zinc-500 mb-8 leading-relaxed">
            The claiming feature is currently under development for the hackathon. 
            Once live, this is where creators will link their X accounts to withdraw their tips.
          </p>
          <a 
            href="/"
            className="inline-block px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-zinc-800 transition-colors"
          >
            Back to Home
          </a>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
