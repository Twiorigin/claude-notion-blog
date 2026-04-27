import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';

export const metadata: Metadata = {
  title: '홈',
  description: 'Next.js 16 + React 19 웹 개발 스타터킷',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
    </>
  );
}
