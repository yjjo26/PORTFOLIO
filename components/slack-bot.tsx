"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CornerDownLeft } from "lucide-react";

export function SlackBotSection() {
    const [messages, setMessages] = useState([
        { role: "bot", text: "Hello. How can I assist you with the system today?" }
    ]);
    const [input, setInput] = useState("");

    const getBotResponse = (userInput: string) => {
        const text = userInput.toLowerCase();
        
        if (text.includes("누구") || text.includes("이름") || text.includes("who are you")) {
            return "저는 Google Deepmind의 'Advanced Agentic Coding' 팀에서 개발한 AI 코딩 어시스턴트, **Antigravity(안티그래비티)** 입니다. 이 포트폴리오의 개발도 제가 함께 도왔습니다! 🚀";
        }
        if (text.includes("안녕") || text.includes("hello") || text.includes("hi")) {
            return "안녕하세요! 무엇을 도와드릴까요? 포트폴리오나 개발 관련 질문을 환영합니다.";
        }
        if (text.includes("포트폴리오") || text.includes("portfolio")) {
            return "이 포트폴리오는 Next.js(App Router), Tailwind CSS, Framer Motion 기반으로 제작되었으며, 저 Antigravity가 코드 작성과 배포, 트러블슈팅을 함께 진행했습니다.";
        }
        if (text.includes("할 줄 아는") || text.includes("능력") || text.includes("기능") || text.includes("what can you do")) {
            return "저는 파일 시스템 제어, 터미널 명령어 실행, 코드 작성 및 수정, 디버깅, 그리고 웹 애플리케이션 구축에 특화되어 있습니다. 말 그대로 'Agentic'하게 동작합니다.";
        }
        
        const defaultResponses = [
            "흥미로운 질문이네요. 조금 더 구체적으로 말씀해주시겠어요?",
            "해당 명령어에 대한 처리를 완료했습니다. 추가 지시를 내려주세요.",
            "이 포트폴리오의 주인이신 '용제'님은 다재다능한 풀스택 & AI 프로덕트 엔지니어입니다. 저도 아주 잘 알고 있죠!",
            "명령을 분석 중입니다... 완료되었습니다. 다른 도움이 필요하신가요?",
            "저는 당신의 페어 프로그래밍 파트너입니다. 언제든 코드를 작성할 준비가 되어있습니다."
        ];
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    };

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { role: "user", text: input }]);
        setInput("");

        setTimeout(() => {
            setMessages(prev => [...prev, { role: "bot", text: getBotResponse(input) }]);
        }, 800);
    };

    return (
        <section className="relative w-full py-16 sm:py-32 px-4 flex justify-center">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8 sm:mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-sf-blue/10 text-sf-blue text-xs font-medium mb-4">
                        AI INTEGRATION
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-light text-white mb-2">
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
                    <div className="h-64 sm:h-96 overflow-y-auto p-4 sm:p-8 space-y-4 sm:space-y-6 bg-black/40">
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
