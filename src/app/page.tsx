'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Explainer } from '@/components/Explainer';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-secondary/30">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Explainer />
      </main>
      <Footer />
    </div>
  );
}
