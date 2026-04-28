// 블로그 전역 상수 정의
import type { NavItem } from './types';

// 사이트 기본 설정
export const SITE_CONFIG = {
  name: '개발 블로그',
  description: 'Notion CMS 기반의 개인 기술 블로그',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://your-domain.com',
  ogImage: '/og.png',
  author: 'Twiorigin',
  locale: 'ko_KR',
  twitterHandle: '@twiorigin',
} as const;

// 헤더 네비게이션 아이템
export const NAV_ITEMS: NavItem[] = [
  {
    title: '블로그',
    href: '/',
  },
  {
    title: 'About',
    href: '/about',
  },
];

// 블로그 카테고리 목록 (Notion 데이터베이스의 Category 필드값과 일치)
export const BLOG_CATEGORIES = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Database',
  'DevOps',
  'Architecture',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

// 페이지네이션 설정
export const PAGINATION = {
  // 페이지당 글 수
  perPage: 10,
} as const;

// Notion 상태값 (데이터베이스 Status 필드와 일치)
export const NOTION_STATUS = {
  published: '발행됨',
  draft: '초안',
} as const;

// 소셜 링크
export const SOCIAL_LINKS = {
  github: 'https://github.com/twiorigin',
  email: 'mailto:neooriginy@gmail.com',
} as const;

// 다크모드 로컬스토리지 키 (next-themes 기본값 호환)
export const THEME_STORAGE_KEY = 'theme' as const;
