@AGENTS.md

# claude-nextjs-starters CLAUDE.md

이 파일은 이 프로젝트의 아키텍처, 코딩 컨벤션, 기술 스택을 문서화합니다. Claude가 코드 생성 및 수정 시 참조합니다.

---

## 프로젝트 개요

**스타터 킷**: Next.js 기반의 대시보드 템플릿
- 랜딩 페이지 (`(marketing)` route group)
- 인증 페이지 (`(auth)` route group)
- 대시보드 페이지 (`(dashboard)` route group)
- 현재: 더미 데이터 및 클라이언트 사이드 로직만 있음. 백엔드 연결 없음.

---

## 기술 스택

| 항목 | 버전 | 설명 |
|---|---|---|
| **Next.js** | 16.2.4 | App Router 기반 (⚠️ 일반 배포 버전과 다를 수 있음 — AGENTS.md 참조) |
| **React** | 19.2.4 | |
| **TypeScript** | ^5 | |
| **Tailwind CSS** | ^4 | CSS-first 방식 (주의: 아래 Tailwind CSS v4 섹션 참조) |
| **shadcn/ui** | ^4.4.0 | new-york 스타일 |
| **react-hook-form** | 최신 | 폼 상태 관리 |
| **zod** | 최신 | 스키마 검증 |
| **next-themes** | 최신 | 다크/라이트 모드 |
| **sonner** | 최신 | Toast 알림 |
| **lucide-react** | 최신 | 아이콘 라이브러리 |
| **usehooks-ts** | 최신 | 유틸리티 훅 (useBoolean 등) |

---

## 디렉토리 구조 및 규칙

### 루트 레벨

```
app/
  layout.tsx              # 루트 레이아웃 (ThemeProvider, Toaster, TooltipProvider)
  globals.css             # Tailwind CSS v4 CSS 변수 및 기본 스타일
  not-found.tsx           # 404 페이지
  (marketing)/            # 마케팅 route group
  (auth)/                 # 인증 route group
  (dashboard)/            # 대시보드 route group

components/
  ui/                     # shadcn/ui 컴포넌트
  layout/                 # 레이아웃 컴포넌트 (navbar, sidebar 등)
  sections/               # 페이지 섹션 컴포넌트
  theme-toggle.tsx        # 다크모드 토글

hooks/
  use-mounted.ts          # SSR 하이드레이션 가드
  use-mobile.ts           # 768px 미만 여부 감지

lib/
  utils.ts                # cn() 함수 (clsx + tailwind-merge)
  types.ts                # 공유 TypeScript 타입
  constants.ts            # 전역 상수
  schemas.ts              # Zod 검증 스키마

middleware.ts            # 라우트 보호 미들웨어
```

### Route Group 구조

```
(marketing)/layout.tsx    → Navbar + Footer 레이아웃
(auth)/layout.tsx         → 중앙 정렬 레이아웃 (로그인용)
(dashboard)/layout.tsx    → Sidebar + DashboardHeader + main 3단 레이아웃
```

---

## 코딩 컨벤션

### 파일 위치 규칙

| 항목 | 위치 | 예시 |
|---|---|---|
| 공유 타입 | `lib/types.ts` | `export type NavItem = { ... }` |
| 검증 스키마 | `lib/schemas.ts` | `export const loginSchema = z.object({ ... })` |
| 전역 상수 | `lib/constants.ts` | `export const SITE_CONFIG = { ... }` |
| 유틸 함수 | `lib/utils.ts` | `export const cn = (...) => ...` |
| 커스텀 훅 | `hooks/use-*.ts` | `export function useMounted() { ... }` |
| 레이아웃 컴포넌트 | `components/layout/` | navbar, sidebar, footer |
| shadcn/ui 컴포넌트 | `components/ui/` | (shadcn CLI로 추가) |

### 서버 컴포넌트 vs 클라이언트 컴포넌트

**서버 컴포넌트 (SC) — `'use client'` 없음)**
- 데이터 조회 전용 페이지 (dashboard/analytics)
- `metadata` export 필요한 페이지
- 초기 페이지 로딩

