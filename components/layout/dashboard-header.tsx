'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bell, LogOut, Settings, User, CheckCheck, Info, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useBoolean } from 'usehooks-ts'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet'

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'info' as const,
    title: '새 사용자 가입',
    description: '이서연 님이 가입했습니다.',
    time: '5분 전',
    read: false,
  },
  {
    id: 2,
    type: 'success' as const,
    title: '결제 완료',
    description: '월정액 구독이 정상 처리되었습니다.',
    time: '1시간 전',
    read: false,
  },
  {
    id: 3,
    type: 'warning' as const,
    title: '보안 알림',
    description: '새로운 기기에서 로그인이 감지되었습니다.',
    time: '3시간 전',
    read: false,
  },
  {
    id: 4,
    type: 'info' as const,
    title: '시스템 업데이트',
    description: '새 버전이 배포되었습니다.',
    time: '어제',
    read: true,
  },
  {
    id: 5,
    type: 'success' as const,
    title: '통계 보고서 생성',
    description: '4월 월간 보고서가 준비되었습니다.',
    time: '2일 전',
    read: true,
  },
];

const NOTIFICATION_ICON = {
  info: <Info className="size-4 text-blue-500 shrink-0" />,
  success: <CheckCircle2 className="size-4 text-green-500 shrink-0" />,
  warning: <AlertCircle className="size-4 text-amber-500 shrink-0" />,
}

interface DashboardHeaderProps {
  title?: string
  description?: string
}

export function DashboardHeader({ title = '대시보드', description = '환영합니다' }: DashboardHeaderProps) {
  const router = useRouter()
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const { value: sheetOpen, setTrue: openSheet, setFalse: closeSheet } = useBoolean(false)

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications])

  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))

  const markAsRead = (id: number) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))

  return (
    <div className="flex items-center justify-between border-b border-border bg-background px-6 py-4 shrink-0">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* 알림 버튼 → Sheet로 알림 패널 */}
        <Sheet open={sheetOpen} onOpenChange={(open) => (open ? openSheet() : closeSheet())}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" aria-label="알림">
              <Bell className="size-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -right-1 -top-1 size-5 flex items-center justify-center rounded-full p-0 text-[10px] leading-none">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 sm:w-96 p-0">
            <SheetHeader className="px-5 py-4 border-b border-border">
              <div className="flex items-center justify-between">
                <SheetTitle>알림</SheetTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-xs text-muted-foreground h-7"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                >
                  <CheckCheck className="size-3" />
                  모두 읽음
                </Button>
              </div>
              <SheetDescription className="sr-only">알림 목록</SheetDescription>
            </SheetHeader>

            <div className="overflow-y-auto h-full pb-20">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <div
                    className={`flex gap-3 px-5 py-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                      !notification.read ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="mt-0.5">{NOTIFICATION_ICON[notification.type]}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`text-sm font-medium leading-tight ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}
                        >
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="size-2 rounded-full bg-blue-500 shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {notification.description}
                      </p>
                      <p className="text-[11px] text-muted-foreground/70 mt-1.5">{notification.time}</p>
                    </div>
                  </div>
                  {index < notifications.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* 사용자 드롭다운 메뉴 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 pl-2 pr-3 h-9">
              <Avatar className="size-7">
                <AvatarFallback className="text-xs font-semibold bg-primary text-primary-foreground">
                  U
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground hidden sm:inline">User</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold">사용자</p>
                <p className="text-xs text-muted-foreground">user@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="flex items-center gap-2 cursor-pointer">
                  <User className="size-4" />
                  <span>프로필</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex items-center gap-2 cursor-pointer">
                  <Settings className="size-4" />
                  <span>설정</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
              onClick={() => router.push('/')}
            >
              <LogOut className="size-4" />
              <span>로그아웃</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
