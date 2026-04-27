import {
  BarChart3,
  Home,
  Settings,
  Users,
  Zap,
  Shield,
  Rocket,
  Heart,
  Package,
  Moon,
} from 'lucide-react';
import type { NavItem, SidebarItem, FeatureItem, StatsCardItem } from './types';

export const SITE_CONFIG = {
  name: 'StarterKit',
  description: 'Next.js 16 + React 19 + TypeScript + Tailwind CSS + ShadcnUI 스타터킷',
  url: 'https://your-domain.com',
  ogImage: '/og.png',
  author: 'Your Name',
} as const;

export const NAV_ITEMS: NavItem[] = [
  {
    title: '홈',
    href: '/',
  },
  {
    title: '대시보드',
    href: '/dashboard',
  },
];

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: '대시보드',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: '통계',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    title: '사용자',
    href: '/dashboard/users',
    icon: Users,
  },
  {
    title: '설정',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export const FEATURES: FeatureItem[] = [
  {
    title: 'Next.js 16',
    description: '최신 App Router와 React Server Components를 활용한 빠른 개발',
    icon: Rocket,
  },
  {
    title: 'React 19',
    description: '최신 React 기능과 최적화된 성능',
    icon: Zap,
  },
  {
    title: 'TypeScript',
    description: '타입 안전성으로 버그를 미리 방지',
    icon: Shield,
  },
  {
    title: 'Tailwind CSS v4',
    description: 'CSS-first 설정으로 더욱 효율적인 스타일링',
    icon: Heart,
  },
  {
    title: 'ShadcnUI v4',
    description: 'Radix Nova 스타일의 아름다운 UI 컴포넌트',
    icon: Package,
  },
  {
    title: '다크모드 지원',
    description: 'next-themes로 간편한 라이트/다크 모드 전환',
    icon: Moon,
  },
];

export const DASHBOARD_STATS: StatsCardItem[] = [
  {
    title: '총 사용자',
    value: '12,543',
    description: '지난 달 대비',
    icon: Users,
    trend: 'up',
    trendValue: '+12%',
  },
  {
    title: '매출',
    value: '$45,231',
    description: '지난 달 대비',
    icon: BarChart3,
    trend: 'up',
    trendValue: '+8%',
  },
  {
    title: '활성 세션',
    value: '3,421',
    description: '현재 온라인',
    icon: Home,
    trend: 'neutral',
  },
  {
    title: '전환율',
    value: '3.84%',
    description: '지난 달 대비',
    icon: Zap,
    trend: 'down',
    trendValue: '-2%',
  },
];

export const FOOTER_LINKS = {
  제품: [
    { title: '기능', href: '/#features' },
    { title: '가격', href: '/#pricing' },
    { title: '문서', href: 'https://docs.example.com' },
  ],
  회사: [
    { title: '블로그', href: '/blog' },
    { title: '채용', href: '/careers' },
    { title: '문의', href: '/contact' },
  ],
  법률: [
    { title: '개인정보', href: '/privacy' },
    { title: '이용약관', href: '/terms' },
    { title: '쿠키', href: '/cookies' },
  ],
  소셜: [
    { title: 'GitHub', href: 'https://github.com' },
    { title: 'Email', href: 'mailto:hello@example.com' },
    { title: 'LinkedIn', href: 'https://linkedin.com' },
  ],
} as const;

export const THEME_STORAGE_KEY = 'theme' as const;
