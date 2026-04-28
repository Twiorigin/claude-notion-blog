// 블로그 푸터: 저작권 및 소셜 링크
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';

export function BlogFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-auto py-8">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>
          &copy; {currentYear} {SITE_CONFIG.author}. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href={SOCIAL_LINKS.email}
            className="hover:text-foreground transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
