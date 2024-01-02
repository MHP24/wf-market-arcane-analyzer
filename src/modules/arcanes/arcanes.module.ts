import { Module } from '@nestjs/common';
import { ArcanesService } from './arcanes.service';
import { ArcanesController } from './arcanes.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AdaptersModule } from '../../common/adapters';
import { OrdersModule } from '../orders/orders.module';
import { PrismaModule } from 'src/providers/prisma/prisma.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    AdaptersModule,
    OrdersModule,
    PrismaModule,
  ],
  controllers: [ArcanesController],
  providers: [ArcanesService],
  exports: [ArcanesService],
})
export class ArcanesModule {}
