"use client";

import { motion } from "framer-motion";
import { MissionCard } from "./mission-card";

const MISSIONS = [
    {
        id: "001",
        title: "AI Context Studio",
        role: "Lead Engineer",
        tech: ["Next.js 14", "React Flow", "MCP", "Supabase"],
        description: "AI 컨텍스트 윈도우 관리를 위한 시각적 인터페이스를 설계했습니다. 프롬프트 체이닝과 벡터 데이터베이스 연결을 위한 노드 기반 그래프 에디터를 구현했습니다.",
        status: "COMPLETED" as const,
    },
    {
        id: "002",
        title: "Neural Search Bridge",
        role: "Interface Specialist",
        tech: ["TypeScript", "Vector Search", "Streaming UI"],
        description: "검색 체감 대기시간을 40% 단축한 스트리밍 우선 검색 인터페이스를 개발했습니다. 하이브리드 검색(키워드 + 시맨틱)과 실시간 피드백 루프를 통합했습니다.",
        status: "COMPLETED" as const,
    },
    {
        id: "003",
        title: "Project: WEB-SLINGER",
        role: "Agent Orchestrator",
        tech: ["LangChain", "Slack Bolt", "Framer Motion"],
        description: "슬랙(Slack) 내부에서 작동하는 자율 멀티 에이전트 시스템을 구축 중입니다. 프론트엔드 코드를 배포하고 다양한 CI/CD 파이프라인을 자율적으로 실행할 수 있습니다.",
        status: "IN_PROGRESS" as const,
    },
    {
        id: "CL-X",
        title: "Classified Protocol",
        role: "Unknown",
        tech: ["Quantum UI", "Neural Link"],
        description: "[REDACTED] 데이터 스트림. 10등급 보안 승인이 필요합니다. 접근을 위해 생체 스캔이 요구됩니다.",
        status: "CLASSIFIED" as const,
    }
];

export function MissionLogSection() {
    return (
        <section className="relative w-full py-32 px-4 md:px-8 z-20">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 flex flex-col items-center justify-center text-center space-y-4"
                >
                    <div className="w-10 h-1 bg-sf-blue rounded-full" />
                    <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
                        Selected Works
                    </h2>
                    <p className="text-gray-500 font-mono text-sm tracking-wide">
                        ENGINEERING & INTELLIGENCE
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
                    {MISSIONS.map((mission, index) => (
                        <MissionCard key={mission.id} mission={mission} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
