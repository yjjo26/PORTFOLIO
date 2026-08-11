"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useCallback, useState } from "react";
import { PortfolioProject } from "@/lib/domain/models/project";

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
    const [prevProjectId, setPrevProjectId] = useState<string | null>(null);

    const projectId = project?.id || null;
    if (projectId !== prevProjectId) {
        setPrevProjectId(projectId);
        setZoomedImage(null);
    }

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
                                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
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
                                <div className="absolute inset-0 bg-black/50" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
                                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                                    <motion.h2
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-2xl sm:text-4xl md:text-6xl font-normal text-white tracking-tight text-center [text-shadow:0_2px_16px_rgba(0,0,0,0.85)]"
                                    >
                                        {project.title}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-white/80 font-mono text-xs sm:text-sm mt-2 sm:mt-3 tracking-widest text-center [text-shadow:0_1px_10px_rgba(0,0,0,0.9)]"
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
                                {/* 바로가기 — 링크가 있는 프로젝트만. 설명을 읽기 전에 직접 만져볼 수 있게 맨 위에 둔다 */}
                                {project.links && project.links.length > 0 && (
                                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                                        {project.links.map((l, i) => (
                                            <a
                                                key={i}
                                                href={l.url}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                                className={
                                                    l.primary
                                                        ? "inline-flex items-center gap-2 rounded-xl bg-sf-blue px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-400"
                                                        : "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-300 transition-colors hover:border-sf-blue/40 hover:text-white"
                                                }
                                            >
                                                {l.label}
                                                <span aria-hidden="true">↗</span>
                                            </a>
                                        ))}
                                    </div>
                                )}

                                {/* 숫자 배지 — 정리 글을 안 읽어도 이건 눈에 들어온다 */}
                                {project.stats && project.stats.length > 0 && (
                                    <div
                                        // 좁은 화면에서는 2열로 접는다 — 6열 고정이면 타일이 좁아 한 줄 설명이 삐져나온다
                                        className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:[grid-template-columns:repeat(var(--pp-cols),minmax(0,1fr))]"
                                        style={{ ["--pp-cols" as string]: Math.min(project.stats.length, 6) }}
                                    >
                                        {project.stats.map((s, i) => (
                                            <div
                                                key={i}
                                                className="rounded-xl border border-white/10 bg-white/[0.05] px-2.5 py-4 text-center"
                                            >
                                                <div className="font-mono text-sm font-bold text-sf-blue sm:text-base whitespace-nowrap">
                                                    {s.value}
                                                </div>
                                                {/* 서브 설명은 한 줄 고정 — 두 줄로 접히면 타일 높이가 들쭉날쭉해진다 */}
                                                <div className="mt-2 text-[12px] font-medium leading-normal text-gray-100 whitespace-nowrap">
                                                    {s.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Meta Row */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-mono text-gray-400 tracking-widest">ROLE</div>
                                        <div className="text-white text-[14px]">{project.role}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-mono text-gray-400 tracking-widest">CATEGORY</div>
                                        <div className={`text-sm ${categoryColors[project.category]}`}>
                                            {categoryLabels[project.category]}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-mono text-gray-400 tracking-widest">PARTICIPATION</div>
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
                                    <div className="text-[10px] font-mono text-gray-400 tracking-widest mb-3">DESCRIPTION</div>
                                    <p className="text-gray-200 leading-relaxed text-[15px] font-sans whitespace-pre-line">
                                        {project.description}
                                    </p>
                                </div>

                                {/* 정리 내용 — 소제목별로 나눠 읽기 쉽게 */}
                                {project.highlights && project.highlights.length > 0 && (
                                    <div className="space-y-4">
                                        {project.highlights.map((h, i) => (
                                            <div
                                                key={i}
                                                className="rounded-xl border border-white/5 bg-white/[0.03] p-4 sm:p-5"
                                            >
                                                <div className="mb-2 text-xs font-semibold tracking-wide text-sf-blue">
                                                    {h.label}
                                                </div>
                                                <p className="whitespace-pre-line text-[14px] leading-relaxed text-gray-200">
                                                    {h.body}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Tech Stack */}
                                <div>
                                    <div className="text-[10px] font-mono text-gray-400 tracking-widest mb-3">TECH STACK</div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t, i) => (
                                            <span
                                                key={i}
                                                className="text-[13px] text-gray-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 font-mono hover:border-sf-blue/30 transition-colors"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Project Images Gallery */}
                                {project.images && project.images.length > 0 && (
                                    <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-white/5">
                                        <div className="text-[10px] font-mono text-gray-400 tracking-widest mb-4 sm:mb-6">PROJECT_GALLERY</div>
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
                                                                style={{ filter: imgSrc.toLowerCase().includes('docker') ? 'blur(10px)' : 'none' }}
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
                                className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm"
                            >
                                <ChevronLeft size={20} />
                            </button>
                        )}
                        {hasNext && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onNext(); }}
                                className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm"
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
                            style={{ filter: zoomedImage.toLowerCase().includes('docker') ? 'blur(15px)' : 'none' }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
