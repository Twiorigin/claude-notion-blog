'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  settingsProfileSchema,
  settingsPasswordSchema,
  type SettingsProfileFormData,
  type SettingsPasswordFormData,
} from '@/lib/schemas'

export default function SettingsPage() {
  const [profilePending, setProfilePending] = useState(false)
  const [passwordPending, setPasswordPending] = useState(false)

  const profileForm = useForm<SettingsProfileFormData>({
    resolver: zodResolver(settingsProfileSchema),
    defaultValues: {
      name: '사용자',
      email: 'user@example.com',
      bio: '',
    },
  })

  const passwordForm = useForm<SettingsPasswordFormData>({
    resolver: zodResolver(settingsPasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })
  return (
    <div className="space-y-8 p-6 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-2">설정</h2>
        <p className="text-sm text-muted-foreground">서비스 및 계정 설정을 관리합니다</p>
      </div>

      {/* 프로필 설정 */}
      <Card>
        <CardHeader>
          <CardTitle>프로필 설정</CardTitle>
          <CardDescription>기본 계정 정보를 수정합니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            onSubmit={profileForm.handleSubmit(async (data) => {
              try {
                setProfilePending(true)
                // 더미: 실제 프로젝트에서는 API 호출로 교체
                await new Promise((resolve) => setTimeout(resolve, 1000))
                toast.success('프로필이 저장되었습니다')
              } catch (error) {
                toast.error('저장에 실패했습니다')
              } finally {
                setProfilePending(false)
              }
            })}
            className="space-y-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="settings-name">이름</Label>
              <Input
                id="settings-name"
                placeholder="이름을 입력하세요"
                {...profileForm.register('name')}
                disabled={profilePending}
              />
              {profileForm.formState.errors.name && (
                <p className="text-xs text-destructive">{profileForm.formState.errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="settings-email">이메일</Label>
              <Input
                id="settings-email"
                type="email"
                placeholder="이메일을 입력하세요"
                {...profileForm.register('email')}
                disabled={profilePending}
              />
              {profileForm.formState.errors.email && (
                <p className="text-xs text-destructive">{profileForm.formState.errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="settings-bio">소개</Label>
              <Input
                id="settings-bio"
                placeholder="간단한 소개를 입력하세요"
                {...profileForm.register('bio')}
                disabled={profilePending}
              />
              {profileForm.formState.errors.bio && (
                <p className="text-xs text-destructive">{profileForm.formState.errors.bio.message}</p>
              )}
            </div>
            <Button type="submit" disabled={profilePending}>
              {profilePending ? '저장 중...' : '프로필 저장'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Separator />

      {/* 알림 설정 */}
      <Card>
        <CardHeader>
          <CardTitle>알림 설정</CardTitle>
          <CardDescription>알림 수신 방식을 설정합니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">이메일 알림</p>
              <p className="text-xs text-muted-foreground">새 알림을 이메일로 받습니다</p>
            </div>
            <div className="size-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">ON</div>
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">마케팅 알림</p>
              <p className="text-xs text-muted-foreground">업데이트 및 이벤트 정보를 받습니다</p>
            </div>
            <div className="size-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs">OFF</div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* 보안 설정 */}
      <Card>
        <CardHeader>
          <CardTitle>비밀번호 변경</CardTitle>
          <CardDescription>계정 보안을 위해 주기적으로 변경하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            onSubmit={passwordForm.handleSubmit(async (data) => {
              try {
                setPasswordPending(true)
                // 더미: 실제 프로젝트에서는 API 호출로 교체
                await new Promise((resolve) => setTimeout(resolve, 1000))
                toast.success('비밀번호가 변경되었습니다')
                passwordForm.reset()
              } catch (error) {
                toast.error('비밀번호 변경에 실패했습니다')
              } finally {
                setPasswordPending(false)
              }
            })}
            className="space-y-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="current-password">현재 비밀번호</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="현재 비밀번호"
                {...passwordForm.register('currentPassword')}
                disabled={passwordPending}
              />
              {passwordForm.formState.errors.currentPassword && (
                <p className="text-xs text-destructive">{passwordForm.formState.errors.currentPassword.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">새 비밀번호</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="새 비밀번호"
                {...passwordForm.register('newPassword')}
                disabled={passwordPending}
              />
              {passwordForm.formState.errors.newPassword && (
                <p className="text-xs text-destructive">{passwordForm.formState.errors.newPassword.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">새 비밀번호 확인</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="새 비밀번호 재입력"
                {...passwordForm.register('confirmPassword')}
                disabled={passwordPending}
              />
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-xs text-destructive">{passwordForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>
            <Button type="submit" variant="outline" disabled={passwordPending}>
              {passwordPending ? '변경 중...' : '비밀번호 변경'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* 위험 구역 */}
      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-destructive">위험 구역</CardTitle>
          <CardDescription>되돌릴 수 없는 작업입니다. 신중하게 진행하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <Button type="button" variant="destructive">계정 삭제</Button>
        </CardContent>
      </Card>
    </div>
  );
}
