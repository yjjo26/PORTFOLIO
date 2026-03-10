"use client";

import { motion } from "framer-motion";
import { HUDContainer } from "@/components/ui/hud-container";
import { useEffect, useRef, useState, useCallback } from "react";

interface Node {
    id: string;
    x: number;
    y: number;
    label: string;
    type: "CORE" | "SERVER" | "NODE";
}

// Positions as percentages (0-100) for responsive scaling
const INITIAL_NODES: { id: string; px: number; py: number; label: string; type: "CORE" | "SERVER" | "NODE" }[] = [
    { id: "1", px: 12, py: 45, label: "Core Intelligence", type: "CORE" },
    { id: "2", px: 18, py: 72, label: "AntiGravity", type: "CORE" },
    { id: "3", px: 42, py: 19, label: "Context Server", type: "SERVER" },
    { id: "4", px: 38, py: 52, label: "Orchestrator", type: "SERVER" },
    { id: "5", px: 52, py: 78, label: "OpenClaw", type: "SERVER" },
    { id: "6", px: 34, py: 86, label: "n8n", type: "SERVER" },
    { id: "7", px: 75, py: 14, label: "Vector DB", type: "NODE" },
    { id: "8", px: 82, py: 36, label: "Inference API", type: "NODE" },
    { id: "9", px: 68, py: 62, label: "Supabase", type: "NODE" },
    { id: "10", px: 88, py: 68, label: "Gemini", type: "NODE" },
    { id: "11", px: 74, py: 90, label: "Claude", type: "NODE" },
];

export function MCPGraphSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [draggingId, setDraggingId] = useState<string | null>(null);

    // Convert percentage positions to pixel positions based on container size
    const updateNodePositions = useCallback(() => {
        if (!containerRef.current) return;
        const { clientWidth, clientHeight } = containerRef.current;
        setNodes(INITIAL_NODES.map(n => ({
            id: n.id,
            x: (n.px / 100) * clientWidth,
            y: (n.py / 100) * clientHeight,
            label: n.label,
            type: n.type,
        })));
    }, []);

    useEffect(() => {
        updateNodePositions();
        window.addEventListener("resize", updateNodePositions);
        return () => window.removeEventListener("resize", updateNodePositions);
    }, [updateNodePositions]);

    // Mouse events (Desktop)
    const handleMouseDown = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setDraggingId(id);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (draggingId && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setNodes(prev => prev.map(n => n.id === draggingId ? {
                ...n,
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            } : n));
        }
    };

    const handleMouseUp = () => {
        setDraggingId(null);
    };

    // Touch events (Mobile)
    const handleTouchStart = (id: string, e: React.TouchEvent) => {
        e.stopPropagation();
        setDraggingId(id);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (draggingId && containerRef.current) {
            const touch = e.touches[0];
            const rect = containerRef.current.getBoundingClientRect();
            setNodes(prev => prev.map(n => n.id === draggingId ? {
                ...n,
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            } : n));
        }
    };

    const handleTouchEnd = () => {
        setDraggingId(null);
    };

    return (
        <section className="relative w-full py-12 sm:py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-8 sm:mb-12"
                >
                    <h2 className="text-2xl sm:text-3xl font-light text-white mb-2">
                        System Architecture
                    </h2>
                    <p className="text-gray-500 font-mono text-xs tracking-widest uppercase">
                        Model Context Protocol Integration
                    </p>
                </motion.div>

                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 sf-glass h-[400px] sm:h-[600px] shadow-2xl">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30 pointer-events-none" />

                    <div
                        ref={containerRef}
                        className="w-full h-full relative cursor-crosshair touch-none"
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onTouchCancel={handleTouchEnd}
                    >
                        {/* Connecting Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            {nodes.map(node => (
                                nodes.filter(n => n.id !== node.id && (Math.abs(n.x - node.x) < 400)).map(target => (
                                    <motion.line
                                        key={`${node.id}-${target.id}`}
                                        x1={node.x} y1={node.y}
                                        x2={target.x} y2={target.y}
                                        stroke="#2997FF"
                                        strokeWidth="1"
                                        strokeOpacity="0.2"
                                    />
                                ))
                            ))}
                        </svg>

                        {/* Nodes */}
                        {nodes.map(node => (
                            <motion.div
                                key={node.id}
                                style={{ left: node.x, top: node.y }}
                                className={`absolute -ml-12 -mt-5 w-24 h-10 sm:-ml-16 sm:-mt-8 sm:w-32 sm:h-16 flex items-center justify-center rounded-full cursor-move z-10 
                                    ${node.type === "CORE" ? "bg-sf-blue/10 border border-sf-blue/50 text-sf-blue" : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"}
                                    backdrop-blur-md transition-colors
                                `}
                                onMouseDown={(e) => handleMouseDown(node.id, e)}
                                onTouchStart={(e) => handleTouchStart(node.id, e)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="text-[10px] sm:text-xs font-mono font-medium">{node.label}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Status Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-10 bg-black/40 border-t border-white/5 backdrop-blur-md flex items-center px-4 sm:px-6 justify-between text-[9px] sm:text-[10px] font-mono text-gray-500">
                        <div>NODES_ONLINE: {nodes.length}</div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            SYSTEM_STABLE
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
