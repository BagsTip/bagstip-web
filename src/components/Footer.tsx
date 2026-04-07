import React from 'react';

export const Footer = () => {
    return (
        <footer className="py-20 px-6 border-t border-slate-100 bg-white">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12">
                <div className="flex flex-col gap-6 max-w-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">B</span>
                        </div>
                        <span className="font-extrabold text-xl text-slate-900 tracking-tight">BagsTip</span>
                    </div>
                    <p className="text-slate-500 leading-relaxed">
                        The easiest way to tip anyone on X using the Solana blockchain. Built exclusively for the Bags.fm Hackathon.
                    </p>
                </div>
                
                <div className="flex gap-16 sm:gap-24">
                    <div className="flex flex-col gap-4">
                        <span className="font-bold text-slate-900">Protocol</span>
                        <a href="#" className="text-slate-500 hover:text-primary transition-colors">How it works</a>
                        <a href="#" className="text-slate-500 hover:text-primary transition-colors">Vault Contract</a>
                        <a href="#" className="text-slate-500 hover:text-primary transition-colors">Security</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="font-bold text-slate-900">Legal</span>
                        <a href="#" className="text-slate-500 hover:text-primary transition-colors">Terms of Service</a>
                        <a href="#" className="text-slate-500 hover:text-primary transition-colors">Privacy Policy</a>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-slate-400 text-sm">© {new Date().getFullYear()} BagsTip Protocol. Built for Hackathon.</p>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                        <div className="w-2 h-2 rounded-full bg-secondary" />
                        <span className="text-xs font-bold text-slate-500">All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
