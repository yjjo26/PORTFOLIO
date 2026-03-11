"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function NeuralWebBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rotationRef = useRef({ x: 0, y: 0 });
    const targetRotationRef = useRef({ x: 0, y: 0 });
    const mousePosRef = useRef({ x: -1000, y: -1000 }); // Track raw mouse for lens
    const globeNodesRef = useRef<{ x: number; y: number; z: number; neighbors: number[] }[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const GLOBE_RADIUS = 750; // Larger globe for more immersive background
        const DOT_COUNT = 600;
        const NEIGHBOR_COUNT = 4;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initGlobe();
        };

        const initGlobe = () => {
            const points: { x: number; y: number; z: number; neighbors: number[] }[] = [];
            const goldenRatio = (1 + Math.sqrt(5)) / 2;

            for (let i = 0; i < DOT_COUNT; i++) {
                const theta = 2 * Math.PI * i / goldenRatio;
                const phi = Math.acos(1 - 2 * (i + 0.5) / DOT_COUNT);

                points.push({
                    x: GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta),
                    y: GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta),
                    z: GLOBE_RADIUS * Math.cos(phi),
                    neighbors: []
                });
            }

            for (let i = 0; i < DOT_COUNT; i++) {
                const p1 = points[i];
                const closest = points
                    .map((p2, idx) => ({ idx, dist: (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2 }))
                    .filter(item => item.idx !== i)
                    .sort((a, b) => a.dist - b.dist)
                    .slice(0, NEIGHBOR_COUNT)
                    .map(item => item.idx);

                p1.neighbors = closest;
            }
            globeNodesRef.current = points;
        };

        const rotate = (p: { x: number, y: number, z: number }, rotX: number, rotY: number) => {
            let x = p.x * Math.cos(rotY) - p.z * Math.sin(rotY);
            let z = p.x * Math.sin(rotY) + p.z * Math.cos(rotY);
            let y = p.y;

            let yNew = y * Math.cos(rotX) - z * Math.sin(rotX);
            z = y * Math.sin(rotX) + z * Math.cos(rotX);
            y = yNew;

            return { x, y, z };
        };

        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor;
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Inertial Rotation
            targetRotationRef.current.x += 0.0003;
            targetRotationRef.current.y += 0.0008;

            rotationRef.current.x = lerp(rotationRef.current.x, targetRotationRef.current.x, 0.05);
            rotationRef.current.y = lerp(rotationRef.current.y, targetRotationRef.current.y, 0.05);

            // Calculate projections
            const projections = globeNodesRef.current.map(p => {
                const rotated = rotate(p, rotationRef.current.x, rotationRef.current.y);
                const scale = 800 / (800 + rotated.z);

                let projX = rotated.x * scale + centerX;
                let projY = rotated.y * scale + centerY;
                let finalScale = scale;

                // --- LENS / MAGNIFICATION EFFECT ---
                // Calculate distance to mouse
                const dx = projX - mousePosRef.current.x;
                const dy = projY - mousePosRef.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const lensRadius = 200;

                if (dist < lensRadius) {
                    // Normalize distance (0 at center, 1 at edge)
                    const factor = 1 - (dist / lensRadius);
                    const magForce = factor * factor; // Non-linear falloff

                    // Magnify scale: Points near mouse get larger
                    finalScale *= (1 + magForce * 1.5);

                    // Optional: Bulge distortion (push points away or pull closer?)
                    // Let's try slight "Bulge Out" (Fisheye) to emphasize the lens
                    const pushFactor = magForce * 20;
                    projX += (dx / dist) * pushFactor;
                    projY += (dy / dist) * pushFactor;
                }

                return {
                    x: projX,
                    y: projY,
                    z: rotated.z,
                    scale: finalScale,
                    opacity: Math.max(0.1, (rotated.z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS))
                };
            });

            // Draw Connections First (Background)
            ctx.strokeStyle = "rgba(41, 151, 255, 0.1)";
            ctx.lineWidth = 0.5;

            // We need efficient lookup, but loop is okay for 600 pts
            projections.forEach((p, i) => {
                if (p.z < -200) return; // Aggressive culling for back nodes

                // Check mouse proximity for line intensity
                const dx = p.x - mousePosRef.current.x;
                const dy = p.y - mousePosRef.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const isNearMouse = dist < 200;

                globeNodesRef.current[i].neighbors.forEach(nIdx => {
                    const n = projections[nIdx];
                    if (n.z > -200) {
                        // If near mouse, brighten the lines significantly
                        if (isNearMouse) {
                            ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
                            ctx.lineWidth = 1;
                        } else {
                            ctx.strokeStyle = "rgba(41, 151, 255, 0.1)";
                            ctx.lineWidth = 0.5;
                        }

                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(n.x, n.y);
                        ctx.stroke();
                    }
                });
            });

            // Draw Nodes (Foreground)
            projections.forEach(p => {
                if (p.z < -200) return;

                const dx = p.x - mousePosRef.current.x;
                const dy = p.y - mousePosRef.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Brighten nodes near mouse
                const highlight = dist < 200 ? (1 - dist / 200) : 0;

                ctx.fillStyle = `rgba(${41 + highlight * 200}, ${151 + highlight * 100}, 255, ${p.opacity + highlight})`;

                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5 * p.scale, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            // 1. Rotation Inertia
            const x = (e.clientX - window.innerWidth / 2) * 0.00005;
            const y = (e.clientY - window.innerHeight / 2) * 0.00005;
            targetRotationRef.current.x += y;
            targetRotationRef.current.y += x;

            // 2. Track Mouse for Lens
            mousePosRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);

        resize();
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 z-0 pointer-events-none mix-blend-screen"
        />
    );
}
