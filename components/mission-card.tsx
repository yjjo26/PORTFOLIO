"use client";

import { motion } from "framer-motion";

interface Mission {
    id: string;
    title: string;
    role: string;
    tech: string[];
    description: string;
    status: "COMPLETED" | "IN_PROGRESS" | "CLASSIFIED";
}

export function MissionCard({ mission, index }: { mission: Mission; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="h-full"
        >
            <div className={`relative p-8 rounded-2xl sf-glass hover:bg-white/[0.02] transition-colors duration-500 border border-white/5 group hover:border-sf-blue/30 h-full flex flex-col`}>

                <div className="flex justify-between items-start mb-6">
                    <div className="bg-sf-blue/10 text-sf-blue text-[10px] px-3 py-1 rounded-full font-mono tracking-widest border border-sf-blue/20">
                        {mission.id}
                    </div>
                    <div className={`text-[10px] tracking-widest font-mono ${mission.status === "COMPLETED" ? "text-green-400" : "text-gray-500"}`}>
                        {mission.status}
                    </div>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-2 tracking-tight group-hover:text-sf-blue transition-colors">
                    {mission.title}
                </h3>

                <div className="text-sm text-gray-400 font-mono mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-sf-blue transition-colors" />
                    {mission.role}
                </div>

                <p className="text-gray-400 leading-relaxed text-sm mb-8 flex-grow font-sans">
                    {mission.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {mission.tech.map((t, i) => (
                        <span key={i} className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5 font-mono">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
