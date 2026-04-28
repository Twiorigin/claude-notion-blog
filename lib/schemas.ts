// 블로그 관련 Zod 검증 스키마
import { z } from 'zod';

// 블로그 검색 쿼리 스키마
export const searchSchema = z.object({
  query: z.string().max(100, '검색어는 100자 이하여야 합니다').optional(),
  category: z.string().optional(),
  page: z.number().int().positive().optional(),
});

export type SearchFormData = z.infer<typeof searchSchema>;

// 환경 변수 스키마 (서버 사이드 전용)
export const envSchema = z.object({
  NOTION_API_KEY: z.string().min(1, 'NOTION_API_KEY가 설정되지 않았습니다'),
  NOTION_DATABASE_ID: z.string().min(1, 'NOTION_DATABASE_ID가 설정되지 않았습니다'),
});
