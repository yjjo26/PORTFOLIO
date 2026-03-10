export function ScanlineOverlay() {
    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden mix-blend-overlay opacity-30">
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]"
                style={{ backgroundSize: "100% 4px, 6px 100%" }}
            />
            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]" />

            {/* Scan bar animation */}
            <div className="absolute w-full h-[100px] bg-gradient-to-b from-transparent via-stark-cyan/10 to-transparent animate-[scan_8s_linear_infinite]"
                style={{ top: "-100px" }}
            />

            <style jsx global>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(120vh); }
                }
            `}</style>
        </div>
    );
}
