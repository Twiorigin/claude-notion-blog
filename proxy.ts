// 프록시 (구 미들웨어): Next.js 16에서 middleware.ts → proxy.ts로 명칭 변경
// 블로그는 공개 사이트이므로 현재 라우트 보호 불필요
// 추후 관리자 기능 추가 시 이 파일에서 보호 로직을 구현합니다

export function proxy() {
  // 공개 블로그 — 별도 인증 없음
}

export const config = {
  // 현재 적용 경로 없음
  matcher: [],
};
