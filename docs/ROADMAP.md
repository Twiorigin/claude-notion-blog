# 개인 개발 블로그 ROADMAP

> Notion CMS 기반 개인 기술 블로그 개발 로드맵
> PRD 문서 기반 작성 | 총 예상 기간: 11-16일

---

## 현재 상태 (AS-IS)

| 항목 | 상태 | 비고 |
|------|------|------|
| Next.js 프로젝트 | ✅ 완료 | App Router 기반 |
| Notion API 클라이언트 | ✅ 완료 | `lib/notion.ts` |
| `(blog)` 라우트 그룹 | ✅ 완료 | 기본 골격 생성 |
| `blog-header`, `blog-footer` | ✅ 완료 | 컴포넌트 생성됨 |
| 공통 타입 / 스키마 | ✅ 완료 | `lib/types.ts`, `lib/schemas.ts` |
| 환경 변수 설정 | ⚠️ 미완 | `.env.local` 설정 필요 |
| 실제 Notion API 연동 | ⚠️ 미완 | API 키 설정 후 검증 필요 |

---

## Phase 1: 프로젝트 초기 설정

**예상 소요 기간**: 1-2일

### 목표
견고한 개발 환경 기반 구축 및 Notion API 연동 검증

### 작업 항목

#### 1-1. 환경 변수 설정
- [ ] `.env.local` 파일 생성
  ```
  NOTION_API_KEY=secret_xxxx
  NOTION_DATABASE_ID=xxxx
  ```
- [ ] Notion 통합(Integration) 생성 및 API 키 발급
- [ ] Notion 데이터베이스에 통합 연결 (Share → Invite)

#### 1-2. Notion API 동작 검증
- [ ] `lib/notion.ts` 함수 실제 동작 확인
- [ ] 데이터베이스 쿼리 응답 구조 검증
- [ ] 에러 처리 로직 점검

#### 1-3. 프로젝트 구조 정리
- [ ] 불필요한 대시보드 코드 제거 완료 확인
- [ ] `(blog)` 라우트 그룹 구조 확정
  ```
  app/
    (blog)/
      page.tsx              # 홈 (글 목록)
      [slug]/
        page.tsx            # 글 상세
      category/
        [category]/
          page.tsx          # 카테고리별 글 목록
    about/
      page.tsx              # 소개 페이지
  ```
- [ ] `next.config.ts` 이미지 도메인 설정 (Notion 이미지 허용)

#### 1-4. 기본 레이아웃 구조 확정
- [ ] `(blog)/layout.tsx` — BlogHeader + 본문 + BlogFooter
- [ ] 전역 CSS 변수 및 폰트 설정

### 완료 기준
- [ ] `npm run dev` 실행 시 오류 없음
- [ ] Notion API 호출이 실제 데이터를 반환함
- [ ] 로컬 환경에서 블로그 라우트 접근 가능

---

## Phase 2: 공통 모듈 개발

**예상 소요 기간**: 2-3일

### 목표
모든 기능에서 재사용되는 공통 코드를 먼저 구축하여 중복 방지

### 작업 항목

#### 2-1. Notion API 공통 함수 (`lib/notion.ts`)
- [ ] `fetchPosts()` — 발행됨 상태 글 목록 조회
  - Status = "발행됨" 필터
  - Published 날짜 기준 최신순 정렬
  - 페이지네이션 파라미터 (cursor 기반)
- [ ] `fetchPostBySlug(slug)` — 슬러그로 개별 글 조회
- [ ] `fetchPostContent(pageId)` — 페이지 블록 콘텐츠 조회
- [ ] `fetchCategories()` — 카테고리 목록 조회
- [ ] `fetchPostsByCategory(category)` — 카테고리별 글 조회

#### 2-2. 공통 타입 정의 (`lib/types.ts`)
- [ ] `Post` 타입 — 글 목록 카드용
  ```typescript
  type Post = {
    id: string;
    slug: string;
    title: string;
    category: string;
    tags: string[];
    publishedAt: string;
    description: string;
    coverImage: string | null;
    status: 'draft' | 'published';
  }
  ```
- [ ] `Block` 타입 — Notion 블록 렌더링용
- [ ] `Category` 타입

#### 2-3. 공통 UI 컴포넌트
- [ ] `PostCard` 컴포넌트 (`components/blog/post-card.tsx`)
  - 썸네일, 제목, 카테고리, 발행일, 설명
- [ ] `CategoryBadge` 컴포넌트
- [ ] `TagList` 컴포넌트
- [ ] `Pagination` 컴포넌트 (10개 단위)
- [ ] `BlogHeader` 완성 — 로고, 네비게이션, 검색 아이콘
- [ ] `BlogFooter` 완성 — 소셜 링크, 저작권

