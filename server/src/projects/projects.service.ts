import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  // Create a new project
  async create(projectData: Partial<Project>): Promise<Project> {
    const project = this.projectsRepository.create(projectData);
    return await this.projectsRepository.save(project);
  }

  // Get all projects
  async findAll(): Promise<Project[]> {
    return await this.projectsRepository.find({
      relations: ['tasks'],
    });
  }

  // Get one project by id
  async findOne(id: number): Promise<Project> {
    return await this.projectsRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  // Update a project
  async update(id: number, projectData: Partial<Project>): Promise<Project> {
    await this.projectsRepository.update(id, projectData);
    return await this.findOne(id);
  }

  // Delete a project
  async remove(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}
