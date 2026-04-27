import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* 배지 */}
          <Badge className="mb-6 gap-1 bg-primary/10 text-primary hover:bg-primary/20">
            🎉 Next.js 16 + React 19 준비됨
          </Badge>

          {/* 제목 */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            빠르게 시작하는
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
              웹 개발 스타터킷
            </span>
          </h1>

          {/* 설명 */}
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Next.js 16, React 19, TypeScript, Tailwind CSS v4, ShadcnUI v4로 구성된 현대적인 웹 개발 스타터킷.
            <br />
            모든 것이 준비되어 있으니 개발에만 집중하세요.
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="gap-2">
              <Link href="/dashboard">
                시작하기 <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link
                href="https://github.com/shadcn/ui"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub에서 보기
              </Link>
            </Button>
          </div>

          {/* 통계 영역 */}
          <div className="mt-16 grid grid-cols-3 gap-8 pt-10 border-t border-border/40">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground">100%</div>
              <p className="text-sm text-muted-foreground mt-2">TypeScript</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground">50+</div>
              <p className="text-sm text-muted-foreground mt-2">UI 컴포넌트</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground">0kb</div>
              <p className="text-sm text-muted-foreground mt-2">커스텀 코드</p>
            </div>
          </div>
        </div>
      </div>

      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/10 blur-3xl opacity-50" />
      </div>
    </section>
  );
}
