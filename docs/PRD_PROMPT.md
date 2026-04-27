# [메타 프롬프트] 견적서 MVP PRD 작성 지시

## 📖 이 파일의 사용 방법

이 파일은 Claude Code가 **견적서 웹 뷰어 MVP PRD(Product Requirements Document)**를 자동으로 생성하도록 하는 메타 프롬프트입니다.

**사용 방법**:
1. 이 파일의 전체 내용을 복사합니다
2. Claude Code 또는 claude.ai에 붙여넣기
3. Claude가 완성된 MVP PRD 문서를 생성합니다
4. 생성된 PRD를 `docs/INVOICE_MVP_PRD.md`로 저장합니다

---

## 🎯 당신의 역할

당신은 **PRD(Product Requirements Document) 작성 전문가**입니다. 

아래 컨텍스트, 요구사항, 기술 제약을 바탕으로 완성도 높은 MVP PRD를 작성하세요. 이 문서는:
- 엔지니어링 팀이 구현을 시작할 수 있는 수준의 명확성
- 비즈니스 의도의 정확한 전달
- 기술적 현실성과 실행 가능성

이 세 가지를 모두 만족해야 합니다.

---

## 🏗️ 프로젝트 배경 컨텍스트

### 현재 프로젝트 상태
- **프로젝트명**: invoice-web (견적서 관리 플랫폼)
- **현재 상태**: 스타터 킷 (마케팅, 인증, 대시보드 페이지만 존재)
- **백엔드 연동**: 없음 (클라이언트 사이드 더미 데이터만 사용 중)

### 기술 스택 (변경 불가)
| 항목 | 기술 | 버전 |
|---|---|---|
| 프레임워크 | Next.js | 16.2.4 (⚠️ 최신과 다를 수 있음 - AGENTS.md 참조) |
| React | React 19 | 19.2.4 |
| 타입 시스템 | TypeScript | ^5 |
| UI 라이브러리 | shadcn/ui | ^4.4.0 (new-york 스타일) |
| 스타일링 | Tailwind CSS | ^4 (CSS-first 방식) |
| 폼 처리 | react-hook-form + zod | 최신 |
| 테마 관리 | next-themes | 최신 |
| 알림 | sonner | 최신 |
| 아이콘 | lucide-react | 최신 |

### 프로젝트 구조 (변경 불가)
```
app/
  (marketing)/      # 랜딩 페이지 영역
  (auth)/           # 인증 영역
  (dashboard)/      # 대시보드 영역

components/
  ui/               # shadcn/ui 컴포넌트
  layout/           # 레이아웃 (navbar, sidebar, header)
  sections/         # 페이지 섹션 컴포넌트

lib/
  constants.ts      # 전역 상수
  schemas.ts        # Zod 검증 스키마
  types.ts          # TypeScript 타입
  utils.ts          # 유틸리티 함수

hooks/             # 커스텀 훅 (use-mobile.ts, use-mounted.ts)
```

### 코딩 컨벤션 (필수 준수)
- **주석/문서**: 한국어로 작성
- **변수/함수명**: 영어 (camelCase)
- **들여쓰기**: 2칸
- **컴포넌트**: 서버 컴포넌트 기본, 인터랙션 필요 시 'use client'
- **폼**: react-hook-form + zod 조합
- **스타일링**: Tailwind utility classes만 사용 (CSS-in-JS 금지)
- **절대경로**: `@/*` 패턴 사용 (`@/components/ui/button`)

---

## 📋 비즈니스 요구사항

### 핵심 비즈니스 목표
**노션에 입력한 견적서 데이터를 클라이언트가 웹으로 확인하고 PDF로 다운로드할 수 있도록 하기**

### 주요 기능 (MVP 범위)

#### 1️⃣ Notion 데이터 연동
- Notion API를 통해 견적서 데이터베이스 읽기
- 초기 구현: 읽기 권한만 필요 (Notion Integration token)
- 동기 방식: 매번 로드 시 Notion API 호출 (단순성 우선)

