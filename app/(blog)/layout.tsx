// 블로그 route group 공통 레이아웃: 헤더 + 푸터
import type React from 'react';
import { BlogHeader } from '@/components/layout/blog-header';
import { BlogFooter } from '@/components/layout/blog-footer';

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BlogHeader />
      <main className="flex-1">{children}</main>
      <BlogFooter />
    </>
  );
}
