import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Project } from '../projects/project.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Create a new task
  async create(taskData: Partial<Task>): Promise<Task> {
    // Verify project and user exist
    const project = await this.projectsRepository.findOne({
      where: { id: taskData.projectId },
    });
    const user = await this.usersRepository.findOne({
      where: { id: taskData.userId },
    });

    if (!project || !user) {
      throw new Error('Project or User not found');
    }

    const task = this.tasksRepository.create(taskData);
    return await this.tasksRepository.save(task);
  }

  // Get all tasks
  async findAll(): Promise<Task[]> {
    return await this.tasksRepository.find({
      relations: ['project', 'user'],
    });
  }

  // Get tasks by project
  async findByProject(projectId: number): Promise<Task[]> {
    return await this.tasksRepository.find({
      where: { projectId },
      relations: ['project', 'user'],
    });
  }

  // Get one task by id
  async findOne(id: number): Promise<Task> {
    return await this.tasksRepository.findOne({
      where: { id },
      relations: ['project', 'user'],
    });
  }

  // Update a task
  async update(id: number, taskData: Partial<Task>): Promise<Task> {
    await this.tasksRepository.update(id, taskData);
    return await this.findOne(id);
  }

  // Delete a task
  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
