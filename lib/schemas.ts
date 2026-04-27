import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다'),
})

export const profileSchema = z.object({
  name: z.string().min(1, '이름을 입력하세요').max(50, '이름은 50자 이하여야 합니다'),
  username: z.string().min(2, '사용자명은 최소 2자 이상이어야 합니다'),
  email: z.string().email('유효한 이메일을 입력하세요'),
  bio: z.string().max(200, '소개는 200자 이하여야 합니다').optional(),
})

export const settingsProfileSchema = z.object({
  name: z.string().min(1, '이름을 입력하세요'),
  email: z.string().email('유효한 이메일을 입력하세요'),
  bio: z.string().max(200, '소개는 200자 이하여야 합니다').optional(),
})

export const settingsPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, '현재 비밀번호를 입력하세요'),
    newPassword: z.string().min(8, '새 비밀번호는 최소 8자 이상이어야 합니다'),
    confirmPassword: z.string().min(1, '비밀번호를 다시 입력하세요'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  })

export type LoginFormData = z.infer<typeof loginSchema>
export type ProfileFormData = z.infer<typeof profileSchema>
export type SettingsProfileFormData = z.infer<typeof settingsProfileSchema>
export type SettingsPasswordFormData = z.infer<typeof settingsPasswordSchema>
