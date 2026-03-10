"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface DecodingTextProps {
    text: string;
    className?: string;
    revealSpeed?: number; // ms per character
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

export function DecodingText({ text, className, revealSpeed = 50 }: DecodingTextProps) {
    const [display, setDisplay] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iterations) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iterations >= text.length) {
                clearInterval(interval);
                setIsComplete(true);
            }

            iterations += 1 / 3; // Slower reveal, more scramble
        }, revealSpeed);

        return () => clearInterval(interval);
    }, [text, revealSpeed]);

    return (
        <motion.span
            className={className}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
        >
            {display}
            {!isComplete && <span className="animate-pulse text-stark-cyan">_</span>}
        </motion.span>
    );
}
