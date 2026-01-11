import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  async create(@Body() taskData: Partial<Task>): Promise<Task> {
    return await this.tasksService.create(taskData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks or tasks by project' })
  @ApiQuery({ name: 'projectId', required: false, type: Number })
  async findAll(@Query('projectId') projectId?: number): Promise<Task[]> {
    if (projectId) {
      return await this.tasksService.findByProject(projectId);
    }
    return await this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return await this.tasksService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() taskData: Partial<Task>,
  ): Promise<Task> {
    return await this.tasksService.update(id, taskData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.tasksService.remove(id);
  }
}
