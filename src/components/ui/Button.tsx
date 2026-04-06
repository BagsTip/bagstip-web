'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    isLoading?: boolean;
    children: React.ReactNode;
}

export const Button = ({ 
    variant = 'primary', 
    isLoading, 
    disabled, 
    children, 
    className = '', 
    ...props 
}: ButtonProps) => {
    const baseStyles = "relative flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-sm transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
    
    const variants = {
        primary: "bg-black text-white hover:bg-zinc-800",
        secondary: "bg-secondary text-black hover:bg-accent",
        ghost: "bg-zinc-50 text-zinc-500 border border-zinc-100 hover:bg-zinc-100 hover:text-black",
        danger: "bg-red-50 text-red-500 border border-red-100 hover:bg-red-100",
    };

    return (
        <button 
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                />
            )}
            <span className={isLoading ? "opacity-50" : ""}>{children}</span>
        </button>
    );
};
