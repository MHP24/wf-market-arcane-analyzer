import { Module } from '@nestjs/common';
import { TopService } from './top.service';
import { TopController } from './top.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AdaptersModule } from '../../common/adapters';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [HttpModule, ConfigModule, AdaptersModule, OrdersModule],
  controllers: [TopController],
  providers: [TopService],
})
export class TopModule {}
