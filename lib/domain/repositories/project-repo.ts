import { PortfolioProject } from "../models/project";

export interface IProjectRepository {
    getAllProjects(): Promise<PortfolioProject[]>;
}
