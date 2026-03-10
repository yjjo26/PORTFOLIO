"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight, Code, Search, Database, Globe, Command, Cpu } from "lucide-react";
import { DecodingText } from "@/components/ui/decoding-text";

export function ReactiveHeroHUD({ onBootComplete }: { onBootComplete: () => void }) {
    const [status, setStatus] = useState<"BOOTING" | "TRANSITION" | "DASHBOARD">("BOOTING");
    const [progress, setProgress] = useState(0);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Ultra-smooth, floaty physics for Clean SF
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 40, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 40, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set((clientX / innerWidth) - 0.5);
        mouseY.set((clientY / innerHeight) - 0.5);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setStatus("TRANSITION");
                    setTimeout(() => {
                        setStatus("DASHBOARD");
                        onBootComplete();
                    }, 1000);
                    return 100;
                }
                return Math.min(prev + 2, 100);
            });
        }, 20);
        return () => clearInterval(interval);
    }, [onBootComplete]);

    return (
        <div
            className="relative h-screen w-full overflow-hidden flex items-center justify-center selection:bg-sf-blue/30 perspective-[2000px]"
            onMouseMove={handleMouseMove}
        >
            {/* Minimal Grid Background */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 pointer-events-none mix-blend-screen" />

            {/* Clean Top Bar */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-20 flex items-center justify-between px-4 sm:px-12 z-20 pointer-events-none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-sf-blue rounded-full animate-pulse" />
                    <span className="text-[10px] text-gray-400 font-mono tracking-widest">SYSTEM_OPTIMAL</span>
                </div>
                <div className="text-[10px] text-gray-600 font-mono">
                    {new Date().toISOString().split('T')[0]}
                </div>
            </motion.div>

            {/* MAIN INTERFACE */}
            <motion.div
                className="relative z-10"
                style={{
                    rotateX: status === "DASHBOARD" ? rotateX : 0,
                    rotateY: status === "DASHBOARD" ? rotateY : 0,
                    transformStyle: "preserve-3d"
                }}
            >
                {/* 1. Main Glass Panel (The "Card") */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="relative w-[90vw] max-w-[500px] h-[250px] sm:h-[300px] sf-glass rounded-2xl flex flex-col items-center justify-center overflow-hidden"
                    style={{ transform: "translateZ(0px)" }}
                >
                    {/* Status Light */}
                    <div className="absolute top-6 right-6 flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_#30D158]" />
                    </div>

                    {status === "BOOTING" ? (
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 border-2 border-t-sf-blue border-white/10 rounded-full animate-spin" />
                            <div className="font-mono text-xl text-white tracking-widest">{Math.round(progress)}%</div>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-center space-y-4 z-10"
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sf-blue/10 text-sf-blue mb-2">
                                <Cpu size={24} />
                            </div>
                            <h1 className="text-4xl font-light tracking-tight text-white mb-1">
                                <DecodingText text="AI Engineer" revealSpeed={50} />
                            </h1>
                            <p className="text-sm text-gray-400 font-mono tracking-wide">
                                BUILDING INTELLIGENT SYSTEMS
                            </p>
                        </motion.div>
                    )}
                </motion.div>

                {/* 2. Floating Orbital Elements (Clean) */}
                {status === "DASHBOARD" && [
                    { icon: Code, x: -180, y: 0, smX: -320, smY: 0, delay: 0.1 },
                    { icon: Database, x: 180, y: 0, smX: 320, smY: 0, delay: 0.2 },
                    { icon: Search, x: 0, y: -140, smX: 0, smY: -200, delay: 0.3 },
                    { icon: Globe, x: 0, y: 140, smX: 0, smY: 200, delay: 0.4 },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, x: typeof window !== 'undefined' && window.innerWidth >= 640 ? item.smX : item.x, y: typeof window !== 'undefined' && window.innerWidth >= 640 ? item.smY : item.y }}
                        transition={{ delay: item.delay, type: "spring", stiffness: 100 }}
                        className="absolute top-1/2 left-1/2 -ml-5 -mt-5 w-10 h-10 sm:-ml-8 sm:-mt-8 sm:w-16 sm:h-16 sf-glass rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
                        style={{ transform: "translateZ(50px)" }}
                    >
                        <item.icon className="text-white/80" size={16} />
                    </motion.div>
                ))}

            </motion.div>
        </div>
    );
}
