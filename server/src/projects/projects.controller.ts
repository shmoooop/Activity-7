import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  async create(@Body() projectData: Partial<Project>): Promise<Project> {
    return await this.projectsService.create(projectData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  async findAll(): Promise<Project[]> {
    return await this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by id' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return await this.projectsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a project' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() projectData: Partial<Project>,
  ): Promise<Project> {
    return await this.projectsService.update(id, projectData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.projectsService.remove(id);
  }
}
