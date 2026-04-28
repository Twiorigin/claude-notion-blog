---
name: 블로그 프로젝트 컨텍스트
description: Notion CMS 기반 개인 기술 블로그 전환 프로젝트의 현재 상태 및 핵심 결정사항
type: project
---

대시보드 스타터 킷(invoice-web)을 Notion CMS 기반 개인 기술 블로그로 전환하는 프로젝트.

**Why:** 기술 글쓰기를 Notion에서 작성하면 자동으로 블로그에 반영되는 워크플로우 확보. 별도 관리자 페이지 없이 운영.

**How to apply:** 대시보드 관련 파일(auth, dashboard route group)은 이미 삭제됨. 신규 작업은 모두 블로그 구조(`(blog)` route group)에 집중할 것.

## 현재 상태 (2026-04-27 기준)

- `lib/notion.ts`: `dataSources.query` 방식으로 구현 완료 — 실제 API 호환성 미검증
- `lib/types.ts`, `lib/constants.ts`, `lib/schemas.ts`: 완료
- `app/(blog)/page.tsx`, `app/(blog)/[slug]/page.tsx`: 골격만 존재, TODO 주석으로 연동 대기
- `components/layout/blog-header.tsx`, `blog-footer.tsx`: 완료
- `app/about/page.tsx`: 완료
- 환경 변수(`.env.local`): `NOTION_API_KEY`, `NOTION_DATABASE_ID` 미설정 상태

## 핵심 기술 리스크

`@notionhq/client` v5.20.0에서 `dataSources.query` 메서드 사용 — Phase 1 최우선 검증 필요. 기존 `databases.query` 대신 사용했으나 실제 동작 여부 불확실.

**How to apply:** `lib/notion.ts` 수정 전 반드시 `node_modules/@notionhq/client` 소스 확인.
