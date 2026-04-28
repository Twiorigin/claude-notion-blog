# Development Guidelines — Notion CMS 개인 기술 블로그

## 1. Project Overview

- **목적**: Notion을 CMS로 사용하는 개인 기술 블로그 (별도 관리자 페이지 없음)
- **핵심 기술**: Next.js 16.2.4 App Router, React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui new-york, @notionhq/client v5
- **배포**: Vercel (ISR 기반 캐싱)
- **환경 변수 필수**: `NOTION_API_KEY`, `NOTION_DATABASE_ID` (.env.local)

---

## 2. Directory Architecture

### 파일 배치 규칙

| 파일 종류 | 위치 | 예시 |
|----------|------|------|
| 블로그 전용 컴포넌트 | `components/blog/` | PostCard, NotionRenderer, CategorySidebar |
| 레이아웃 컴포넌트 | `components/layout/` | blog-header.tsx, blog-footer.tsx |
| shadcn/ui 컴포넌트 | `components/ui/` | CLI로만 추가 |
| 프로바이더 컴포넌트 | `components/providers/` | theme-provider.tsx |
| 공유 TypeScript 타입 | `lib/types.ts` | BlogPost, NotionBlock |
| Zod 검증 스키마 | `lib/schemas.ts` | searchSchema, envSchema |
| 전역 상수 | `lib/constants.ts` | SITE_CONFIG, BLOG_CATEGORIES |
| Notion API 함수 | `lib/notion.ts` | getBlogPosts, getPageBlocks |
| 유틸리티 함수 | `lib/utils.ts` | cn(), formatDate() |
| 커스텀 훅 | `hooks/use-*.ts` | use-mobile.ts, use-mounted.ts |

### 라우트 구조

```
app/
  layout.tsx                    # 루트 레이아웃 — ThemeProvider, Toaster, TooltipProvider
  globals.css                   # Tailwind v4 @theme inline 블록 위치
  (blog)/
    layout.tsx                  # BlogHeader + main + BlogFooter
    page.tsx                    # 글 목록 홈
    [slug]/page.tsx             # 글 상세
    category/[category]/page.tsx # 카테고리 필터
  about/
    page.tsx                    # About 페이지
```

---

## 3. Notion API Rules

### 기존 함수 사용 (lib/notion.ts)

- `getBlogPosts(page?, cursor?)` — 발행된 글 목록, `BlogPostListResponse` 반환
- `getBlogPostsByCategory(category)` — 카테고리별 글 목록, `BlogPost[]` 반환
- `getBlogPostBySlug(slug)` — 슬러그로 특정 글 조회, `BlogPostDetail | null` 반환
- `getPageBlocks(pageId)` — Notion 블록 재귀 조회, `NotionBlock[]` 반환
- `getAllBlogSlugs()` — `generateStaticParams()` 전용, `string[]` 반환

### Notion API 확장 규칙

- 새 Notion 함수는 반드시 `lib/notion.ts`에만 추가
- `@notionhq/client` v5+는 `databases.query` 대신 `dataSources.query` 사용 (이미 구현됨)
- Status 필터 값은 반드시 `NOTION_STATUS.published` 상수 사용 (`"발행됨"` 하드코딩 금지)

### 슬러그(Slug) 규칙

- Slug = Notion 페이지 ID에서 하이픈을 제거한 값 (`page.id.replace(/-/g, '')`)
- `getBlogPostBySlug(slug)`는 내부적으로 slug를 UUID로 역변환 후 `pages.retrieve` 호출
- Notion 데이터베이스에 별도 Slug 필드 추가 금지 — 페이지 ID 기반 방식 유지
- URL 파라미터 `[slug]`는 항상 하이픈 없는 32자 hex 문자열

### ISR 캐싱

- 모든 블로그 페이지에 ISR 적용:
  ```typescript
  export const revalidate = 3600; // 1시간
  ```

---

## 4. Component Rules

### 컴포넌트 생성 위치

