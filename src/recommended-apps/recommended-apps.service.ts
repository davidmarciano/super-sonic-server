import { Injectable } from '@nestjs/common';
import numeral from 'numeral';
import type { FindQuery, FindResponse, RecommendedApp, FilterKeys } from './recommended-apps.types';
import RecommendedAppsData from '../../data/apps.json';
import Categories from '../../data/categories.json';

type RuleFunction = (arg1: string | number, arg2: string | number) => boolean;

const filterRules: Record<string, RuleFunction> = {
  name: (appValue: string, queryValue: string) => appValue.toLowerCase().includes(queryValue.toLowerCase()),
  category: (appValue: string, queryValue: string) => appValue.toLowerCase() === queryValue.toLowerCase(),
  min_age: (appValue: number, queryValue: string) => appValue >= Number(queryValue),
  rating: (appValue: number, queryValue: string) => appValue >= Number(queryValue),
};

@Injectable()
export class RecommendedAppsService {
  async find(query: FindQuery): Promise<FindResponse> {
    const { count = 20, offset = 0, ...queryFilters } = query;

    const normalized = RecommendedAppsData.map(({ id, icon, name, category, rating, min_age, url }) => 
      ({ id, icon, name, category, rating, min_age, url }));

    const filtered = normalized.filter((app) => {
      const queryFiltersEntries = Object.entries(queryFilters) as [FilterKeys, string | number][];
      const filtersValidation = queryFiltersEntries.map(([queryKey, queryValue]) => {
        return filterRules[queryKey](app[queryKey], queryValue);
      });

      return filtersValidation.every((isValid) => isValid);
    });

    const from = Number(offset) * Number(count);
    const to = from + Number(count);

    const partial = filtered.slice(from, to);
    
    return {
      apps: partial,
      totalCount: filtered.length
    }
  }

  async findOne(id: string): Promise<RecommendedApp | undefined> {
    const selected = RecommendedAppsData.find(({ id: appId }) => appId === Number(id));
    const formatted = selected && {...selected, install_count: numeral(selected.install_count).format('0a')}

    return formatted;
  }

  async findCategories(): Promise<string[]> {
    return Categories;
  }
}
