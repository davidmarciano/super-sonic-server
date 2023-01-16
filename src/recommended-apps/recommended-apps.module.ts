import { Module } from '@nestjs/common';
import { RecommendedAppsController } from './recommended-apps.controller';
import { RecommendedAppsService } from './recommended-apps.service';

@Module({
  controllers: [RecommendedAppsController],
  providers: [RecommendedAppsService],
})
export class RecommendedAppsModule {}
