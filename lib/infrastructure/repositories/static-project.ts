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
        tech: ["React 18", "TypeScript", "Vite", "BYO LLM (Gemini·Claude·GPT·Ollama)", "JSON Schema 강제 출력", "XML DSL 런타임", "Monte-Carlo 1만회 시뮬레이션", "Sandboxed iframe", "Cloudflare Pages"],
        description: "기획서를 넣으면 눌러볼 수 있는 프로토타입이 나오고, 기획서에 적힌 숫자가 진짜 그렇게 되는지 1만 번 돌려 대조합니다. 틀리면 \'기획서와 다른 곳이 1건 있습니다\'라고 말해주고, 그 자리에서 고쳐 다시 잴 수 있습니다.\n\n모델은 사용자 것을 씁니다 — API 키든 본인 PC 의 로컬 모델이든. 키는 브라우저 밖으로 나가지 않습니다.",
        participation: 100,
        gradient: "bg-gradient-to-br from-fuchsia-900/80 via-violet-800/60 to-indigo-900/80",
        thumbnail: "/portfolio/protopang_00_thumb.png",
        images: [
            "/portfolio/protopang_slider.gif",
            "/portfolio/protopang_02_match3.png",
            "/portfolio/protopang_01_landing.png",
            "/portfolio/protopang_03_assembly.png",
            "/portfolio/protopang_04_verify.png",
            "/portfolio/protopang_05_handoff.png"
        ],
        stats: [
            { value: "204", label: "회귀 테스트" },
            { value: "59/59", label: "라이브 전수 QA" },
            { value: "1만 회", label: "판당 시뮬레이션" },
            { value: "0초", label: "수치 수정 반영 시간" },
        ],
        links: [
            { label: "라이브 데모 열기", url: "https://protopang.pages.dev", primary: true },
            { label: "매치3 프로토타입 바로 보기", url: "https://protopang.pages.dev/#/build" },
        ],
        highlights: [
            {
                label: "핵심 한 줄",
                body: "AI 가 만든 게 아니라, AI 가 틀릴 수 없게 만든 구조입니다.\n\n모델은 값만 채우고 문법·실행 코드는 전부 제가 쓴 고정 런타임입니다. 그래서 문법 오류로 죽거나 무한 루프에 빠지는 일이 구조적으로 불가능합니다.",
            },
            {
                label: "실제로 잡아낸 것",
                body: "\'30일 안에 20레벨\' → 돌려보니 57일.\n\'25수 안에 별 3개(5,000점)\' → 실측 1,700점.\n\n기획서가 틀렸다고 말해주는 도구입니다. 화면에서 숫자 하나 고치면 0초에 다시 재서 ✅ 로 바뀝니다.",
            },
            {
                label: "만들다 배운 것",
                body: "생성이 909초까지 늘어진 원인은 호출 수가 아니라 같은 기획서를 매번 통째로 다시 읽힌 것 — 단계별로 줄여 400초.\n\n\'눌러도 반응 없음\'의 범인은 앱이 아니라 리렌더에 끊긴 내 테스트 코드였습니다. 실패가 나면 어느 쪽 탓인지 먼저 증명하고 고칩니다.",
            },
            {
                label: "품질",
                body: "회귀 테스트 204개. 배포본을 브라우저 자동화로 직접 눌러본 전수 검사 59건 전부 통과. QA 중 `</script>` 샌드박스 탈출을 직접 실증해 차단했습니다.",
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
        thumbnail: "/portfolio/jubup_main_stitched.png",
        images: [
            "/portfolio/jubup_main_stitched.png",
            "/portfolio/jubup_characters.png",
            "/portfolio/jubup_workflow.webp",
            "/portfolio/jubup_db.webp",
            "/portfolio/jubup_docker.png"
        ],
    },
    {
        id: "P-002",
        title: "Anti-Gravity Framework",
        titleKo: "안티그래비티 프레임워크 (AI 자율화 시스템)",
        category: "AI",
        role: "AI Product Engineer",
        tech: ["Parallel Agent Architecture", "Prompt Engineering", "Workflow Automation"],
        description: "메인(종합 지시/리뷰) ➔ 서브1(지식 조달) ➔ 서브2(기획) ➔ 서브3(빌드)로 이어지는 4단계 병렬 에이전트 아키텍처를 설계하여 무한 루프 자동화 시스템을 구현했습니다. 고도화된 프롬프트 엔지니어링을 적용하여 AI 기반 코드 빌드 워크플로우를 자율화하고 프로덕트 개발 속도를 극대화했습니다.",
        participation: 100,
        gradient: "bg-gradient-to-br from-violet-900/80 via-purple-800/60 to-blue-900/80",
        thumbnail: "/portfolio/antigravity_framework.jpg",
        images: ["/portfolio/antigravity_framework.jpg"],
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
