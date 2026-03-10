"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CornerDownLeft } from "lucide-react";

export function SlackBotSection() {
    const [messages, setMessages] = useState([
        { role: "bot", text: "Hello. How can I assist you with the system today?" }
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { role: "user", text: input }]);
        setInput("");

        setTimeout(() => {
            setMessages(prev => [...prev, { role: "bot", text: `Processing request: "${input}"...` }]);
        }, 1000);
    };

    return (
        <section className="relative w-full py-32 px-4 flex justify-center">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-sf-blue/10 text-sf-blue text-xs font-medium mb-4">
                        AI INTEGRATION
                    </span>
                    <h2 className="text-4xl font-light text-white mb-2">
                        System Interface
                    </h2>
                    <p className="text-gray-500">Target Protocol Communication</p>
                </div>

                <div className="w-full sf-glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
                    {/* Header */}
                    <div className="h-14 bg-white/[0.02] border-b border-white/5 flex items-center px-6 gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                        <div className="ml-4 text-xs font-mono text-gray-500">root@ai-core:~</div>
                    </div>

                    {/* Chat Area */}
                    <div className="h-96 overflow-y-auto p-8 space-y-6 bg-black/40">
                        {messages.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                            >
                                <div className={`px-6 py-3 rounded-2xl text-sm max-w-[80%] leading-relaxed
                                    ${m.role === "bot"
                                        ? "bg-white/5 text-gray-300 rounded-tl-sm border border-white/5"
                                        : "bg-sf-blue text-white rounded-tr-sm shadow-lg shadow-sf-blue/20"}
                                `}>
                                    {m.text}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white/[0.02] border-t border-white/5">
                        <div className="relative">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-sf-blue/50 focus:ring-1 focus:ring-sf-blue/50 transition-all font-sans pr-12"
                                placeholder="Enter command..."
                            />
                            <button
                                onClick={handleSend}
                                className="absolute right-2 top-2 p-2 bg-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-sf-blue hover:shadow-lg transition-all"
                            >
                                <CornerDownLeft size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
