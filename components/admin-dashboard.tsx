"use client";

import { motion } from "framer-motion";
import { Activity, Database, Users, ShieldAlert } from "lucide-react";

export function AdminDashboardSection() {
    return (
        <section className="relative w-full py-24 px-4 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

                    {/* Left Panel: Typography */}
                    <div className="lg:col-span-1 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-light text-white leading-tight mb-4">
                                Control Plane
                            </h2>
                            <div className="h-0.5 w-12 bg-sf-blue rounded-full mb-6" />

                            <p className="text-base text-gray-400 font-sans leading-relaxed">
                                Real-time orchestration of multi-agent swarms. Monitoring latency, context cohesion, and operational security with precision.
                            </p>

                            <div className="mt-8 flex gap-4">
                                <button className="px-6 py-2 rounded-full border border-white/10 text-sm text-white hover:bg-white/5 transition-colors">
                                    View Logs
                                </button>
                                <button className="px-6 py-2 rounded-full bg-sf-blue text-white text-sm hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(41,151,255,0.3)]">
                                    System Status
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Panel: Clean Dashboard */}
                    <div className="lg:col-span-2">
                        <div className="w-full sf-glass rounded-3xl p-8 border border-white/10 relative overflow-hidden">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                                <div className="text-sm font-medium text-white">System Overview</div>
                                <div className="text-xs font-mono text-gray-500">LIVE_METRICS</div>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                {[
                                    { label: "Active Agents", val: "14", icon: Users },
                                    { label: "Tokens/s", val: "4.2K", icon: Activity },
                                    { label: "Latency", val: "12ms", icon: Database },
                                    { label: "Threats", val: "0", icon: ShieldAlert },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white/[0.03] p-4 rounded-2xl flex flex-col items-start hover:bg-white/[0.06] transition-colors"
                                    >
                                        <stat.icon className="w-5 h-5 mb-3 text-sf-blue opacity-80" />
                                        <span className="text-2xl font-light text-white">{stat.val}</span>
                                        <span className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide">{stat.label}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Clean Chart Area */}
                            <div className="h-48 w-full bg-white/[0.02] rounded-xl relative flex items-end justify-between px-4 pb-0 overflow-hidden">
                                {Array.from({ length: 30 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1.5 rounded-t-full bg-sf-blue/40"
                                        initial={{ height: "10%" }}
                                        animate={{ height: `${Math.random() * 60 + 20}%` }}
                                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: i * 0.05 }}
                                    />
                                ))}
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
