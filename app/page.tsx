"use client";

import { useState } from "react";
import { ReactiveHeroHUD } from "@/components/reactive-hero-hud";
import { NeuralWebBackground } from "@/components/ui/neural-web";
import { HUDContainer } from "@/components/ui/hud-container";
import { MCPGraphSection } from "@/components/mcp-graph";
import { SlackBotSection } from "@/components/slack-bot";
import { ScanlineOverlay } from "@/components/ui/scanline-overlay";
import { PortfolioShowcase } from "@/components/portfolio-showcase";

export default function Home() {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-x-hidden overflow-y-auto selection:bg-stark-cyan/30">
      <ScanlineOverlay />
      <NeuralWebBackground />

      <ReactiveHeroHUD onBootComplete={() => setIsBooted(true)} />

      {/* Main Content Sections (Load only after boot) */}
      {isBooted && (
        <div className="relative z-20 space-y-0 pb-32">
          <PortfolioShowcase />
          <MCPGraphSection />
          <SlackBotSection />
        </div>
      )}
    </main>
  );
}

