'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const GeometricProps = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Blue Sphere Top Left */}
            <motion.div
                animate={{
                    y: [0, -30, 0],
                    rotate: [0, 10, 0],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-20 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
            />

            {/* Indigo Sphere Bottom Right */}
            <motion.div
                animate={{
                    y: [0, 40, 0],
                    x: [0, 20, 0],
                    rotate: [0, -10, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute bottom-20 -right-20 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px]"
            />

            {/* Teal Floating Cube (Accent) */}
            <motion.div
                animate={{
                    y: [0, -50, 0],
                    rotate: [45, 90, 45],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute top-[40%] right-[10%] w-16 h-16 bg-secondary/20 rounded-2xl blur-xl rotate-45"
            />

            {/* Purple Floating Shape (Solana Accent) */}
            <motion.div
                animate={{
                    y: [0, 60, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 left-[15%] w-12 h-12 bg-purple-500/20 rounded-full blur-lg"
            />
        </div>
    );
};
