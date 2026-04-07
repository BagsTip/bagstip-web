'use client';

import React from 'react';

// Using inline SVGs for standard tech stack logos to ensure they load reliably and cleanly.
const logos = [
    {
        name: 'Solana',
        svg: (
            <svg viewBox="0 0 398 314" fill="none" className="h-6 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <path d="M64.6 238.9c-2.4-2.4-1.3-6.5 2.1-6.5h277.5c6.5 0 9.8 7.9 5.2 12.5l-50.5 50.5c-2.4 2.4-5.8 3.8-9.2 3.8H12.2c-6.5 0-9.8-7.9-5.2-12.5l57.6-57.8Z" fill="#14F195"/>
                <path d="M64.6 74.9c-2.4-2.4-1.3-6.5 2.1-6.5h277.5c6.5 0 9.8 7.9 5.2 12.5l-50.5 50.5c-2.4 2.4-5.8 3.8-9.2 3.8H12.2c-6.5 0-9.8-7.9-5.2-12.5l57.6-57.8Z" fill="#14F195"/>
                <path d="M333.1 156.9c2.4-2.4 1.3-6.5-2.1-6.5H53.5c-6.5 0-9.8 7.9-5.2 12.5l50.5 50.5c2.4 2.4 5.8 3.8 9.2 3.8h277.5c6.5 0 9.8-7.9 5.2-12.5l-57.6-57.8Z" fill="#9945FF"/>
            </svg>
        )
    },
    {
        name: 'Phantom',
        svg: (
            <svg viewBox="0 0 100 100" fill="none" className="h-6 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm20.8 72.8c-2.3 0-4.3-1.6-4.8-3.9l-2.4-11.8H40l-2.4 11.8c-.5 2.3-2.5 3.9-4.8 3.9-3.2 0-5.6-3-4.8-6.1l7.8-38.3c.4-1.8 2-3.1 3.8-3.1h20.8c1.8 0 3.4 1.3 3.8 3.1l7.8 38.3c.7 3.1-1.7 6.1-4.8 6.1z" fill="#AB9FF2" />
            </svg>
        )
    },
    {
        name: 'Next.js',
        svg: (
             <svg viewBox="0 0 180 180" fill="none" className="h-6 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <circle cx="90" cy="90" r="90" fill="black"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M149.308 132.868L70.4 46.1201H55.2V133.88H68.8001V66.8401L138.828 143.682C142.668 140.407 146.176 136.786 149.308 132.868ZM124.8 46.1201H111.2V133.88H124.8V46.1201Z" fill="white"/>
            </svg>
        )
    },
    {
        name: 'Vercel',
        svg: (
             <svg viewBox="0 0 1155 1000" fill="none" className="h-5 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <path d="M577.344 0L1154.69 1000H0L577.344 0Z" fill="black"/>
            </svg>
        )
    },
    {
        name: 'TypeScript',
        svg: (
             <svg viewBox="0 0 128 128" fill="none" className="h-6 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <path fill="#3178C6" d="M3.2 0h121.6c1.7 0 3.2 1.5 3.2 3.2v121.6c0 1.7-1.5 3.2-3.2 3.2H3.2C1.5 128 0 126.5 0 124.8V3.2C0 1.5 1.5 0 3.2 0z"/>
                <path fill="#fff" d="M72.2 101.4c0-3.3.4-6 1.4-8.2 1-2.2 2.3-4 4.1-5.4 1.8-1.5 3.9-2.5 6.4-3.2s5.1-.9 7.9-.9c2.3 0 4.5.3 6.6.9 2.1.6 4 1.4 5.5 2.5v11.9c-1.6-1.3-3.6-2.4-5.8-3.2-2.3-.9-4.7-1.3-7.2-1.3-2.6 0-4.9.4-6.8 1.3-2 .8-3.5 2.1-4.7 3.6-1.1 1.6-1.9 3.5-2.4 5.6-.5 2.1-.8 4.4-.8 6.9 0 2.5.3 4.8.8 6.9.5 2.1 1.3 4 2.4 5.6 1.1 1.6 2.7 2.8 4.7 3.6 2 .9 4.3 1.3 6.8 1.3 2.5 0 4.9-.4 7.2-1.3 2.3-.9 4.2-2 5.8-3.2v11.9c-1.6 1.1-3.5 2-5.5 2.5-2.1.6-4.3.9-6.6.9-2.8 0-5.5-.3-7.9-.9s-4.6-1.7-6.4-3.2c-1.8-1.5-3.2-3.3-4.1-5.4-1-2.2-1.4-4.9-1.4-8.2zM21.2 59.8h25v50.4h12V59.8h25V48.5h-62v11.3z"/>
            </svg>
        )
    }
];

export const EcosystemMarquee = () => {
    return (
        <section className="py-12 border-b border-zinc-100 bg-white overflow-hidden flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Powered by true web3 infrastructure</span>
            <div className="w-full flex overflow-hidden mask-gradient-horizontal">
                <div className="flex animate-marquee whitespace-nowrap min-w-full justify-around items-center gap-16 px-8">
                    {[...logos, ...logos, ...logos].map((logo, index) => (
                        <div key={index} className="flex items-center gap-3 shrink-0">
                            {logo.svg}
                            <span className="text-xl font-bold text-slate-300/80 tracking-tight">{logo.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <style jsx>{`
                .mask-gradient-horizontal {
                    mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                }
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 25s linear infinite;
                    width: max-content;
                }
            `}</style>
        </section>
    );
};