- **블로그 UI** → `components/blog/` (예: `post-card.tsx`, `notion-renderer.tsx`, `category-sidebar.tsx`, `search-input.tsx`, `table-of-contents.tsx`)
- **레이아웃** → `components/layout/` (blog-header.tsx, blog-footer.tsx만 존재)
- **shadcn/ui** → `components/ui/` (CLI 명령어로만 추가, 파일 직접 수정 금지)

### shadcn 컴포넌트 추가

```bash
npx shadcn add <component-name>
# 예: npx shadcn add dialog
```

- 추가 후 `components/ui/`에 자동 생성됨 → 바로 import 사용
- **`components/ui/` 내 파일 직접 편집 금지**

### 이미지 처리

- Notion 이미지 포함 모든 이미지 → `next/image` 사용
- Notion S3 도메인은 `next.config.ts` remotePatterns에 이미 등록됨 (추가 설정 불필요)

### 코드 하이라이팅

- Notion 코드블록 렌더링에 `shiki` 사용 (서버 사이드, 번들 크기 이점)
- `highlight.js`로 대체 금지

---

## 5. Routing Rules

- 블로그 관련 모든 페이지는 `app/(blog)/` 라우트 그룹 내에 위치
- About 페이지는 `app/about/page.tsx`에만 위치
- `(blog)/layout.tsx`는 BlogHeader + BlogFooter를 포함 — 레이아웃 수정 시 이 파일만 수정
- 새 라우트 그룹 생성 금지 (기존 (blog), about/ 구조 유지)
- 동적 라우트 파라미터: 글 상세 `[slug]`, 카테고리 `[category]`

### generateStaticParams

```typescript
// app/(blog)/[slug]/page.tsx
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs(); // lib/notion.ts 함수 사용
  return slugs.map((slug) => ({ slug }));
}
```

---

## 6. Server vs Client Component

### 판단 기준

| 조건 | 컴포넌트 타입 |
|------|-------------|
| Notion API 호출, 데이터 조회 | Server Component (기본값) |
| `generateMetadata()` export 필요 | Server Component |
| `useState`, `useEffect` 사용 | Client Component (`'use client'`) |
| `usePathname`, `useRouter` 사용 | Client Component |
| 검색 입력 디바운싱 | Client Component |
| 카테고리 선택 상태 관리 | Client Component |
| Intersection Observer (ToC 스크롤) | Client Component |

### 클라이언트 컴포넌트 예시

```typescript
'use client'; // 검색 입력, 카테고리 사이드바 선택 등에만 사용
```

---

## 7. Tailwind CSS v4 Rules

- **`tailwind.config.js` 생성 금지** — v4는 CSS-first 방식
- 커스텀 색상, 폰트 등 테마 변수는 `app/globals.css`의 `@theme inline` 블록에만 추가:
  ```css
  @theme inline {
    --color-primary: oklch(...);
  }
  ```
- 색상 사용 시 `bg-primary`, `text-primary-foreground` 등 Tailwind 유틸리티 클래스 사용
- 클래스 병합은 반드시 `cn()` 유틸리티 사용 (`lib/utils.ts`):
  ```typescript
  import { cn } from '@/lib/utils';
  ```

---

## 8. Type & Schema Rules

### 타입 정의 (lib/types.ts)

이미 정의된 타입 목록:
- `BlogPost` — 글 목록 카드용 메타데이터 (id, slug, title, description, category, tags, publishedAt, coverImageUrl, status)
- `BlogPostDetail` — BlogPost + blocks 배열 (상세 페이지용)
- `BlogPostListResponse` — `getBlogPosts()` 반환 타입 (posts, pagination, nextCursor)
- `NotionBlock` — 파싱된 Notion 블록 (id, type, richText, language?, imageUrl?, children?)
- `NotionBlockType` — 지원 블록 유니온 타입 (paragraph | heading_1~3 | bulleted_list_item | numbered_list_item | code | image | quote | divider | callout | toggle | to_do | unsupported)
- `RichTextItem` — 인라인 리치 텍스트 단위 (text, href, bold, italic, strikethrough, code, color)
- `PaginationMeta` — 페이지네이션 정보 (currentPage, totalPages, hasNextPage, hasPrevPage)
- `TocItem` — 목차 아이템 (id, text, level: 1|2|3)
- `Category` — 카테고리 정보 (name, count, slug)
- `NavItem`, `Theme`

