import Link from 'next/link';
import { SITE_CONFIG, FOOTER_LINKS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* 브랜드 영역 */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-foreground">{SITE_CONFIG.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{SITE_CONFIG.description}</p>
          </div>

          {/* 제품 링크 */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">제품</h4>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.제품.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 회사 링크 */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">회사</h4>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.회사.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 법률 링크 */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">법률</h4>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.법률.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 하단 영역 */}
        <div className="mt-8 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex gap-6">
              {FOOTER_LINKS.소셜.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
