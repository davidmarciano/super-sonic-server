import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecommendedAppsService } from './recommended-apps.service';
import type { FindQuery, FindResponse, RecommendedApp } from './recommended-apps.types';

@Controller('recommended-apps')
export class RecommendedAppsController {
  constructor(private readonly recommendedAppsService: RecommendedAppsService) {}

  @Get()
  async find(@Query() query: FindQuery): Promise<FindResponse> {
    return this.recommendedAppsService.find(query);
  }

  @Get('/app-id/:id')
  async findOne(@Param('id') id: string): Promise<RecommendedApp | undefined> {
    return this.recommendedAppsService.findOne(id);
  }

  @Get('/categories')
  async findCategories(): Promise<string[]> {
    return this.recommendedAppsService.findCategories();
  }
}
