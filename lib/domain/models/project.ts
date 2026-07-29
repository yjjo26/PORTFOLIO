export type ProjectCategory = "WEB" | "GAME" | "AI";

/** 상세에서 바로 열 수 있는 링크 (라이브 데모 등) */
export interface ProjectLink {
    label: string;
    url: string;
    /** 강조 버튼으로 띄울지 */
    primary?: boolean;
}

/** 상세에서 소제목 + 본문으로 보여줄 정리 내용 */
export interface ProjectHighlight {
    label: string;
    body: string;
}

export interface PortfolioProject {
    id: string;
    title: string;
    titleKo: string;
    category: ProjectCategory;
    role: string;
    tech: string[];
    description: string;
    participation: number;
    gradient: string;
    thumbnail?: string;
    images: string[];
    /** 있으면 상세 상단에 바로가기 버튼이 뜬다 */
    links?: ProjectLink[];
    /** 있으면 설명 아래에 소제목별로 정리되어 나온다 */
    highlights?: ProjectHighlight[];
}

export type FilterCategory = "ALL" | ProjectCategory;

export class ProjectDomainService {
    /**
     * Pure business logic: Filters projects based on category selection.
     */
    static filterProjects(projects: PortfolioProject[], filter: FilterCategory): PortfolioProject[] {
        if (filter === "ALL") return projects;
        return projects.filter(p => p.category === filter);
    }
}
