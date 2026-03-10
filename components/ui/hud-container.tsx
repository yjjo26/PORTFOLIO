"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HUDContainerProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    noPadding?: boolean;
}

export function HUDContainer({ children, className, title, noPadding = false }: HUDContainerProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }} // Apple-like physics
            className={cn(
                "relative rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0A0A0A]/60 backdrop-blur-xl overflow-hidden group",
                !noPadding && "p-6",
                className
            )}
        >
            {/* Cinematic FUI Accents - Subtle */}
            {/* Top Left Corner */}
            <div className="absolute top-0 left-0 w-8 h-[1px] bg-gradient-to-r from-stark-cyan/0 via-stark-cyan to-stark-cyan/0 opacity-50" />
            <div className="absolute top-0 left-0 w-[1px] h-8 bg-gradient-to-b from-stark-cyan/0 via-stark-cyan to-stark-cyan/0 opacity-50" />

            {/* Bottom Right Corner */}
            <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-gradient-to-r from-stark-cyan/0 via-stark-cyan to-stark-cyan/0 opacity-50" />
            <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-gradient-to-b from-stark-cyan/0 via-stark-cyan to-stark-cyan/0 opacity-50" />

            {/* Header / Title Tag */}
            {title && (
                <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-4 border-b border-white/5 bg-white/2">
                    <div className="text-[10px] text-stark-cyan font-orbitron tracking-[0.2em] font-bold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-stark-cyan animate-pulse" />
                        {title}
                    </div>
                    <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                    </div>
                </div>
            )}

            {/* Content */}
            <div className={cn("relative z-10", title && "mt-4")}>
                {children}
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-stark-cyan/5 via-transparent to-spider-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </motion.div>
    );
}
