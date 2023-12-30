import { Injectable } from '@nestjs/common';

@Injectable()
export class TopService {
  async findAll() {
    return `This action returns all top`;
  }
}
