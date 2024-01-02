import { Module } from '@nestjs/common';
import { ArcanesModule } from './modules/arcanes/arcanes.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig, joiConfig } from './common/config';
import { OrdersModule } from './modules/orders/orders.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ArcanesModule,
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: joiConfig,
    }),
    OrdersModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
