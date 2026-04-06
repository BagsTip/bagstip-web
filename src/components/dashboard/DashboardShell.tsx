'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DashboardShellProps {
    children: React.ReactNode;
}

const navItems = [
    { name: 'Tipper Dashboard', href: '/dashboard/tipper', icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )},
    { name: 'Creator Dashboard', href: '/dashboard/creator', icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    )},
    { name: 'Claim Tips', href: '/claim', icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )},
];

export const DashboardShell = ({ children }: DashboardShellProps) => {
    const { publicKey } = useWallet();
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Close mobile sidebar on route change
    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    const activeItem = navItems.find(item => item.href === pathname);

    return (
        <div className="min-h-screen bg-zinc-50 flex">
            {/* Sidebar Desktop */}
            <motion.aside 
                initial={false}
                animate={{ width: isCollapsed ? 80 : 280 }}
                className="hidden lg:flex flex-col bg-white border-r border-zinc-100 h-screen sticky top-0 transition-all overflow-hidden z-40"
            >
                <div className="p-6 flex items-center justify-between border-b border-zinc-100">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center shrink-0">
                            <span className="text-white font-black italic text-[10px]">B</span>
                        </div>
                        {!isCollapsed && <span className="text-lg font-black italic uppercase tracking-tight text-black">BagsTip</span>}
                    </Link>
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-1 hover:bg-zinc-50 rounded-lg text-zinc-400"
                    >
                        {isCollapsed ? '→' : '←'}
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link 
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 p-3 rounded-2xl font-bold text-sm transition-all ${
                                pathname === item.href ? 'bg-black text-white' : 'text-zinc-500 hover:bg-zinc-50 hover:text-black'
                            }`}
                        >
                            <span className="shrink-0">{item.icon}</span>
                            {!isCollapsed && <span>{item.name}</span>}
                        </Link>
                    ))}
                </nav>
            </motion.aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="h-20 bg-white border-b border-zinc-100 flex items-center justify-between px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        {/* Hamburger Button */}
                        <button 
                            onClick={() => setIsMobileOpen(true)}
                            className="lg:hidden p-2 hover:bg-zinc-50 rounded-xl"
                        >
                             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>

                        <div className="flex items-center gap-2 text-xs font-bold text-zinc-400">
                            <span className="uppercase tracking-widest uppercase italic">Dashboard</span>
                            <span>/</span>
                            <span className="text-black uppercase tracking-widest italic">{activeItem?.name ?? 'Overview'}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Network Badge */}
                        <div className="px-3 py-1 bg-secondary text-black rounded-full text-[10px] font-black uppercase tracking-widest italic">
                            Devnet
                        </div>
                        {publicKey && (
                            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-[2rem] border border-zinc-100">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[10px] font-mono font-bold text-zinc-500">
                                    {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
                                </span>
                            </div>
                        )}
                    </div>
                </header>

                {/* Dashboard Viewport */}
                <main className="p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {children}
                </main>
            </div>

            {/* Mobile Drawer Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-[4px] z-50 lg:hidden"
                        />
                        <motion.aside 
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 lg:hidden p-6 shadow-2xl"
                        >
                            <Link href="/" className="flex items-center gap-3 mb-10">
                                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
                                    <span className="text-white font-black italic text-xs italic">B</span>
                                </div>
                                <span className="text-2xl font-black italic uppercase italic text-black">BagsTip</span>
                            </Link>
                            <nav className="space-y-2">
                                {navItems.map((item) => (
                                    <Link 
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-4 p-4 rounded-2xl font-bold ${
                                            pathname === item.href ? 'bg-black text-white border border-black shadow-lg shadow-black/10' : 'text-zinc-500 bg-zinc-50 border border-zinc-100'
                                        }`}
                                    >
                                        {item.icon}
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
