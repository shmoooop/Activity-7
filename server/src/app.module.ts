import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'taskmanagement.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // For development only
    }),
    ProjectsModule,
    UsersModule,
    TasksModule,
  ],
})
export class AppModule {}
