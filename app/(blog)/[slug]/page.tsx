// 글 상세 페이지: 동적 라우트
// 캐싱: lib/notion.ts의 각 함수에서 'use cache' 디렉티브로 제어 (Next.js 16 방식)
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

// 동적 메타데이터: 글 제목/설명을 OG 태그에 반영
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // TODO: getBlogPostBySlug(slug) 호출 후 실제 메타데이터 반환
  return {
    title: `글 상세 - ${slug}`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // TODO Phase 3: getBlogPostBySlug(slug) 호출 후 블록 렌더링
  // const post = await getBlogPostBySlug(slug);
  // if (!post) notFound();
  void slug;
  void notFound;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">글 상세 페이지</h1>
      <p className="text-muted-foreground">
        Notion API 연동 후 글 내용이 표시됩니다.
      </p>
    </div>
  );
}
