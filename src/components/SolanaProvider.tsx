'use client';

import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css';

export const SolanaProvider = ({ children }: { children: React.ReactNode }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK as WalletAdapterNetwork) || WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => {
        if (process.env.NEXT_PUBLIC_SOLANA_RPC) {
            return process.env.NEXT_PUBLIC_SOLANA_RPC;
        }
        return clusterApiUrl(network);
    }, [network]);

    const wallets = useMemo(
        () => [
            // Standard wallets (Phantom, Solflare, etc.) are detected automatically
        ],
        []
    );

    const onError = React.useCallback((error: any) => {
        // Silently handle WalletNotReadyError to prevent console noise/crashes
        if (error.name === 'WalletNotReadyError') {
            console.warn('Wallet not ready yet. Please ensure your wallet extension is unlocked.');
            return;
        }
        console.error('Wallet Error:', error);
    }, []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect onError={onError}>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
