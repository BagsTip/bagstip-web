import React from 'react';

export const Footer = () => {
    return (
        <footer className="py-12 px-6 border-t border-zinc-100 bg-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-black flex items-center justify-center">
                        <span className="text-white font-bold text-[10px]">B</span>
                    </div>
                    <span className="font-bold text-black">BagsTip</span>
                </div>
                
                <p className="text-zinc-400 text-sm">
                    Built for Bags.fm Hackathon
                </p>
                
                <div className="flex gap-6">
                    <a href="#" className="text-zinc-400 hover:text-black transition-colors text-sm">Terms</a>
                    <a href="#" className="text-zinc-400 hover:text-black transition-colors text-sm">Privacy</a>
                </div>
            </div>
        </footer>
    );
};
