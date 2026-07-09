"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { PortfolioCard } from "./portfolio-card";
import { PortfolioLightbox } from "./portfolio-lightbox";
import { FilterCategory, PortfolioProject } from "@/lib/domain/models/project";
import { GetProjectsUseCase } from "@/lib/application/use-cases/get-projects";
import { StaticProjectRepository } from "@/lib/infrastructure/repositories/static-project";

// Clean Architecture: Dependency Injection / Instantiation
const projectRepository = new StaticProjectRepository();
const getProjectsUseCase = new GetProjectsUseCase(projectRepository);

const FILTERS: { label: string; value: FilterCategory }[] = [
    { label: "ALL", value: "ALL" },
    { label: "AI PROJECT", value: "AI" },
    { label: "GAME UI", value: "GAME" },
    { label: "WEB DESIGN", value: "WEB" },
];

const filterColors: Record<FilterCategory, string> = {
    ALL: "bg-sf-blue text-white shadow-[0_0_20px_rgba(41,151,255,0.3)]",
    WEB: "bg-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.2)]",
    GAME: "bg-rose-500/20 text-rose-400 shadow-[0_0_20px_rgba(251,113,133,0.2)]",
    AI: "bg-cyan-500/20 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]",
};

export function PortfolioShowcase() {
    const [projects, setProjects] = useState<PortfolioProject[]>([]);
    const [activeFilter, setActiveFilter] = useState<FilterCategory>("ALL");
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // Fetch projects dynamically via the Use Case (Application layer)
    useEffect(() => {
        getProjectsUseCase.execute(activeFilter).then((data) => {
            setProjects(data);
        });
    }, [activeFilter]);

    const selectedProject = selectedIndex !== null ? projects[selectedIndex] : null;

    return (
        <section className="relative w-full py-16 sm:py-32 px-4 md:px-8 z-20">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 flex flex-col items-center justify-center text-center space-y-4"
                >
                    <div className="w-10 h-1 bg-sf-blue rounded-full" />
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                        Project Archive
                    </h2>
                    <p className="text-gray-500 font-mono text-sm tracking-wide">
                        DESIGN & PUBLISHING PORTFOLIO
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex flex-wrap justify-center gap-2 mb-16"
                >
                    {FILTERS.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => {
                                setActiveFilter(filter.value);
                                setSelectedIndex(null);
                            }}
                            className={`relative px-5 py-2 rounded-full text-xs font-mono tracking-widest transition-all duration-300 border ${activeFilter === filter.value
                                ? `${filterColors[filter.value]} border-transparent`
                                : "border-white/10 text-gray-500 hover:text-white hover:border-white/20 hover:bg-white/5"
                                }`}
                        >
                            {filter.label}
                            {activeFilter === filter.value && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute inset-0 rounded-full -z-10"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </motion.div>

                {/* Project Count */}
                <div className="text-center mb-8">
                    <span className="text-[10px] font-mono text-gray-600 tracking-widest">
                        PROJECTS_FOUND: {projects.length}
                    </span>
                </div>

                {/* Project Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <PortfolioCard
                                    project={project}
                                    index={index}
                                    onClick={() => setSelectedIndex(index)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox */}
            <PortfolioLightbox
                project={selectedProject}
                onClose={() => setSelectedIndex(null)}
                onPrev={() => setSelectedIndex(prev => prev !== null && prev > 0 ? prev - 1 : prev)}
                onNext={() => setSelectedIndex(prev => prev !== null && prev < projects.length - 1 ? prev + 1 : prev)}
                hasPrev={selectedIndex !== null && selectedIndex > 0}
                hasNext={selectedIndex !== null && selectedIndex < projects.length - 1}
            />
        </section>
    );
}
