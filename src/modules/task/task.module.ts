import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { ArcanesModule } from '../arcanes/arcanes.module';

@Module({
  imports: [ArcanesModule],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
