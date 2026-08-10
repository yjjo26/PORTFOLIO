"use client";

import { NeuralWebBackground } from "@/components/ui/neural-web";

import { MCPGraphSection } from "@/components/mcp-graph";
import { SlackBotSection } from "@/components/slack-bot";
import { ScanlineOverlay } from "@/components/ui/scanline-overlay";
import { PortfolioShowcase } from "@/components/portfolio-showcase";

export default function Home() {
  // 풀스크린 인트로(HUD)는 제거 (2026-08-10 디렉터 지시) — 들어오자마자 프로젝트가 보인다.
  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-x-hidden overflow-y-auto selection:bg-stark-cyan/30">
      <ScanlineOverlay />
      <NeuralWebBackground />

      <div className="relative z-20 space-y-0 pb-32">
        <PortfolioShowcase />
        <MCPGraphSection />
        <SlackBotSection />
      </div>
    </main>
  );
}
