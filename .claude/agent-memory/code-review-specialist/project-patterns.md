---
name: 프로젝트 코딩 패턴 및 구조
description: Next.js 스타터킷의 디렉토리 구조, 컴포넌트 패턴, TypeScript 규칙 기록
type: project
---

## 프로젝트 개요
- **프로젝트명**: claude-nextjs-starters
- **스택**: Next.js 16.2.4, React 19.2.4, TypeScript 5, Tailwind CSS v4
- **UI 라이브러리**: ShadcnUI v4, Radix UI, Lucide React
- **추가 도구**: next-themes, react-hook-form, zod, usehooks-ts

## 디렉토리 구조
```
app/
├── (auth)/ - 인증 관련 페이지 (로그인)
├── (marketing)/ - 마케팅 페이지 (홈)
├── (dashboard)/ - 대시보드 페이지 (보호된 영역)
├── layout.tsx - Root 레이아웃
├── not-found.tsx - 404 페이지
└── globals.css - 전역 스타일

components/
├── layout/ - 레이아웃 컴포넌트 (navbar, sidebar, footer, etc)
├── sections/ - 페이지 섹션 컴포넌트 (hero, features)
├── ui/ - shadcn UI 컴포넌트
└── providers/ - 컨텍스트 프로바이더

lib/
├── constants.ts - 상수 및 설정
├── types.ts - TypeScript 타입 정의
└── utils.ts - 유틸리티 함수 (cn 함수)

hooks/
└── use-mobile.ts - 반응형 체크 커스텀 훅

public/ - 정적 에셋
```

## 컴포넌트 패턴

### 레이아웃 컴포넌트
- **클라이언트 컴포넌트** (`'use client'` 사용)
- `usePathname()` 활용한 활성 링크 감지
- `useBoolean()` 훅으로 토글 상태 관리
- 반응형 디자인 (md: 중단점 활용)

### 페이지 컴포넌트
- **서버 컴포넌트** (기본값)
- `Metadata` export로 SEO 설정
- 상수 데이터 직접 포함 (USERS, MONTHLY_DATA 등)
- 로컬 스타일링 (Tailwind 클래스)

### UI 컴포넌트
- **radix-ui 래퍼** 컴포넌트
- `data-slot` 속성으로 내부 구조 관리
- `cn()` 함수로 클래스 병합
- CVA (class-variance-authority) 활용

## TypeScript 규칙
- React.ReactNode, React.ComponentProps 활용
- 명시적 타입 정의 (interface, type)
- 옵셔널 프로퍼티는 `?` 사용
- as const로 상수 배열 정의

## Tailwind CSS 패턴
- 2칸 간격 클래스 활용 (px-4, py-6, gap-6 등)
- 반응형: sm:, md:, lg: 프리픽스
- 색상: text-foreground, bg-muted, border-border 등 CSS 변수 사용
- 크기: size-4, h-16, w-64 등

## 상수 관리
- NAV_ITEMS, SIDEBAR_ITEMS, FEATURES, DASHBOARD_STATS 등을 constants.ts에 정의
- 타입: NavItem, SidebarItem, FeatureItem, StatsCardItem
- SITE_CONFIG로 설정 중앙화

## 상태 관리
- usehooks-ts의 useBoolean() 사용
- next-themes의 useTheme() 사용
- useState() 활용한 로컬 상태
- 마운트 체크 (mounted 상태)

## 주요 발견사항
- 로컬 데이터 포함 (USERS, MONTHLY_DATA, NOTIFICATIONS 등)
- 폼 처리 없음 (HTML form 태그만 존재, 실제 처리 로직 없음)
- 인증 없음 (보호된 라우트 미구현)
- API 없음 (모두 프론트엔드)
