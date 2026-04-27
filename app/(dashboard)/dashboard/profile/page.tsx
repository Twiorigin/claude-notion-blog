'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { profileSchema, type ProfileFormData } from '@/lib/schemas'

export default function ProfilePage() {
  const [isPending, setIsPending] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '사용자',
      username: '@user',
      email: 'user@example.com',
      bio: '',
    },
  })
  return (
    <div className="space-y-8 p-6 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-2">내 프로필</h2>
        <p className="text-sm text-muted-foreground">계정 정보를 확인하고 수정합니다</p>
      </div>

      {/* 프로필 카드 */}
      <Card>
        <CardContent className="flex items-center gap-6 pt-6">
          <Avatar className="size-20">
            <AvatarFallback className="text-2xl">U</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-xl font-bold text-foreground">사용자</h3>
              <Badge>관리자</Badge>
            </div>
            <p className="text-sm text-muted-foreground">user@example.com</p>
            <p className="text-xs text-muted-foreground mt-1">2024년 1월 15일부터 사용 중</p>
          </div>
          <Button variant="outline" size="sm">
            사진 변경
          </Button>
        </CardContent>
      </Card>

      <Separator />

      {/* 정보 수정 */}
      <Card>
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
          <CardDescription>프로필 정보를 수정합니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            onSubmit={handleSubmit(async (data) => {
              try {
                setIsPending(true)
                // 더미: 실제 프로젝트에서는 API 호출로 교체
                await new Promise((resolve) => setTimeout(resolve, 1000))
                toast.success('프로필이 저장되었습니다')
              } catch (error) {
                toast.error('저장에 실패했습니다')
              } finally {
                setIsPending(false)
              }
            })}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  {...register('name')}
                  disabled={isPending}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">사용자명</Label>
                <Input
                  id="username"
                  {...register('username')}
                  disabled={isPending}
                />
                {errors.username && (
                  <p className="text-xs text-destructive">{errors.username.message}</p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                disabled={isPending}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">소개</Label>
              <Input
                id="bio"
                placeholder="자신을 소개해 주세요"
                {...register('bio')}
                disabled={isPending}
              />
              {errors.bio && (
                <p className="text-xs text-destructive">{errors.bio.message}</p>
              )}
            </div>
            <Button type="submit" disabled={isPending}>
              {isPending ? '저장 중...' : '변경사항 저장'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* 최근 활동 */}
      <Card>
        <CardHeader>
          <CardTitle>최근 활동</CardTitle>
          <CardDescription>최근 로그인 및 활동 이력</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: '로그인', location: 'Seoul, KR', time: '방금 전', device: 'Chrome / Windows' },
              { action: '설정 변경', location: 'Seoul, KR', time: '2시간 전', device: 'Chrome / Windows' },
              { action: '로그인', location: 'Seoul, KR', time: '어제', device: 'Safari / iPhone' },
            ].map((activity) => (
              <div
                key={`${activity.action}-${activity.time}`}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.device} · {activity.location}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