#### 2️⃣ 견적서 웹 뷰어
- 클라이언트가 접근 가능한 견적서 상세 페이지
- 누구나 고유 URL로 접근 가능 (인증 제외)
- 견적서 정보 표시:
  - 견적서 ID, 날짜, 유효기간
  - 클라이언트 정보 (회사명, 담당자, 연락처)
  - 상품/서비스 목록 (수량, 단가, 소계)
  - 합계금액, 할인, 최종금액
  - 결제 조건, 비고

#### 3️⃣ PDF 다운로드
- 웹 뷰어에서 "PDF 다운로드" 버튼 클릭 시 PDF 생성
- PDF 파일명: `invoice_[ID]_[날짜].pdf`
- 고해상도 인쇄 품질
- 웹 뷰어와 동일한 레이아웃

### MVP 제외 항목 (이후 단계)
- ❌ 클라이언트 인증 (누구나 접근 가능)
- ❌ 견적서 수정/삭제
- ❌ 견적서 생성 (Notion에서만 생성)
- ❌ 결제 연동
- ❌ 메일 전송
- ❌ 견적서 버전 관리
- ❌ 전자 서명

### 사용자 스토리

**AS-IS**: 영업팀이 Notion에 견적서를 입력 → 클라이언트에게 메일로 링크 전송 → 클라이언트가 웹사이트의 특정 페이지에서 확인 → PDF 다운로드

**향후 고도화**: 결제 링크, 자동 메일 발송, 서명 기능 등

---

## 📝 PRD 작성 지시사항

아래 형식에 따라 MVP PRD를 작성하세요:

### 1. 프로젝트 개요
- 프로젝트명, 목표, 핵심 가치
- 기대 효과 (영업팀 업무 효율, 클라이언트 경험)

### 2. 사용자 스토리 (User Stories)
- 주요 사용자 페르소나 (영업팀, 클라이언트)
- 각 페르소나의 실제 사용 흐름

### 3. 기능 요구사항 (Functional Requirements)
**FR-1**: Notion API 연동
- API 인증 방식 (Integration token)
- 데이터 조회 범위 (어떤 필드를 읽을 것인가)
- 에러 처리 (API 실패, 타임아웃 등)

**FR-2**: 견적서 웹 뷰어
- 라우트: `/invoices/[invoiceId]`
- 표시할 정보 상세 명세
- 반응형 디자인 (모바일, 태블릿, 데스크톱)

**FR-3**: PDF 다운로드
- 트리거: "PDF 다운로드" 버튼 클릭
- PDF 생성 방식 선택 및 근거 (react-pdf vs. html2canvas+jsPDF vs. Puppeteer)
- PDF 레이아웃 (웹 뷰어와의 일관성)

### 4. 비기능 요구사항 (Non-Functional Requirements)
- 성능: Notion API 응답 속도, PDF 생성 시간
- 보안: 공개 URL의 안전성, DDoS 방지
- 확장성: 대량 견적서 처리 가능성
- 유지보수성: 코드 구조, 테스트 전략

### 5. 화면 설계 명세 (Screen Design Specification)
**라우트 구조**:
```
(dashboard)/
  invoices/
    [invoiceId]/
      page.tsx          # 견적서 웹 뷰어
      layout.tsx        # 뷰어 레이아웃 (헤더, 버튼)
```

**컴포넌트 구조**:
```
components/
  sections/
    invoice-viewer.tsx        # 견적서 본체
    invoice-header.tsx        # 발행인 정보
    invoice-items.tsx         # 상품 목록
    invoice-summary.tsx       # 금액 요약
    invoice-footer.tsx        # 비고, 결제조건
    
  ui/
    (existing shadcn components)
```

**주요 UI 요소**:
- 상단: 뒤로가기, 제목, PDF 다운로드 버튼
- 본문: 견적서 내용 (프린트 가능한 레이아웃)
- 하단: 생성일자, 유효기간 등

### 6. 데이터 모델
**Notion Invoice Database 스키마** (예상):
```
Properties:
- ID (primary key)
- Date (견적서 작성일)
- Client Name (고객사명)
- Client Contact (담당자)
- Client Email (이메일)
- Items (Relation to Items database)
- Total Amount (계산 필드)
- Discount (할인)
- Final Amount (최종금액)
- Payment Terms (결제조건)
- Notes (비고)
- Status (Draft, Sent, Approved, Declined)
```

