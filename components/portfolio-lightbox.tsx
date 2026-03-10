"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useCallback, useState } from "react";
import type { PortfolioProject } from "./portfolio-card";

interface LightboxProps {
    project: PortfolioProject | null;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
    hasPrev: boolean;
    hasNext: boolean;
}

const categoryColors: Record<string, string> = {
    WEB: "text-emerald-400",
    GAME: "text-rose-400",
    AI: "text-cyan-400",
};

const categoryLabels: Record<string, string> = {
    WEB: "WEB DESIGN",
    GAME: "GAME UI",
    AI: "AI PROJECT",
};

export function PortfolioLightbox({ project, onClose, onPrev, onNext, hasPrev, hasNext }: LightboxProps) {
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            if (zoomedImage) {
                setZoomedImage(null);
            } else {
                onClose();
            }
        }
        if (e.key === "ArrowLeft" && hasPrev && !zoomedImage) onPrev();
        if (e.key === "ArrowRight" && hasNext && !zoomedImage) onNext();
    }, [onClose, onPrev, onNext, hasPrev, hasNext, zoomedImage]);

    useEffect(() => {
        if (project) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [project, handleKeyDown]);

    // Reset zoom when project changes
    useEffect(() => {
        setZoomedImage(null);
    }, [project?.id]);

    return (
        <>
            <AnimatePresence>
                {project && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center"
                        onClick={onClose}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

                        {/* Content Panel */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative z-10 w-full sm:w-[90vw] max-w-4xl max-h-[95vh] sm:max-h-[85vh] overflow-y-auto sf-glass sm:rounded-3xl border-0 sm:border border-white/10 shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <X size={18} />
                            </button>

                            {/* Hero Area */}
                            <div className={`relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden sm:rounded-t-3xl`}>
                                {project.thumbnail ? (
                                    project.thumbnail.endsWith('.mp4') ? (
                                        <video
                                            src={project.thumbnail}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    ) : (
                                        <img
                                            src={project.thumbnail}
                                            alt={project.title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    )
                                ) : (
                                    <div className={`absolute inset-0 ${project.gradient}`} />
                                )}
                                <div className="absolute inset-0 bg-black/40" />
                                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                                    <motion.h2
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-2xl sm:text-4xl md:text-6xl font-light text-white tracking-tight text-center"
                                    >
                                        {project.title}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-white/50 font-mono text-xs sm:text-sm mt-2 sm:mt-3 tracking-widest text-center"
                                    >
                                        {project.titleKo}
                                    </motion.p>
                                </div>

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                                    <span className={`text-xs font-mono tracking-widest ${categoryColors[project.category]}`}>
                                        {categoryLabels[project.category]}
                                    </span>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-4 sm:p-8 md:p-12 space-y-6 sm:space-y-8">
                                {/* Meta Row */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-mono text-gray-500 tracking-widest">ROLE</div>
                                        <div className="text-white text-sm">{project.role}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-mono text-gray-500 tracking-widest">CATEGORY</div>
                                        <div className={`text-sm ${categoryColors[project.category]}`}>
                                            {categoryLabels[project.category]}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-mono text-gray-500 tracking-widest">PARTICIPATION</div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-grow h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-sf-blue to-blue-400 rounded-full"
                                                    style={{ width: `${project.participation}%` }}
                                                />
                                            </div>
                                            <span className="text-sf-blue text-sm font-mono">{project.participation}%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-white/5" />

                                {/* Description */}
                                <div>
                                    <div className="text-[10px] font-mono text-gray-500 tracking-widest mb-3">DESCRIPTION</div>
                                    <p className="text-gray-300 leading-relaxed text-sm font-sans">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Tech Stack */}
                                <div>
                                    <div className="text-[10px] font-mono text-gray-500 tracking-widest mb-3">TECH STACK</div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t, i) => (
                                            <span
                                                key={i}
                                                className="text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 font-mono hover:border-sf-blue/30 transition-colors"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Project Images Gallery */}
                                {project.images && project.images.length > 0 && (
                                    <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-white/5">
                                        <div className="text-[10px] font-mono text-gray-500 tracking-widest mb-4 sm:mb-6">PROJECT_GALLERY</div>
                                        <div className="flex flex-col gap-4 sm:gap-6">
                                            {project.images.map((imgSrc, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true, margin: "-50px" }}
                                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                                    className="w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-black/20 cursor-pointer group/img"
                                                    onClick={() => !imgSrc.endsWith('.mp4') && setZoomedImage(imgSrc)}
                                                >
                                                    {imgSrc.endsWith('.mp4') ? (
                                                        <video
                                                            src={imgSrc}
                                                            autoPlay
                                                            loop
                                                            muted
                                                            playsInline
                                                            className="w-full h-auto object-contain"
                                                        />
                                                    ) : (
                                                        <div className="relative">
                                                            <img
                                                                src={imgSrc}
                                                                alt={`${project.title} screenshot ${idx + 1}`}
                                                                className="w-full h-auto object-contain"
                                                            />
                                                            {/* Zoom Hint */}
                                                            <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors flex items-center justify-center">
                                                                <span className="opacity-0 group-hover/img:opacity-100 transition-opacity text-white text-xs font-mono bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                                                                    🔍 CLICK TO ZOOM
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Navigation Arrows */}
                        {hasPrev && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                                className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm"
                            >
                                <ChevronLeft size={20} />
                            </button>
                        )}
                        {hasNext && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onNext(); }}
                                className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm"
                            >
                                <ChevronRight size={20} />
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Fullscreen Image Zoom Modal */}
            <AnimatePresence>
                {zoomedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md cursor-zoom-out"
                        onClick={() => setZoomedImage(null)}
                    >
                        <button
                            onClick={() => setZoomedImage(null)}
                            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                        >
                            <X size={20} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            src={zoomedImage}
                            alt="Zoomed view"
                            className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