#### 2-4. 유틸리티 함수
- [ ] 날짜 포맷 함수 (`lib/utils.ts` 추가)
- [ ] Notion 이미지 URL 변환 함수 (만료 처리)
- [ ] 슬러그 생성/변환 함수

### 완료 기준
- [ ] `fetchPosts()` 호출 시 글 목록 정상 반환
- [ ] `PostCard` 컴포넌트 스토리북 또는 임시 페이지에서 렌더링 확인
- [ ] 타입 에러 없이 TypeScript 컴파일 성공

---

## Phase 3: 핵심 기능 개발

**예상 소요 기간**: 3-4일

### 목표
블로그의 가장 기본이 되는 글 목록과 상세 페이지 구현

### 작업 항목

#### 3-1. 글 목록 페이지 (`app/(blog)/page.tsx`)
- [ ] 서버 컴포넌트로 구현 (SSR)
- [ ] `fetchPosts()` 호출 → 최대 10개 표시
- [ ] `PostCard` 그리드 레이아웃
- [ ] `Pagination` 연결
- [ ] 로딩 상태 (`loading.tsx`) 구현
- [ ] 에러 상태 (`error.tsx`) 구현
- [ ] 빈 상태 처리 (글 없을 때 안내 메시지)

#### 3-2. 글 상세 페이지 (`app/(blog)/[slug]/page.tsx`)
- [ ] 동적 라우트 구현
- [ ] `generateStaticParams()` — SSG 빌드 최적화
- [ ] `generateMetadata()` — SEO 메타데이터
  - og:title, og:description, og:image
- [ ] 글 헤더 (제목, 발행일, 카테고리, 태그)
- [ ] 썸네일 이미지 (next/image)
- [ ] 이전/다음 글 네비게이션

#### 3-3. Notion 블록 렌더러 (`components/blog/notion-renderer.tsx`)
- [ ] 블록 타입별 렌더링
  - `paragraph` — 일반 텍스트
  - `heading_1`, `heading_2`, `heading_3` — 헤딩
  - `bulleted_list_item`, `numbered_list_item` — 리스트
  - `code` — 코드블록 (언어별 하이라이팅)
  - `image` — 이미지
  - `quote` — 인용문
  - `divider` — 구분선
  - `callout` — 콜아웃 박스
  - `toggle` — 토글 (접기/펼치기)
- [ ] 코드 하이라이팅 라이브러리 적용 (shiki 또는 highlight.js)
- [ ] 인라인 리치 텍스트 (볼드, 이탤릭, 코드, 링크) 처리

#### 3-4. 목차 (ToC) 자동 생성
- [ ] 헤딩 블록에서 목차 데이터 추출
- [ ] `TableOfContents` 컴포넌트 (우측 사이드바)
- [ ] 현재 위치 하이라이트 (Intersection Observer)
- [ ] 모바일에서는 숨김 처리

### 완료 기준
- [ ] 글 목록 페이지에서 실제 Notion 글이 표시됨
- [ ] 글 카드 클릭 시 상세 페이지로 이동
- [ ] 상세 페이지에서 Notion 콘텐츠 정상 렌더링
- [ ] 코드블록에 문법 하이라이팅 적용
- [ ] 목차 클릭 시 해당 섹션으로 스크롤 이동

---

## Phase 4: 추가 기능 개발

**예상 소요 기간**: 2-3일

### 목표
핵심 기능 완성 후 탐색 및 검색 기능 추가

### 작업 항목

#### 4-1. 카테고리 필터링
- [ ] 카테고리 목록 사이드바 (`components/blog/category-sidebar.tsx`)
  - "모든 글" 기본 선택
  - 현재 선택 카테고리 하이라이트
- [ ] `app/(blog)/category/[category]/page.tsx` 구현
  - `fetchPostsByCategory(category)` 연결
  - 카테고리명 + 글 수 표시
- [ ] 모바일에서 카테고리 드롭다운 또는 탭 형태

#### 4-2. 검색 기능
- [ ] 검색 입력 컴포넌트 (`components/blog/search-input.tsx`)
  - 클라이언트 컴포넌트 (`'use client'`)
  - 디바운싱 적용 (300ms)
- [ ] 검색 로직 — 제목 + 설명 포함 여부 검색
- [ ] 검색 결과 개수 표시
- [ ] 검색 결과 없음 안내 메시지
- [ ] URL 쿼리 파라미터 연동 (`?q=검색어`)

#### 4-3. SEO 최적화
- [ ] 루트 `layout.tsx` 기본 메타데이터 설정
- [ ] 각 페이지 `generateMetadata()` 구현
  - 홈, 카테고리, 상세 페이지
