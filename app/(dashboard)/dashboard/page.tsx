import type { Metadata } from 'next';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DASHBOARD_STATS } from '@/lib/constants';

export const metadata: Metadata = {
  title: '대시보드',
};

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-2">통계 요약</h2>
        <p className="text-sm text-muted-foreground">지난 30일간의 주요 지표</p>
      </div>

      {/* 통계 카드 그리드 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  {stat.trend && stat.trend !== 'neutral' && (
                    <>
                      {stat.trend === 'up' ? (
                        <TrendingUp className="size-3 text-green-600" />
                      ) : (
                        <TrendingDown className="size-3 text-red-600" />
                      )}
                      <span
                        className={
                          stat.trend === 'up'
                            ? 'text-green-600'
                            : stat.trend === 'down'
                              ? 'text-red-600'
                              : ''
                        }
                      >
                        {stat.trendValue}
                      </span>
                    </>
                  )}
                  {stat.description && <span>{stat.description}</span>}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Separator />

      {/* 최근 활동 */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">최근 활동</h3>
        <Card>
          <CardHeader>
            <CardTitle>활동 목록</CardTitle>
            <CardDescription>최근 7일간의 활동</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1, action: '새 사용자 가입', time: '2시간 전' },
                { id: 2, action: '주문 완료', time: '4시간 전' },
                { id: 3, action: '설정 업데이트', time: '1일 전' },
                { id: 4, action: '피드백 제출', time: '2일 전' },
                { id: 5, action: '계정 생성', time: '3일 전' },
              ].map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
