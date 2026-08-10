import { PortfolioProject } from "../../domain/models/project";
import { IProjectRepository } from "../../domain/repositories/project-repo";

const PROJECTS: PortfolioProject[] = [
    // === 1~3. AI PROJECTS (TOP) ===
    {
        id: "P-014",
        title: "ProtoPang",
        titleKo: "프로토팡 (기획서 → 플레이 가능한 프로토타입 생성기)",
        category: "AI",
        role: "Product Engineer (기획 · 설계 · 구현 · QA 전담)",
        tech: ["React", "TypeScript", "Vite", "Gemini·Claude·GPT·Ollama API", "pptxgenjs", "Cloudflare Pages Functions", "Cloudflare KV"],
        description: "기획서를 넣거나 한 줄로 말하면, 실제로 플레이되는 게임이 나옵니다.\n\n보여주기 전에 숨은 창에서 몰래 먼저 돌려보고, 안 돌면 오류를 AI 에게 돌려줘 고쳐 받습니다. 결과는 슬라이더로 만지고 말 한 줄로 고쳐서, PPT·HTML 로 그대로 가져갑니다. 키 없이 12시간 3번 무료 체험.",
        participation: 100,
        gradient: "bg-gradient-to-br from-fuchsia-900/80 via-violet-800/60 to-indigo-900/80",
        thumbnail: "/portfolio/protopang_00_thumb.png",
        images: [
            "/portfolio/protopang_11_docgame.png",
            "/portfolio/protopang_12_sliders.png",
            "/portfolio/protopang_10_landing.png"
        ],
        stats: [
            { value: "① 넣기", label: "PPT·워드·한글·PDF 또는 대화 한 줄" },
            { value: "② 정리", label: "문장 단위 노트 — 앞말이 안 사라짐" },
            { value: "③ 생성", label: "AI가 게임을 통째로 (계약 6줄)" },
            { value: "④ 검사·수리", label: "먼저 돌려보고 자동 수리 ≤2회" },
            { value: "⑤ 결과", label: "슬라이더 · 말 한 줄로 고치기" },
            { value: "⑥ 내보내기", label: "pptx · md · html(실행) · zip" },
        ],
        links: [
            { label: "라이브 데모 열기", url: "https://protopang.pages.dev", primary: true },
        ],
        highlights: [
            {
                label: "발상의 전환",
                body: "AI 를 가뒀다가 실패했고, 풀어주고 검증으로 감쌌습니다 — AI 가 통째로 쓰고, 저는 검사·수리·회수만.",
            },
            {
                label: "정직한 실패",
                body: "못 하면 화면이 그대로 말합니다 — \'두 번 고쳐도 안 돌아갔습니다\'. 작은 모델은 버튼·수치판으로 폴백.",
            },
            {
                label: "품질",
                body: "회귀 테스트 204개 · 배포본 실브라우저 전수 검사 59건 통과 · 샌드박스 탈출 직접 실증해 차단.",
            },
        ],
    },
    {
        id: "P-001",
        title: "JubUp",
        titleKo: "줍업 (지능형 낚시/캠핑 통합 트립 플래닝 플랫폼)",
        category: "AI",
        role: "AI Product Engineer & Full-Stack",
        tech: ["n8n", "Docker", "Supabase", "Vector Search", "Naver Map API", "Next.js"],
        description: "n8n, Supabase, Docker를 활용한 백엔드 데이터 수집 및 자동화 파이프라인을 구축했습니다. nomic-embed-text 모델 기반 벡터 검색(Vector Search)을 도입하여, 사용자 자연어 의도에 맞춘 최적의 스팟 및 경유지 추천 로직을 추가했습니다.(추가 청소 SNS 인증 및 포인트 쇼핑 구축까지) 프론트엔드 예외 처리 및 Naver Map 렌더링 최적화 등 풀스택 트러블슈팅을 주도적으로 수행하였습니다. 전국 8,400+ 낚시·캠핑 명소 AI 검색 및 자연어 경로 추천 기능과 청소 인증을 통한 ESG 포인트 시스템을 제공합니다.\n(공공데이터 여러개 수집 > 데이터에 추가 상세 데이터 검색 > 데이터 표준화 > DB 등록)\n(데이터 검색 모델 > 검색 데이터 표준화 > 추가 상세 데이터 검색 > DB 등록)",
        participation: 100,
        gradient: "bg-gradient-to-br from-cyan-900/80 via-blue-800/60 to-indigo-900/80",
        thumbnail: "/portfolio/jubup_main_stitched_v2.png",
        images: [
            "/portfolio/jubup_main_stitched_v2.png",
            "/portfolio/jubup_characters.mp4",
            "/portfolio/jubup_workflow.webp",
            "/portfolio/jubup_db.webp",
            "/portfolio/jubup_docker.png"
        ],
    },
    {
        id: "P-002",
        title: "Zero-Token Pipeline",
        titleKo: "제로 토큰 자동화 (문서 → XML → 파이썬 워커 조립)",
        category: "AI",
        role: "AI Product Engineer",
        tech: ["Python", "XML (OOXML)", "Markdown", "Claude API", "Agent Skills"],
        description: "AI 는 처음 한 번만 씁니다 — 그 뒤로는 토큰 0 으로 돌아가는 자동화 환경입니다.\n\n기획서를 AI 가 XML 로 바꿔 두면, 미리 만들어 둔 파이썬 워커가 토큰 없이 컴포넌트를 조립합니다. 워커가 모이면 파이프라인, 파이프라인을 패키징하면 앱이 됩니다.",
        participation: 100,
        gradient: "bg-gradient-to-br from-violet-900/80 via-purple-800/60 to-blue-900/80",
        thumbnail: "/portfolio/zerotoken_thumb2.png",
        images: ["/portfolio/zerotoken_thumb2.png", "/portfolio/antigravity_framework.jpg"],
        stats: [
            { value: "① 문서", label: "기획서 · docx · xlsx · pptx" },
            { value: "② XML 변환", label: "AI 는 여기 한 번만" },
            { value: "③ 워커 조립", label: "파이썬 컴포넌트 — 토큰 0" },
            { value: "④ 회수", label: "문서 재파싱 · 패키징하면 앱" },
        ],
        highlights: [
            {
                label: "토큰 0 원칙",
                body: "조립을 AI 가 하면 토큰 낭비, 자동화가 하면 토큰 0 — AI 는 워커를 처음 만들 때 딱 한 번만 씁니다.",
            },
            {
                label: "왜 XML 인가",
                body: "docx·xlsx·pptx 는 전부 XML — 기획서·데이터 구조가 한 형식으로 오가고, 조립 결과를 다시 문서로 파싱할 수 있습니다.",
            },
            {
                label: "사람이 읽는 구조",
                body: "마크다운 컨벤션과 SSOT 로 워커 구조를 확정 — 유지보수는 AI 없이 사람이 직접 합니다.",
            },
        ],
    },

    // === 3. ComfyUI BMW Contest ===
    {
        id: "P-008",
        title: "ComfyUI BMW Contest",
        titleKo: "컴피UI BMW 공모전",
        category: "AI",
        role: "AI Image Creator",
        tech: ["ComfyUI", "Stable Diffusion", "Lora Workflow"],
        description: "ComfyUI 노드 기반 워크플로우를 활용하여 BMW 공모전용 아트워크와 에셋을 생성했습니다. 캐릭터 선정부터 로라(LoRA) 학습, 자동차 그래픽 통합까지 AI 파이프라인 전반을 제어했습니다.",
        participation: 100,
        gradient: "bg-gradient-to-br from-indigo-900/80 via-blue-800/60 to-cyan-900/80",
        thumbnail: "/portfolio/bmw_contest.mp4",
        images: [
            "/portfolio/bmw_contest.mp4",
            "/portfolio/bmw_stitched_01_character.jpg",
            "/portfolio/bmw_stitched_02_lora.jpg",
            "/portfolio/bmw_stitched_03_video_assets.jpg",
            "/portfolio/bmw_stitched_04_car_graphics.jpg"
        ],
    },

    // === 4~7. GAME UI & TECH-ART ===
    {
        id: "P-003",
        title: "Sudden Attack & Various Artworks",
        titleKo: "서든어택 UI/UX 개선 및 기타 아트워크",
        category: "GAME",
        role: "UI/UX Designer & Concept Artist",
        tech: ["Game UI", "UX Design", "Usability Test", "Concept Art"],
        description: "FPS 유저의 시선 동선과 직관성을 최우선으로 고려하여 인게임 UI 디자인과 구조적 사용성을 대폭 개선했습니다. 빠르고 명확한 정보 전달을 통해 전반적인 게임 플레이 경험을 고도화하였으며, 콜오브듀티 등 다양한 프로젝트 톤앤매너에 맞춘 컨셉 아트 및 UI 디자인 작업도 수행하였습니다.",
        participation: 100,
        gradient: "bg-gradient-to-br from-rose-900/80 via-red-800/60 to-orange-900/80",
        thumbnail: "/portfolio/sudden_ui01.webp",
        images: [
            "/portfolio/sudden_ui01.webp",
            "/portfolio/sudden_ui0101.webp",
            "/portfolio/sudden_ui0102.webp",
            "/portfolio/sudden_ui0103.webp",
            "/portfolio/cod_053.webp"
        ],
    },
    {
        id: "P-004-1",
        title: "Dungeon & Fighter - Game UI",
        titleKo: "던전앤파이터 인게임 UI",
        category: "GAME",
        role: "UI/UX Designer",
        tech: ["Game UI", "UX Structure", "Tech-Art"],
        description: "던전앤파이터 게임 내 UI 디자인 및 배경, 캐릭터 드로잉, 영상까지 이벤트 작업을 진행했습니다. 세계관 특유의 톤앤매너를 반영하여 작업했습니다.",
        participation: 100,
        gradient: "bg-gradient-to-br from-amber-900/80 via-orange-800/60 to-red-900/80",
        thumbnail: "/portfolio/df_ui0200.mp4",
        images: ["/portfolio/df_ui0200.mp4"],
    },
    {
        id: "P-004-2",
        title: "Dungeon & Fighter - Promo Asset",
        titleKo: "던전앤파이터 프로모션 에셋",
        category: "GAME",
        role: "Tech-Art Specialist",
        tech: ["Promotional Assets", "Concept Art", "Video Assets"],
        description: "던전앤파이터 인게임 프로모션 에셋을 집중적으로 UI 디자인 및 배경, 캐릭터 드로잉 후 영상까지 제작했습니다. 추가 배경 아트워크 및 영상 이펙트용 소스를 구현했습니다.",
        participation: 100,
        gradient: "bg-gradient-to-br from-orange-900/80 via-amber-800/60 to-yellow-900/80",
        thumbnail: "/portfolio/df_ui0201.mp4",
        images: [
            "/portfolio/df_ui0201.mp4",
            "/portfolio/df_ui0202.mp4",
            "/portfolio/df_ui0203.mp4"
        ],
    },
    {
        id: "P-009",
        title: "UI Concept Drawings",
        titleKo: "UI 컨셉 드로잉 모음",
        category: "GAME",
        role: "UI/Concept Designer",
        tech: ["Digital Drawing", "Concept Art", "Prototyping"],
        description: "다양한 게임 및 콘텐츠를 위한 UI 기반 컨셉 드로잉입니다. 자유로운 펜 워크와 톤앤매너 적용을 통해 프로젝트의 시각적 방향성을 빠르게 구체화했습니다.",
        participation: 100,
        gradient: "bg-gradient-to-br from-neutral-800/80 via-zinc-700/60 to-stone-800/80",
        thumbnail: "/portfolio/drawing_ui03.webp",
        images: [
            "/portfolio/drawing_ui03.webp",
            "/portfolio/drawing_ui0302.webp",
            "/portfolio/drawing_ui0303.webp",
            "/portfolio/ui_02_dunfa_image.jpg"
        ],
    },

    // === 8~14. WEB ENGINEERING & PUBLISHING ===
    {
        id: "P-006-1",
        title: "Beusable Forum",
        titleKo: "뷰저블 포럼 커뮤니티 구축",
        category: "WEB",
        role: "Web Publisher",
        tech: ["Vue.js", "jQuery", "HTML/CSS", "Figma"],
        description: "뷰저블 포럼 커뮤니티 반응형 플랫폼 UI 디자인과 프론트엔드 퍼블리싱을 담당했습니다. Figma, Zeplin 기반의 기획/디자인 문서를 통해 정확하고 최적화된 마크업을 구현하였습니다.",
        participation: 100,
        gradient: "bg-gradient-to-br from-emerald-900/80 via-teal-800/60 to-cyan-900/80",
        thumbnail: "/portfolio/beusable_main.webp",
        images: [
            "/portfolio/beusable_main.webp",
            "/portfolio/beusable_sub.webp"
        ],
    },
    {
        id: "P-006-2",
        title: "Big Data Wave",
        titleKo: "빅데이터웨이브 플랫폼 구축",
        category: "WEB",
        role: "Web Publisher",
        tech: ["JavaScript", "jQuery", "HTML/CSS", "Photoshop"],
        description: "빅데이터웨이브 반응형 플랫폼 UI 디자인과 프론트엔드 퍼블리싱을 수행했습니다. 시각적 가독성과 사용성을 고려한 최적화된 마크업을 구현하였습니다.",
        participation: 100,
        gradient: "bg-gradient-to-br from-cyan-900/80 via-blue-800/60 to-indigo-900/80",
        thumbnail: "/portfolio/bigdata_main.webp",
        images: [
            "/portfolio/bigdata_main.webp",
            "/portfolio/bigdata_sub.webp"
        ],
    },
    {
        id: "P-007-1",
        title: "Shingu University",
        titleKo: "신구대학교 반응형 웹 리뉴얼",
        category: "WEB",
        role: "Frontend Publisher",
        tech: ["JavaScript", "jQuery", "HTML/CSS", "Web Accessibility"],
        description: "신구대학교 홈페이지 반응형 웹 리뉴얼을 진행했습니다. 엔터프라이즈 CMS 구조 내 마크업 구축 및 시각·구조적 최적화를 통해 '웹 접근성 인증 마크'를 획득했습니다.",
        participation: 60,
        gradient: "bg-gradient-to-br from-blue-900/80 via-indigo-800/60 to-slate-900/80",
        thumbnail: "/portfolio/shingu_v1_main.webp",
        images: [
            "/portfolio/shingu_v1_main.webp",
            "/portfolio/shingu_v1_sub.webp",
            "/portfolio/univ_shingu.webp"
        ],
    },
    {
        id: "P-007-2",
        title: "Inha University",
        titleKo: "인하대학교 반응형 웹 리뉴얼",
        category: "WEB",
        role: "Frontend Publisher",
        tech: ["JavaScript", "jQuery", "HTML/CSS", "Web Accessibility"],
        description: "인하대학교 홈페이지 반응형 웹 리뉴얼 및 엔터프라이즈 CMS 고도화 환경 내 웹 접근성 최적화 마크업 업무를 수행했습니다.",
        participation: 100,
        gradient: "bg-gradient-to-br from-sky-900/80 via-blue-800/60 to-indigo-900/80",
        thumbnail: "/portfolio/inha_v2_main.webp",
        images: [
            "/portfolio/inha_v2_main.webp",
            "/portfolio/inha_v2_sub.webp",
            "/portfolio/univ_inha.webp"
        ],
    },
    {
        id: "P-007-3",
        title: "Sejong Cyber University",
        titleKo: "세종사이버대학교 반응형 웹 리뉴얼",
        category: "WEB",
        role: "Frontend Publisher",
        tech: ["JavaScript", "jQuery", "HTML/CSS", "Web Accessibility"],
        description: "세종사이버대학교 주요 홈페이지 반응형 웹 리뉴얼 및 시각/구조적 최적화를 구축하여 안정적인 UX 설계 및 웹 접근성을 준수했습니다.",
        participation: 40,
        gradient: "bg-gradient-to-br from-indigo-900/80 via-purple-800/60 to-fuchsia-900/80",
        thumbnail: "/portfolio/sejong_main.webp",
        images: [
            "/portfolio/sejong_main.webp",
            "/portfolio/sejong_sub.webp",
            "/portfolio/univ_sejong.webp"
        ],
    },
    {
        id: "P-007-4",
        title: "Chung-Ang University",
        titleKo: "중앙대학교 반응형 웹 리뉴얼",
        category: "WEB",
        role: "Frontend Publisher",
        tech: ["JavaScript", "jQuery", "HTML/CSS", "Web Accessibility"],
        description: "중앙대학교 통합 웹 리뉴얼 및 다변화된 디바이스 환경에서의 반응형 웹 접근성을 고도화하여 사용자 경험을 대폭 개선했습니다.",
        participation: 20,
        gradient: "bg-gradient-to-br from-slate-900/80 via-gray-800/60 to-zinc-900/80",
        thumbnail: "/portfolio/cau_main.webp",
        images: [
            "/portfolio/cau_main.webp",
            "/portfolio/cau_sub.webp",
            "/portfolio/univ_cau.webp"
        ],
    },
    {
        id: "P-007-7",
        title: "Tomato Class E-Learning Promotions",
        titleKo: "토마토클래스 영어 교육 브랜드 프로모션 디자인 및 마크업",
        category: "WEB",
        role: "UI/UX Designer & Publisher",
        tech: ["E-Learning UI", "Landing Page", "HTML/CSS", "Photoshop"],
        description: "대학생 및 성인을 타겟으로 하는 영어 교육 브랜드 '토마토클래스'의 대규모 이벤트 프로모션 및 랜딩페이지 디자인 세트를 제작하고 웹 표준 마크업을 전담 구현했습니다. 오픽, 토익, 영어 생기초 인강 등 각 교육 상품의 특징과 브랜드 컬러를 극대화한 독창적인 레이아웃을 제공하여 가입 전환율(CTR) 향상에 기여했습니다.",
        participation: 100,
        gradient: "bg-gradient-to-br from-red-950/80 via-orange-900/60 to-red-900/80",
        thumbnail: "/portfolio/tomato_main.jpg",
        images: [
            "/portfolio/tomato_main.jpg",
            "/portfolio/tomato_chance.jpg",
            "/portfolio/tomato_basic.jpg",
            "/portfolio/tomato_opic.jpg",
            "/portfolio/tomato_toeic.jpg"
        ],
    },
    {
        id: "P-007-8",
        title: "Korea Coffee Association Web Portal",
        titleKo: "사단법인 한국커피협회 공식 웹 포털 리뉴얼",
        category: "WEB",
        role: "Frontend Publisher",
        tech: ["JavaScript", "jQuery", "HTML/CSS", "Cross-Browsing"],
        description: "사단법인 한국커피협회 공식 홈페이지의 사용자 경험 개선을 위해 반응형 웹 리뉴얼 퍼블리싱을 전담 구축했습니다. 바리스타 자격증 접수 및 수험생 편의를 고려한 그리드 정렬 및 안정적인 접근성을 위해 표준 마크업을 준수했습니다.",
        participation: 100,
        gradient: "bg-gradient-to-br from-amber-950/80 via-yellow-950/60 to-yellow-900/80",
        thumbnail: "/portfolio/coffee_main.jpg",
        images: [
            "/portfolio/coffee_main.jpg",
            "/portfolio/coffee_sub.jpg"
        ],
    },
    {
        id: "P-010",
        title: "Web Banners & Promotions",
        titleKo: "웹 배너 디자인 모음",
        category: "WEB",
        role: "Web Designer",
        tech: ["Photoshop", "Illustrator", "Event Graphics"],
        description: "다양한 웹 프로모션 및 이벤트용 배너 디자인 세트입니다. 시선의 흐름과 전환율(CTR)을 고려한 레이아웃과 눈에 띄는 아트워크 요소를 배치했습니다.",
        participation: 100,
        gradient: "bg-gradient-to-br from-teal-900/80 via-emerald-800/60 to-green-900/80",
        thumbnail: "/portfolio/banner_web99banner01.webp",
        images: [
            "/portfolio/banner_web99banner01.webp",
            "/portfolio/banner_web99banner03.webp",
            "/portfolio/banner_web99banner04.webp",
            "/portfolio/banner_web99banner05.webp"
        ],
    },
    {
        id: "P-011",
        title: "AIIA Pre-registration Site",
        titleKo: "모바일 게임 AIIA (아이아) 사전예약 프로모션 구축",
        category: "WEB",
        role: "UI/UX Designer & Publisher",
        tech: ["JavaScript", "HTML/CSS", "Mobile Responsive", "Promotional UI"],
        description: "마상소프트의 모바일 액션 RPG 게임 AIIA(아이아)의 런칭 사전예약 사이트와 초청장 이벤트를 디자인 및 퍼블리싱(100%) 하였습니다. 각 캐릭터별 비주얼 톤앤매너에 맞춤형 레이아웃 구성 및 이벤트 초대장 발송 링크 생성 등의 프론트엔드 연동을 구현했습니다.",
        participation: 100,
        gradient: "bg-gradient-to-br from-red-950/80 via-rose-900/60 to-red-900/80",
        thumbnail: "/portfolio/aiia_desktop.jpg",
        images: [
            "/portfolio/aiia_desktop.jpg",
            "/portfolio/aiia_mobile.jpg"
        ],
    },
    {
        id: "P-012",
        title: "DK Online Event & Site Ops",
        titleKo: "DK 온라인 웹사이트 리뉴얼 및 이벤트 프로모션 디자인",
        category: "WEB",
        role: "UI/UX Designer & Publisher",
        tech: ["JavaScript", "jQuery", "HTML/CSS", "Event Promotion UI", "Graphic Design"],
        description: "마상소프트의 MMORPG 게임 'DK온라인' 공식 홈페이지 리뉴얼 및 정기 이벤트 프로모션 웹페이지를 디자인/퍼블리싱(100%) 하였습니다. 크리스마스, 봄 나무 사랑 이벤트, 신규/복귀 유저 지원 등 계절별·업데이트별 테마 페이지를 맞춤형 비주얼 아트로 전담 구축했습니다.",
        participation: 100,
        gradient: "bg-gradient-to-br from-amber-950/80 via-yellow-900/60 to-amber-900/80",
        thumbnail: "/portfolio/dk_online_thumbnail.png",
        images: [
            "/portfolio/dk_online_thumbnail.png",
            "/portfolio/dk_website_main.jpg",
            "/portfolio/dk_website_sub.jpg",
            "/portfolio/dk_event_summer.jpg",
            "/portfolio/dk_event_attendance.jpg",
            "/portfolio/dk_event_hyperserver.png",
            "/portfolio/dk_event_may.jpg"
        ],
    },
    {
        id: "P-013",
        title: "Halo Games Mobile Promotions",
        titleKo: "할로게임즈 모바일 게임 프로모션 및 이벤트 페이지 구축",
        category: "WEB",
        role: "UI/UX Designer & Publisher",
        tech: ["Game UI Design", "Event Promotion Design", "HTML/CSS", "jQuery"],
        description: "할로게임즈의 신작 모바일 게임 '동화전쟁' 및 '몬스터클리어' 사전 예약 런칭 이벤트 페이지를 구축했습니다. 게임 특유의 그래픽 리소스와 세계관 톤앤매너를 연동하여 모바일 및 웹 사용성을 대폭 강화하고 생동감 있는 그래픽을 최적화했습니다.",
        participation: 100,
        gradient: "bg-gradient-to-br from-indigo-950/80 via-fuchsia-900/60 to-purple-900/80",
        thumbnail: "/portfolio/halo_fairytales.jpg",
        images: [
            "/portfolio/halo_fairytales.jpg",
            "/portfolio/halo_monsterclear.jpg"
        ],
    },
];

export class StaticProjectRepository implements IProjectRepository {
    async getAllProjects(): Promise<PortfolioProject[]> {
        return PROJECTS;
    }
}
