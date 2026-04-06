import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import ClientTipForm from './ClientTipForm';

type PageProps = {
  params: Promise<{ handle: string }>;
};

export default async function TipPage({ params }: PageProps) {
  const { handle } = await params;

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-secondary/30">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <ClientTipForm handle={handle} />
      </main>
      <Footer />
    </div>
  );
}
