import { Controller, Get } from '@nestjs/common';
import { ArcanesService } from './arcanes.service';

@Controller('arcanes')
export class ArcanesController {
  constructor(private readonly arcanesService: ArcanesService) {}

  @Get()
  async findAll() {
    // return await this.arcanesService.getAll();
    return true;
  }
}
