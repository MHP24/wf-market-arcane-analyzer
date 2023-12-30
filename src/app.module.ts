import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TopModule } from './modules/top/top.module';

@Module({
  imports: [TopModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
