import { Module } from '@nestjs/common';
import { TopModule } from './modules/top/top.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig, joiConfig } from './common/config';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    TopModule,
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: joiConfig,
    }),
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
