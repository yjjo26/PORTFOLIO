"use client";

import { motion } from "framer-motion";

export interface PortfolioProject {
    id: string;
    title: string;
    titleKo: string;
    category: "WEB" | "GAME" | "AI";
    role: string;
    tech: string[];
    description: string;
    participation: number;
    gradient: string;
    thumbnail?: string;
    images: string[];
}

interface PortfolioCardProps {
    project: PortfolioProject;
    index: number;
    onClick: () => void;
}

const categoryLabels: Record<string, string> = {
    WEB: "WEB DESIGN",
    GAME: "GAME UI",
    AI: "AI PROJECT",
};

const categoryColors: Record<string, string> = {
    WEB: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    GAME: "text-rose-400 bg-rose-400/10 border-rose-400/20",
    AI: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
};

export function PortfolioCard({ project, index, onClick }: PortfolioCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
            className="h-full"
        >
            <div
                onClick={onClick}
                className="group relative h-full flex flex-col rounded-2xl sf-glass border border-white/5 overflow-hidden cursor-pointer hover:border-sf-blue/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(41,151,255,0.08)]"
            >
                {/* Thumbnail Area */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                    {project.thumbnail ? (
                        project.thumbnail.endsWith('.mp4') ? (
                            <video
                                src={project.thumbnail}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        ) : (
                            <img
                                src={project.thumbnail}
                                alt={project.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        )
                    ) : (
                        <div
                            className={`absolute inset-0 ${project.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
                        />
                    )}
                    {/* Dark Overlay for readability */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />
                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                    {/* Project Title Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6">
                        <motion.div
                            className="text-white/90 text-xl sm:text-2xl font-light tracking-tight text-center"
                            whileHover={{ scale: 1.02 }}
                        >
                            {project.title}
                        </motion.div>
                        <div className="text-white/40 text-xs font-mono mt-2 tracking-widest">
                            {project.titleKo}
                        </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-mono tracking-widest border ${categoryColors[project.category]}`}>
                            {categoryLabels[project.category]}
                        </span>
                    </div>

                    {/* View Indicator */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/60 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                            <div className="w-1 h-1 bg-sf-blue rounded-full animate-pulse" />
                            VIEW_PROJECT
                        </div>
                    </div>
                </div>

                {/* Info Area */}
                <div className="flex flex-col flex-grow p-4 sm:p-6">
                    {/* Role */}
                    <div className="text-sm text-gray-400 font-mono mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-sf-blue transition-colors" />
                        {project.role}
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow font-sans line-clamp-3">
                        {project.description}
                    </p>

                    {/* Participation Bar */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[10px] font-mono text-gray-500 tracking-widest">PARTICIPATION</span>
                            <span className="text-[10px] font-mono text-sf-blue">{project.participation}%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-sf-blue to-blue-400 rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${project.participation}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                            />
                        </div>
                    </div>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t, i) => (
                            <span
                                key={i}
                                className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/5 font-mono"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
