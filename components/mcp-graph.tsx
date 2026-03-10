"use client";

import { motion } from "framer-motion";
import { HUDContainer } from "@/components/ui/hud-container";
import { useEffect, useRef, useState } from "react";

interface Node {
    id: string;
    x: number;
    y: number;
    label: string;
    type: "CORE" | "SERVER" | "NODE";
}

export function MCPGraphSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [nodes, setNodes] = useState<Node[]>([
        { id: "1", x: 120, y: 280, label: "Core Intelligence", type: "CORE" },
        { id: "2", x: 180, y: 450, label: "AntiGravity", type: "CORE" },
        { id: "3", x: 420, y: 120, label: "Context Server", type: "SERVER" },
        { id: "4", x: 380, y: 320, label: "Orchestrator", type: "SERVER" },
        { id: "5", x: 520, y: 480, label: "OpenClaw", type: "SERVER" },
        { id: "6", x: 340, y: 530, label: "n8n", type: "SERVER" },
        { id: "7", x: 750, y: 90, label: "Vector DB", type: "NODE" },
        { id: "8", x: 820, y: 220, label: "Inference API", type: "NODE" },
        { id: "9", x: 680, y: 380, label: "Supabase", type: "NODE" },
        { id: "10", x: 880, y: 420, label: "Gemini", type: "NODE" },
        { id: "11", x: 740, y: 550, label: "Claude", type: "NODE" },
    ]);

    const [draggingId, setDraggingId] = useState<string | null>(null);

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

    return (
        <section className="relative w-full py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-light text-white mb-2">
                        System Architecture
                    </h2>
                    <p className="text-gray-500 font-mono text-xs tracking-widest uppercase">
                        Model Context Protocol Integration
                    </p>
                </motion.div>

                <div className="relative rounded-3xl overflow-hidden border border-white/10 sf-glass h-[600px] shadow-2xl">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30 pointer-events-none" />

                    <div
                        ref={containerRef}
                        className="w-full h-full relative cursor-crosshair"
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
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
                                className={`absolute -ml-16 -mt-8 w-32 h-16 flex items-center justify-center rounded-full cursor-move z-10 
                                    ${node.type === "CORE" ? "bg-sf-blue/10 border border-sf-blue/50 text-sf-blue" : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"}
                                    backdrop-blur-md transition-colors
                                `}
                                onMouseDown={(e) => handleMouseDown(node.id, e)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="text-xs font-mono font-medium">{node.label}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Status Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/40 border-t border-white/5 backdrop-blur-md flex items-center px-6 justify-between text-[10px] font-mono text-gray-500">
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