**Frontend TypeScript Types** (lib/types.ts):
```typescript
type Invoice = {
  id: string;
  date: string;
  clientName: string;
  clientContact: string;
  clientEmail: string;
  items: InvoiceItem[];
  totalAmount: number;
  discount: number;
  finalAmount: number;
  paymentTerms: string;
  notes: string;
  status: 'draft' | 'sent' | 'approved' | 'declined';
};

type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};
```

### 7. 외부 시스템 연동 명세

**Notion API 연동**:
- 엔드포인트: Notion API v1
- 인증: Bearer token (database integration)
- 조회 쿼리: filter by invoice ID
- 에러 처리: 401 (인증 실패), 404 (문서 없음), 429 (rate limit)
- 캐싱 전략 (고려사항): 실시간 조회 vs. 캐시

**클라이언트 라우팅 고려**:
- 동적 라우트: `/invoices/[invoiceId]`
- 쿼리 파라미터: `?token=abc123` (향후 공유 권한 관리용)

### 8. PDF 생성 방식 검토

**후보 라이브러리 비교**:

| 라이브러리 | 장점 | 단점 | 권장도 |
|---|---|---|---|
| **react-pdf** | React 컴포넌트로 PDF 정의 | 정확한 레이아웃 어려움 | ⭐⭐ |
| **html2canvas + jsPDF** | 웹 페이지 → 이미지 → PDF | 이미지 저품질, 글꼴 깨짐 | ⭐⭐⭐ |
| **Puppeteer** | 서버사이드 렌더링, 고품질 | 서버 리소스 필요 | ⭐⭐⭐⭐ |

**권장**: Puppeteer 또는 html2canvas + jsPDF
- 선택 기준: Next.js API Route 추가 여부
- html2canvas: 클라이언트 사이드 (간단, 느림)
- Puppeteer: 서버 사이드 (복잡, 빠름)

### 9. MVP 범위 및 제외 항목

**포함**:
- Notion API 읽기 연동
- 공개 URL 웹 뷰어 (`/invoices/[id]`)
- PDF 다운로드 (클라이언트/서버 방식 중 선택)
- 기본 오류 처리

**제외**:
- 클라이언트 로그인/인증
- 견적서 생성, 수정, 삭제
- 메일 자동 전송
- 버전 관리
- 전자 서명
- 결제 연동
- 접근 권한 관리
- 캐싱/CDN 최적화

### 10. 개발 태스크 및 우선순위

**Phase 1 (Core)**:
1. Notion API 클라이언트 설정 (lib/notion.ts)
2. 타입 정의 (lib/types.ts)
3. 견적서 웹 뷰어 컴포넌트 (components/sections/invoice-viewer.tsx)
4. 라우트 구현 (app/(dashboard)/invoices/[invoiceId]/page.tsx)

**Phase 2 (PDF)**:
5. PDF 라이브러리 선택 및 설정
6. PDF 다운로드 기능 구현

**Phase 3 (Polish)**:
7. 에러 처리 및 로딩 상태
8. 반응형 디자인
9. 테스트 (E2E with Playwright)

---

## 📄 생성 대상 문서

당신은 다음과 같은 내용을 포함한 완성도 높은 MVP PRD를 생성하세요:

1. ✅ 모든 섹션을 한국어로 작성
2. ✅ 기술 용어는 영어 유지 (API, Database, Schema 등)
3. ✅ 코드 예시는 TypeScript 포함
4. ✅ 라우트, 컴포넌트 경로는 실제 프로젝트 구조 반영
5. ✅ Notion API 연동 상세 명세
6. ✅ PDF 라이브러리 선택 근거 제시
7. ✅ 개발 우선순위 명확히
8. ✅ 프로젝트 컨벤션 준수 (Tailwind, React hooks, zod 등)

---

## 🎬 최종 지시

**이 프롬프트를 읽고 즉시 PRD 문서를 마크다운 형식으로 생성하세요.**

생성된 문서는:
- `docs/INVOICE_MVP_PRD.md`로 저장할 수 있어야 함
- 엔지니어가 즉시 개발을 시작할 수 있을 정도의 구체성
- 비즈니스 이해관계자도 이해할 수 있는 명확성

**준비되셨습니까? PRD 작성을 시작하세요!**