**클라이언트 컴포넌트 (CC — `'use client'` 포함)**
- 폼이 있는 페이지 (login, profile, settings)
- `useState`, `useEffect` 등 상태 사용
- `usePathname`, `useRouter` 등 네비게이션 훅 사용
- 인터랙티브 컴포넌트 (sidebar 토글, sheet 열기 등)

### 약칭

```typescript
// ❌ 피할 것
const [isOpen, setIsOpen] = useState(false);

// ✅ useBoolean 사용 (usehooks-ts)
const { value: isOpen, toggle } = useBoolean(false);
```

---

## Tailwind CSS v4 주의사항

### 설정 파일 구조

```
⚠️ tailwind.config.js 파일이 없습니다.

대신 app/globals.css 에 @theme inline 블록으로 CSS 변수를 정의합니다:

@theme inline {
  --color-primary: oklch(0.5 0.2 240);
  /* ... */
}
```

### 색상 참조

Tailwind v4는 `oklch()` 함수 기반 색상을 사용합니다:

```css
/* globals.css */
@theme inline {
  --color-primary: oklch(...);
}
```

```tsx
// 컴포넌트에서 사용
<div className="bg-primary text-primary-foreground">...</div>
```

### PostCSS

```
postcss.config.mjs 에 @tailwindcss/postcss 플러그인이 등록되어 있습니다.
추가 설정은 거의 필요 없습니다.
```

---

## 인증 패턴

### 현재 구현 (더미)

```typescript
// app/(auth)/login/page.tsx
const handleLogin = async (data) => {
  // 실제 프로젝트에서는 여기를 API 호출로 교체
  document.cookie = 'auth-token=demo-token; path=/';
  router.push('/dashboard');
};
```

### 라우트 보호 (middleware.ts)

```typescript
// /dashboard/:path* 경로 전체를 쿠키 존재 여부로 보호
export const config = {
  matcher: ['/dashboard/:path*'],
};
```

미인증 시 → `/login?callbackUrl=<원래경로>` 로 리다이렉트

### 실제 구현으로 전환할 때

1. 로그인 핸들러: `document.cookie` 라인을 API 호출로 교체
   - API 응답에서 서버가 Set-Cookie 헤더로 쿠키 설정
   - 또는 로그인 응답을 받아 클라이언트가 쿠키 설정
2. middleware.ts: 단순 쿠키 체크에서 JWT 검증으로 업그레이드
3. 필요시 NextAuth / Clerk / Supabase Auth 같은 라이브러리로 교체

---

## 폼 처리 패턴

### 스키마 정의 (lib/schemas.ts)

```typescript
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('이메일 형식이 올바르지 않습니다'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
```

### 폼 컴포넌트

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/lib/schemas';

export function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // 폼 제출 로직
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* form.register, form.formState.errors 등 사용 */}
    </form>
  );
}
```

### Toast 알림 (sonner)

```typescript
import { toast } from 'sonner';

// 성공
toast.success('프로필이 업데이트되었습니다');

// 에러
toast.error('오류가 발생했습니다');
```

---

## shadcn/ui 컴포넌트 추가

### 명령어

```bash
npx shadcn-ui@latest add <component-name>
```

### 예시

```bash
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add select
npx shadcn-ui@latest add tabs
```

### 추가 후

컴포넌트는 `components/ui/` 경로에 자동으로 생성됩니다. 바로 import해서 사용하면 됩니다:

```typescript
import { Dialog, DialogContent } from '@/components/ui/dialog';
```

---

## 절대경로 Alias

프로젝트는 `@/*` 절대경로를 지원합니다 (tsconfig.json 설정됨):

```typescript
// ❌ 피할 것
import { cn } from '../../../lib/utils';

// ✅ 사용할 것
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { loginSchema } from '@/lib/schemas';
```

---

## 개발 서버 실행

```bash
npm run dev
# http://localhost:3000 에서 접속 가능

npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 시작
npm run lint     # ESLint 실행
```

---

## 참고 자료

- AGENTS.md — 이 특정 Next.js 버전의 주요 변경사항
- `node_modules/next/dist/docs/` — 공식 문서 (AGENTS.md 참조)
- components.json — shadcn/ui 설정 (style: new-york, icon: lucide)
- Tailwind CSS v4 가이드: https://tailwindcss.com/docs/v4-migration-guide
