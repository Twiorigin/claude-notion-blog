---
name: Next.js 16 주요 파괴적 변경사항
description: Next.js 16.2.4에서 확인된 API 변경사항 — 코드 작성 시 반드시 참조
type: project
---

이 프로젝트는 Next.js 16.2.4를 사용하며 일반 배포 버전(15.x)과 다른 API를 사용함.

1. **middleware.ts → proxy.ts**: `middleware` export → `proxy` export로 변경. 파일명도 `proxy.ts`로 변경해야 함. (공식 문서: node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md)

2. **ISR `export const revalidate` 제거**: 페이지 파일에서 `export const revalidate`는 무효화됨. 대신 함수 내부에서 `'use cache'` 디렉티브 + `cacheLife('hours')` 사용. (공식 문서: node_modules/next/dist/docs/01-app/01-getting-started/09-revalidating.md)

3. **@notionhq/client API 변경**: `notion.databases.query` 제거됨. 대신 `notion.dataSources.query({ data_source_id: ... })` 사용. 파라미터도 `database_id` → `data_source_id`로 변경.

4. **동적 라우트 params**: `params` prop이 `Promise<{ slug: string }>` 타입으로 변경됨. `await params`로 비동기 처리 필요.

**Why:** Next.js 16은 훈련 데이터에 없는 비공개 선행 버전. AGENTS.md에서 경고됨.

**How to apply:** 코드 작성 전 반드시 node_modules/next/dist/docs/ 관련 문서 확인.
