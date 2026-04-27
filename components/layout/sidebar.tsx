'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBoolean } from 'usehooks-ts';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { SIDEBAR_ITEMS, SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();
  const { value: collapsed, toggle: toggleCollapsed } = useBoolean(false);

  return (
    <aside
      className={cn(
        'flex flex-col border-r border-border bg-sidebar transition-all duration-300 h-screen sticky top-0',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* 헤더 - 로고 + 접기 버튼 */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed ? (
          <Link
            href="/"
            className="flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-primary transition-colors"
          >
            <div className="size-7 rounded-md bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
              S
            </div>
            <span className="text-sm font-semibold truncate">{SITE_CONFIG.name}</span>
          </Link>
        ) : (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className="flex items-center justify-center size-7 rounded-md bg-primary text-white font-bold text-sm shrink-0"
              >
                S
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">홈으로 이동</TooltipContent>
          </Tooltip>
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleCollapsed}
          className="text-sidebar-foreground hover:bg-sidebar-accent shrink-0"
          aria-label={collapsed ? '펼치기' : '접기'}
        >
          {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </Button>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Tooltip key={item.href} delayDuration={collapsed ? 0 : 1000}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto size-fit">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Link>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right" className="ml-2">
                  <p>{item.title}</p>
                </TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </nav>

      {/* 푸터 - 사용자 정보 */}
      <div className="border-t border-sidebar-border p-3">
        <div className={cn(
          'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm',
          'bg-sidebar-accent text-sidebar-accent-foreground'
        )}>
          <div className="size-4 rounded-full bg-primary shrink-0" />
          {!collapsed && <span className="text-xs font-medium truncate">사용자</span>}
        </div>
      </div>
    </aside>
  );
}
