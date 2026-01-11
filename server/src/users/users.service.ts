import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Create a new user
  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return await this.usersRepository.save(user);
  }

  // Get all users
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ['tasks'],
    });
  }

  // Get one user by id
  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  // Update a user
  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, userData);
    return await this.findOne(id);
  }

  // Delete a user
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
