'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StatWidgetProps {
    label: string;
    value: string | number;
    subValue?: string;
    icon?: React.ReactNode;
}

export const StatWidget = ({ label, value, subValue, icon }: StatWidgetProps) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-zinc-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
        >
            {icon && (
                <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center shrink-0">
                    {icon}
                </div>
            )}
            <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest italic">{label}</p>
                <h4 className="text-xl font-bold text-black tracking-tight">{value}</h4>
                {subValue && <p className="text-[10px] font-bold text-secondary uppercase">{subValue}</p>}
            </div>
        </motion.div>
    );
};
