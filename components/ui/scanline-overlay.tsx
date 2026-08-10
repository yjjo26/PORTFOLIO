export function ScanlineOverlay() {
    // 스캔라인·RGB 색번짐·비네트는 화면 전체 글자를 뿌옇게 만들어 제거
    // (2026-08-10 디렉터 지시: 폰트 가독성). 흐르는 스캔 바 하나만 남겨 SF 무드를 유지한다.
    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
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
