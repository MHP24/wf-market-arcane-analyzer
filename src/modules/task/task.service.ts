import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ArcanesService } from '../arcanes/arcanes.service';

@Injectable()
export class TaskService {
  logger = new Logger('TaskService');

  constructor(private readonly arcanesService: ArcanesService) {}

  @Cron('*/7 * * * *')
  async updateArcanesData() {
    try {
      await this.arcanesService.getAll();
      this.logger.log('updateArcanesData completed successfully');
    } catch (error) {
      this.logger.log(`updateArcanesData failed: ${error}`);
    }
  }
}