**규칙:**
- 새 공유 타입은 반드시 `lib/types.ts`에만 추가
- 컴포넌트 파일 내 인라인 타입 정의 금지 (단일 컴포넌트 전용 props 타입 제외)
- Zod 스키마에서 타입 추출 시 `z.infer<typeof schema>` 사용

### 스키마 정의 (lib/schemas.ts)

이미 정의된 스키마:
- `searchSchema` — 검색 쿼리 (query, category, page)
- `envSchema` — 환경 변수 검증

**규칙:**
- 새 폼/쿼리 스키마는 `lib/schemas.ts`에만 추가

---

## 9. Constants Rules (lib/constants.ts)

이미 정의된 상수 목록:
- `SITE_CONFIG` — 사이트명, 저자, 이메일
- `NAV_ITEMS` — 헤더 네비게이션 링크
- `BLOG_CATEGORIES` — React, Next.js, TypeScript, Node.js 등
- `PAGINATION.perPage` — 10 (페이지당 글 수)
- `NOTION_STATUS` — `{ published: "발행됨", draft: "초안" }`
- `SOCIAL_LINKS` — GitHub, 이메일

**규칙:**
- 문자열 리터럴 하드코딩 금지 → 상수 사용
- 특히 `NOTION_STATUS.published` 대신 `"발행됨"` 하드코딩 절대 금지

---

## 10. Multi-file Coordination

아래 작업은 반드시 여러 파일을 동시에 수정한다:

| 작업 | 수정해야 할 파일 |
|------|----------------|
| 새 카테고리 추가 | `lib/constants.ts` (BLOG_CATEGORIES) |
| 새 Notion 데이터베이스 필드 추가 | `lib/types.ts` + `lib/notion.ts` |
| 새 환경 변수 추가 | `.env.example` + `lib/schemas.ts` (envSchema) |
| 헤더 네비게이션 링크 추가 | `lib/constants.ts` (NAV_ITEMS) |
| 새 블로그 유틸리티 함수 추가 | `lib/utils.ts` |
| 새 shadcn 컴포넌트 추가 | `npx shadcn add` 실행 (자동으로 `components/ui/` 생성) |

---

## 11. Import Path Rules

- **절대 경로 `@/*` alias 항상 사용**:
  ```typescript
  // ❌ 금지
  import { cn } from '../../../lib/utils';
  // ✅ 사용
  import { cn } from '@/lib/utils';
  ```
- 경로 alias는 `tsconfig.json`에 `"@/*": ["./*"]`로 설정됨

---

## 12. Prohibited Actions

- **`.env.local` git 커밋 금지** — API 키 노출 방지
- **`tailwind.config.js` 생성 금지** — Tailwind v4 CSS-first 방식 위반
- **`components/ui/` 파일 직접 편집 금지** — shadcn CLI 관리 대상
- **`databases.query` 사용 금지** — `@notionhq/client` v5+에서 deprecated, `dataSources.query` 사용
- **`NOTION_API_KEY` 코드 내 하드코딩 금지** — 환경 변수만 사용
- **`"발행됨"` 문자열 하드코딩 금지** — `NOTION_STATUS.published` 상수 사용
- **상대 경로 import 금지** — `@/` alias 사용
- **`lib/types.ts` 외부에 공유 타입 정의 금지**
- **`lib/notion.ts` 외부에 Notion API 호출 코드 작성 금지**
- **새 라우트 그룹 생성 금지** — 기존 `(blog)`, `about/` 구조 유지
