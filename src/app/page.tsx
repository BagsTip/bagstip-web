'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { StatsSection } from '@/components/StatsSection';
import { Explainer } from '@/components/Explainer';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-secondary/30 antialiased overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <StatsSection />
        <Explainer />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
