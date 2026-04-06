'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Explainer } from '@/components/Explainer';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-primary/20 antialiased overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Explainer />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
