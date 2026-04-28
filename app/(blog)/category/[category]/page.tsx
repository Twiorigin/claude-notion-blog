// 카테고리 페이지: 특정 카테고리의 글 목록 (서버 컴포넌트)
// 캐싱: lib/notion.ts의 각 함수에서 'use cache' 디렉티브로 제어 (Next.js 16 방식)
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  return {
    title: `${decodedCategory} 카테고리`,
    description: `${decodedCategory} 관련 블로그 글 목록`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  // TODO Phase 4: getBlogPostsByCategory(decodedCategory) 호출 후 목록 렌더링

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{decodedCategory}</h1>
      <p className="text-muted-foreground">
        카테고리 &quot;{decodedCategory}&quot;의 글이 표시됩니다.
      </p>
    </div>
  );
}
