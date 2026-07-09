export type ProjectCategory = "WEB" | "GAME" | "AI";

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
