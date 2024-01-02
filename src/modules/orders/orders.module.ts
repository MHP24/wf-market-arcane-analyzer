import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@nestjs/config';
import { AdaptersModule } from 'src/common/adapters';
import { PrismaModule } from 'src/providers/prisma/prisma.module';

@Module({
  providers: [OrdersService],
  imports: [ConfigModule, AdaptersModule, PrismaModule],
  exports: [OrdersService],
})
export class OrdersModule {}
