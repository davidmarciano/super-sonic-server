import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecommendedAppsModule } from '../recommended-apps/recommended-apps.module';

@Module({
  imports: [RecommendedAppsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
