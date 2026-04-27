import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 py-32 text-center">
      <div className="space-y-2">
        <div className="text-8xl font-bold text-primary">404</div>
        <h1 className="text-2xl font-semibold text-foreground">페이지를 찾을 수 없습니다</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          <br />
          아래 버튼을 클릭하여 홈으로 돌아가세요.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard">대시보드로 이동</Link>
        </Button>
      </div>
    </div>
  );
}
