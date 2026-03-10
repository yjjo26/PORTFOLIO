"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface HolographicTiltProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number; // How much it tilts
}

export function HolographicTilt({ children, className, intensity = 15 }: HolographicTiltProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for tilt
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Calculate mouse position relative to center (-0.5 to 0.5)
        // Avoid division by zero
        if (width > 0 && height > 0) {
            const mouseXRel = (e.clientX - rect.left) / width - 0.5;
            const mouseYRel = (e.clientY - rect.top) / height - 0.5;
            x.set(mouseXRel);
            y.set(mouseYRel);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{
                rotateX,
                rotateY,
                perspective: 1000,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative group ${className}`}
        >
            {/* 3D Content Wrapper */}
            <div style={{ transform: "translateZ(20px)" }} className="relative z-10 w-full h-full">
                {children}
            </div>

            {/* Holographic Overlay Effects */}
            {/* 1. Reflective Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl z-20 mix-blend-overlay" />

            {/* 2. Arc Reactor Rotating Ring (Background) */}
            <div className="absolute -inset-10 border border-stark-cyan/10 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none z-0 group-hover:animate-[spin_4s_linear_infinite]"
                style={{ transform: "translateZ(-30px)" }}
            />

            {/* 3. Corner Brackets (Hologram Anchors) */}
            <div className="absolute -inset-1 border border-stark-cyan/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 scale-95 group-hover:scale-100 transition-transform" />

        </motion.div>
    );
}
