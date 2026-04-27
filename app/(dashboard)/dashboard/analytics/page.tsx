import type { Metadata } from 'next';
import { BarChart3, TrendingUp, TrendingDown, Users, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: '통계',
};

const MONTHLY_DATA = [
  { month: '1월', visits: 12400, conversions: 420 },
  { month: '2월', visits: 15200, conversions: 510 },
  { month: '3월', visits: 18900, conversions: 680 },
  { month: '4월', visits: 22100, conversions: 790 },
  { month: '5월', visits: 19800, conversions: 720 },
  { month: '6월', visits: 25600, conversions: 930 },
];

const TOP_PAGES = [
  { page: '/', title: '홈', visits: 8420, bounce: '32%' },
  { page: '/dashboard', title: '대시보드', visits: 5210, bounce: '18%' },
  { page: '/login', title: '로그인', visits: 3840, bounce: '45%' },
  { page: '/#features', title: '기능 소개', visits: 2980, bounce: '38%' },
  { page: '/dashboard/analytics', title: '통계', visits: 1650, bounce: '22%' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-2">통계 분석</h2>
        <p className="text-sm text-muted-foreground">지난 6개월간의 방문 및 전환 데이터</p>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 방문수</CardTitle>
            <Eye className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">114,000</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <TrendingUp className="size-3 text-green-600" />
              <span className="text-green-600">+18%</span>
              <span>지난 6개월 대비</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 전환수</CardTitle>
            <BarChart3 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,050</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <TrendingUp className="size-3 text-green-600" />
              <span className="text-green-600">+22%</span>
              <span>지난 6개월 대비</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 체류시간</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3분 24초</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <TrendingDown className="size-3 text-red-600" />
              <span className="text-red-600">-5%</span>
              <span>지난 6개월 대비</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">이탈률</CardTitle>
            <TrendingDown className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34.2%</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <TrendingUp className="size-3 text-green-600" />
              <span className="text-green-600">-3%</span>
              <span>지난 달 대비 개선</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* 월별 방문 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>월별 방문 현황</CardTitle>
          <CardDescription>{new Date().getFullYear()}년 1월 ~ 6월</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-4 text-xs font-medium text-muted-foreground pb-2 border-b border-border">
              <span>월</span>
              <span>방문수</span>
              <span>전환수</span>
              <span>전환율</span>
            </div>
            {MONTHLY_DATA.map((row) => (
              <div key={row.month} className="grid grid-cols-4 text-sm py-1">
                <span className="font-medium">{row.month}</span>
                <span>{row.visits.toLocaleString()}</span>
                <span>{row.conversions.toLocaleString()}</span>
                <span className="text-green-600">{((row.conversions / row.visits) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 인기 페이지 */}
      <Card>
        <CardHeader>
          <CardTitle>인기 페이지</CardTitle>
          <CardDescription>방문수 기준 상위 5개 페이지</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-4 text-xs font-medium text-muted-foreground pb-2 border-b border-border">
              <span className="col-span-2">페이지</span>
              <span>방문수</span>
              <span>이탈률</span>
            </div>
            {TOP_PAGES.map((page, index) => (
              <div key={page.page} className="grid grid-cols-4 text-sm py-1 items-center">
                <div className="col-span-2 flex items-center gap-2">
                  <Badge variant="secondary" className="size-6 flex items-center justify-center p-0 shrink-0">
                    {index + 1}
                  </Badge>
                  <span className="font-medium truncate">{page.title}</span>
                </div>
                <span>{page.visits.toLocaleString()}</span>
                <span className="text-muted-foreground">{page.bounce}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
