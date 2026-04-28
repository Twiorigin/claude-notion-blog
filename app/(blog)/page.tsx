// 블로그 메인 페이지: 발행된 글 목록 (서버 컴포넌트)
// 캐싱: lib/notion.ts의 각 함수에서 'use cache' 디렉티브로 제어 (Next.js 16 방식)
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: '블로그',
  description: SITE_CONFIG.description,
};

export default async function BlogPage() {
  // TODO Phase 2: getBlogPosts() 호출 후 목록 렌더링
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">블로그</h1>
      <p className="text-muted-foreground">
        Notion API 연동 후 글 목록이 표시됩니다.
      </p>
    </div>
  );
}
