import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FEATURES } from '@/lib/constants';

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            모든 것이 포함되어 있습니다
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            개발을 즉시 시작할 수 있는 필수 도구들이 모두 설정되어 있습니다.
            바퀴를 재발명할 필요 없이 검증된 라이브러리들을 활용합니다.
          </p>
        </div>

        {/* 기능 카드 그리드 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="flex flex-col transition-all hover:shadow-lg hover:border-primary/50">
                <CardHeader>
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 w-fit">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 추가 정보 */}
        <div className="mt-16 rounded-lg border border-border bg-card p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">더 알고 싶으신가요?</h3>
          <p className="text-muted-foreground mb-6">
            문서를 읽어보거나 커뮤니티에 참여하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-2 hover:bg-primary/90 transition-colors"
            >
              Next.js 문서
            </a>
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-2 hover:bg-muted transition-colors"
            >
              ShadcnUI 컴포넌트
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
