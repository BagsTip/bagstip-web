'use client';

import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 text-center sm:items-start sm:text-left">
        <div className="flex flex-col items-center gap-8 sm:items-start">
          <Image
            className="dark:invert mb-4"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
            BagsTip Web
          </h1>
          
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            A next-generation tipping platform built on Solana. Connect your Phantom wallet to get started with Devnet testing.
          </p>

          <div className="flex flex-col gap-4 mt-8 w-full sm:flex-row">
            <WalletMultiButton />
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-8 text-left sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-black dark:text-white">Solana Devnet</h3>
            <p className="text-sm text-zinc-500">Currently configured for Devnet operations.</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-black dark:text-white">Phantom Only</h3>
            <p className="text-sm text-zinc-500">Optimized for Phantom wallet integration.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
