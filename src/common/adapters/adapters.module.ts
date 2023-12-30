import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpAdapter } from './http.adapter';

@Module({
  imports: [HttpModule],
  providers: [HttpAdapter],
  exports: [HttpAdapter],
})
export class AdaptersModule {}
