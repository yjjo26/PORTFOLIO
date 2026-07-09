import { FilterCategory, PortfolioProject, ProjectDomainService } from "../../domain/models/project";
import { IProjectRepository } from "../../domain/repositories/project-repo";

export class GetProjectsUseCase {
    private projectRepository: IProjectRepository;

    constructor(projectRepository: IProjectRepository) {
        this.projectRepository = projectRepository;
    }

    async execute(filter: FilterCategory = "ALL"): Promise<PortfolioProject[]> {
        const allProjects = await this.projectRepository.getAllProjects();
        return ProjectDomainService.filterProjects(allProjects, filter);
    }
}
