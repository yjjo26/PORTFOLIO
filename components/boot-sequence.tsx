"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BootSequence({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 1200); // Wait a bit after 100%
                    return 100;
                }
                return Math.min(prev + 1, 100);
            });
        }, 40); // Slower, more deliberate loading

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030303] text-white overflow-hidden">
            <div className="relative flex flex-col items-center">

                {/* Core Arc Reactor Structure */}
                <div className="relative w-80 h-80 flex items-center justify-center">

                    {/* Ring 1 - Outer Slow Spin */}
                    <motion.div
                        className="absolute inset-0 border border-stark-cyan/30 rounded-full border-t-transparent border-b-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                    />

                    {/* Ring 2 - Inner Fast Reverse Spin */}
                    <motion.div
                        className="absolute inset-4 border-2 border-stark-cyan/50 rounded-full border-r-transparent border-l-transparent"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                    />

                    {/* Ring 3 - Dashed Tech Ring */}
                    <motion.div
                        className="absolute inset-8 border border-white/20 rounded-full border-dashed"
                        animate={{ rotate: 180 }}
                        transition={{ duration: 12, ease: "linear", repeat: Infinity }}
                    />

                    {/* Center Core Pulse */}
                    <motion.div
                        className="w-32 h-32 bg-stark-cyan/10 rounded-full blur-xl absolute"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="w-24 h-24 bg-white/5 rounded-full border border-stark-cyan/80 z-10 flex items-center justify-center shadow-[0_0_20px_#00E5FF]">
                        <span className="text-2xl font-bold font-orbitron text-white">{Math.round(progress)}%</span>
                    </div>

                </div>

                {/* Text Status */}
                <div className="mt-8 space-y-1 text-center font-rajdhani tracking-[0.2em] text-stark-cyan/80 text-sm">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={progress < 30 ? "init" : progress < 60 ? "calib" : "ready"}
                    >
                        {progress < 30 && "INITIALIZING SYSTEMS..."}
                        {progress >= 30 && progress < 60 && "CALIBRATING HOLOGRAPHIC LENS..."}
                        {progress >= 60 && progress < 100 && "ESTABLISHING NEURAL LINK..."}
                        {progress === 100 && "SYSTEM ONLINE"}
                    </motion.div>
                </div>

            </div>

            {/* Background HUD Grid Scan */}
            <motion.div
                className="absolute inset-0 bg-stark-cyan/5 pointer-events-none"
                initial={{ height: "0%" }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
                style={{ backgroundSize: "100% 2px", backgroundImage: "linear-gradient(transparent 50%, rgba(0, 229, 255, 0.1) 50%)" }}
            />
        </div>
    );
}
