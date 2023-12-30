import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TopModule } from './modules/top/top.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig, joiConfig } from './common/config';

@Module({
  imports: [
    TopModule,
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: joiConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