- [ ] `app/sitemap.ts` — 사이트맵 자동 생성
- [ ] `app/robots.ts` — robots.txt 생성
- [ ] OG 이미지 설정

#### 4-4. About 페이지 (`app/about/page.tsx`)
- [ ] 자기소개 섹션
- [ ] 기술 스택 목록
- [ ] 소셜 링크 (GitHub, Twitter 등)

#### 4-5. 공유 기능
- [ ] 글 상세 페이지 공유 버튼 컴포넌트
  - Twitter/X 공유
  - LinkedIn 공유
  - URL 복사

### 완료 기준
- [ ] 카테고리 클릭 시 해당 카테고리 글만 표시
- [ ] 검색어 입력 시 실시간으로 결과 필터링
- [ ] Lighthouse SEO 점수 90 이상
- [ ] sitemap.xml 정상 생성 확인

---

## Phase 5: 최적화 및 배포

**예상 소요 기간**: 1-2일

### 목표
기능 완성 후 성능·접근성 품질 향상 및 Vercel 배포

### 작업 항목

#### 5-1. 성능 최적화
- [ ] ISR(Incremental Static Regeneration) 설정
  ```typescript
  export const revalidate = 3600; // 1시간 캐싱
  ```
- [ ] `next/image` 최적화 — Notion 이미지 도메인 허용, lazy loading
- [ ] 번들 사이즈 분석 (`@next/bundle-analyzer`)
- [ ] 동적 import (`next/dynamic`) 적용 — 무거운 컴포넌트

#### 5-2. 반응형 디자인 개선
- [ ] 모바일 (< 768px) — 스택 레이아웃, 햄버거 메뉴
- [ ] 태블릿 (768px~1024px) — 2단 유연 레이아웃
- [ ] 데스크톱 (> 1024px) — 3단 레이아웃 (사이드바/메인/ToC)
- [ ] 다크모드/라이트모드 전환 검증

#### 5-3. 접근성 개선
- [ ] ARIA 레이블 추가
- [ ] 키보드 네비게이션 가능 확인 (Tab, Enter)
- [ ] 색상 대비 WCAG 2.1 AA 준수
- [ ] 스크린리더 지원 확인

#### 5-4. Vercel 배포
- [ ] Vercel 프로젝트 연결 (GitHub 저장소)
- [ ] 환경 변수 설정 (Vercel Dashboard)
  - `NOTION_API_KEY`
  - `NOTION_DATABASE_ID`
- [ ] 첫 번째 프로덕션 배포
- [ ] 커스텀 도메인 설정 (선택)

#### 5-5. 최종 검증
- [ ] Lighthouse 전체 점수 측정
  - Performance: 90+
  - Accessibility: 90+
  - SEO: 90+
- [ ] 모바일/태블릿/데스크톱 전 기기 UI 검증
- [ ] 실제 Notion에서 글 발행 → 블로그 반영 플로우 검증

### 완료 기준
- [ ] Vercel 배포 URL에서 사이트 정상 접근
- [ ] Lighthouse 성능 점수 90 이상
- [ ] 모든 라우트 정상 동작 확인
- [ ] Notion에서 글 작성 → 블로그 자동 반영 확인

---

## 전체 일정 요약

| Phase | 내용 | 예상 기간 | 누적 기간 |
|-------|------|----------|----------|
| Phase 1 | 프로젝트 초기 설정 | 1-2일 | 1-2일 |
| Phase 2 | 공통 모듈 개발 | 2-3일 | 3-5일 |
| Phase 3 | 핵심 기능 개발 | 3-4일 | 6-9일 |
| Phase 4 | 추가 기능 개발 | 2-3일 | 8-12일 |
| Phase 5 | 최적화 및 배포 | 1-2일 | **9-14일** |

---

## 아키텍처 결정사항

| 결정 | 선택 | 이유 |
|------|------|------|
| 렌더링 방식 | SSG + ISR | SEO 최적화 + Notion 데이터 최신화 |
| 검색 | 클라이언트 사이드 | Notion API 검색 제한, 소규모 블로그 |
| 코드 하이라이팅 | shiki (추천) | 서버 사이드 렌더링, 번들 크기 이점 |
| 이미지 | next/image | 자동 최적화, Notion 이미지 도메인 허용 |
| 배포 | Vercel | Next.js 공식 배포 플랫폼, ISR 지원 |

---

## 2차 개발 (MVP 이후)

PRD의 제외 항목 — MVP 완성 후 검토

- [ ] 댓글 시스템 (Giscus — GitHub Discussions 기반)
- [ ] 전문 검색 기능 (Algolia 연동)
- [ ] 구독 기능 (이메일 뉴스레터)
- [ ] 자동 배포 파이프라인 (GitHub Actions)
- [ ] 추천 글 시스템
