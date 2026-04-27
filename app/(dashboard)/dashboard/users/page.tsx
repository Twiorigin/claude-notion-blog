import type { Metadata } from 'next';
import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: '사용자',
};

const USERS = [
  { id: 1, name: '김민준', email: 'minjun@example.com', role: '관리자', status: 'active', joined: '2024.01.15' },
  { id: 2, name: '이서연', email: 'seoyeon@example.com', role: '사용자', status: 'active', joined: '2024.02.03' },
  { id: 3, name: '박도윤', email: 'doyun@example.com', role: '사용자', status: 'inactive', joined: '2024.02.28' },
  { id: 4, name: '최수아', email: 'sua@example.com', role: '에디터', status: 'active', joined: '2024.03.11' },
  { id: 5, name: '정지우', email: 'jiwoo@example.com', role: '사용자', status: 'active', joined: '2024.04.05' },
  { id: 6, name: '강예린', email: 'yerin@example.com', role: '사용자', status: 'inactive', joined: '2024.04.22' },
];

const ROLE_COLOR: Record<string, 'default' | 'secondary' | 'outline'> = {
  관리자: 'default',
  에디터: 'secondary',
  사용자: 'outline',
};

export default function UsersPage() {
  const activeCount = USERS.filter((u) => u.status === 'active').length;
  const inactiveCount = USERS.filter((u) => u.status === 'inactive').length;

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-2">사용자 관리</h2>
        <p className="text-sm text-muted-foreground">등록된 사용자 목록 및 현황</p>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 사용자</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{USERS.length}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <TrendingUp className="size-3 text-green-600" />
              <span className="text-green-600">+2명</span>
              <span>이번 달 신규</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">활성 사용자</CardTitle>
            <UserCheck className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeCount}</div>
            <p className="text-xs text-muted-foreground mt-1">현재 서비스 이용 중</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">비활성 사용자</CardTitle>
            <UserX className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">{inactiveCount}</div>
            <p className="text-xs text-muted-foreground mt-1">30일 이상 미접속</p>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* 사용자 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>전체 사용자 목록</CardTitle>
          <CardDescription>최근 가입 순 정렬</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="grid grid-cols-5 text-xs font-medium text-muted-foreground py-2 border-b border-border">
              <span className="col-span-2">사용자</span>
              <span>권한</span>
              <span>상태</span>
              <span>가입일</span>
            </div>
            {USERS.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-5 items-center py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors rounded-sm"
              >
                <div className="col-span-2 flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarFallback className="text-xs">
                      {user.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                <Badge variant={ROLE_COLOR[user.role] ?? 'outline'} className="w-fit">
                  {user.role}
                </Badge>
                <div className="flex items-center gap-1.5">
                  <div
                    className={`size-2 rounded-full ${
                      user.status === 'active' ? 'bg-green-500' : 'bg-muted-foreground'
                    }`}
                  />
                  <span className="text-xs text-muted-foreground">
                    {user.status === 'active' ? '활성' : '비활성'}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{user.joined}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
