import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@nestjs/config';
import { AdaptersModule } from 'src/common/adapters';

@Module({
  providers: [OrdersService],
  imports: [ConfigModule, AdaptersModule],
  exports: [OrdersService],
})
export class OrdersModule {}
