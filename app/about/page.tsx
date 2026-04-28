// About 페이지: 자기소개 및 기술 스택
import type { Metadata } from 'next';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: `${SITE_CONFIG.author}의 개발 블로그 소개 페이지`,
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">About</h1>
      <p className="text-muted-foreground mb-6">
        안녕하세요, {SITE_CONFIG.author}입니다.
      </p>
      <p className="text-muted-foreground mb-8">
        이 블로그는 Notion CMS 기반으로 운영됩니다. React, Next.js, TypeScript 등
        프론트엔드 기술을 다룹니다.
      </p>
      <div className="flex gap-4">
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-4 hover:opacity-80"
        >
          GitHub
        </a>
        <a
          href={SOCIAL_LINKS.email}
          className="text-primary underline underline-offset-4 hover:opacity-80"
        >
          이메일
        </a>
      </div>
    </div>
  );
}
