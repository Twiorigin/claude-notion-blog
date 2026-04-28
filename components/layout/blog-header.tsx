// 블로그 헤더: 로고, 네비게이션, 다크모드 토글
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/constants';

export function BlogHeader() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link
          href="/"
          className="font-bold text-lg text-foreground hover:opacity-80 transition-opacity"
        >
          {SITE_CONFIG.name}
        </Link>

        {/* 네비게이션 + 다크모드 토글 */}
        <nav className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {item.title}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
