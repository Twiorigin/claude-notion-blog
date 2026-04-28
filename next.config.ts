// Next.js 설정: 이미지 최적화, 보안 헤더 포함
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Notion 이미지 및 외부 이미지 도메인 허용
  images: {
    remotePatterns: [
      {
        // Notion 내부 파일 스토리지
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        // Notion 외부 이미지
        protocol: 'https',
        hostname: '**.notion.so',
      },
      {
        // 일반 HTTPS 이미지 (외부 커버 이미지용)
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // 보안 헤더 설정
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // 클릭재킹 방지
          { key: 'X-Frame-Options', value: 'DENY' },
          // MIME 스니핑 방지
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // 리퍼러 정책
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
