'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useBoolean } from 'usehooks-ts'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet'
import { NAV_ITEMS, SITE_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useMounted } from '@/hooks/use-mounted'

export function Navbar() {
  const mounted = useMounted()
  const pathname = usePathname()
  const { setTheme, resolvedTheme } = useTheme()
  const { value: mobileOpen, toggle: toggleMobile, setFalse: closeMobile, setValue: setMobileOpen } = useBoolean(false)

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* 로고 */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors"
        >
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="hidden sm:inline">{SITE_CONFIG.name}</span>
        </Link>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* 우측: 테마토글 + 모바일 메뉴 */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="테마 전환">
            {mounted ? (
              resolvedTheme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />
            ) : (
              <div className="size-4" />
            )}
          </Button>

          {/* 모바일 메뉴 */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="메뉴">
                {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{SITE_CONFIG.name}</SheetTitle>
                <SheetDescription className="sr-only">모바일 네비게이션 메뉴</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-4">
                <ul className="space-y-2">
                  {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMobile}
                          className={cn(
                            'block px-3 py-2 text-sm font-medium rounded-md transition-colors',
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                          )}
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
