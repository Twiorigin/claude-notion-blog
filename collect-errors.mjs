import { chromium } from '@playwright/test';

async function collectErrors() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const results = {};
  const errors = [];

  // 페이지별 오류 수집 함수
  async function checkPage(name, url) {
    const pageErrors = [];
    const logs = [];
    const networkErrors = [];

    // 콘솔 메시지 수집
    page.on('console', msg => {
      logs.push({
        type: msg.type(),
        text: msg.text(),
      });
      if (msg.type() === 'error' || msg.type() === 'warning') {
        pageErrors.push({
          type: 'console',
          level: msg.type(),
          message: msg.text(),
        });
      }
    });

    // 페이지 오류 수집
    page.on('pageerror', error => {
      pageErrors.push({
        type: 'error',
        message: error.toString(),
        stack: error.stack,
      });
    });

    // 네트워크 오류 수집
    page.on('response', response => {
      if (response.status() >= 400) {
        networkErrors.push({
          url: response.url(),
          status: response.status(),
          statusText: response.statusText(),
        });
      }
    });

    try {
      console.log(`\n📄 페이지: ${name} (${url})`);
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000); // 2초 대기하여 추가 오류 수집

      results[name] = {
        url,
        success: true,
        consoleErrors: pageErrors.filter(e => e.type === 'console' && e.level === 'error'),
        consoleWarnings: pageErrors.filter(e => e.type === 'console' && e.level === 'warning'),
        pageErrors: pageErrors.filter(e => e.type === 'error'),
        networkErrors: networkErrors.filter(e => e.status >= 400),
        allLogs: logs,
      };

      console.log(`✓ 정상 로드됨`);
      if (pageErrors.length > 0) {
        console.log(`⚠️  오류 ${pageErrors.length}개 발견:`);
        pageErrors.forEach((err, i) => {
          console.log(`   ${i + 1}. [${err.type}] ${err.level || ''} - ${err.message}`);
        });
      }
      if (networkErrors.length > 0) {
        console.log(`❌ 네트워크 오류 ${networkErrors.length}개:`);
        networkErrors.forEach((err, i) => {
          console.log(`   ${i + 1}. ${err.status} ${err.statusText} - ${err.url}`);
        });
      }
    } catch (error) {
      console.log(`❌ 로드 실패: ${error.message}`);
      results[name] = {
        url,
        success: false,
        error: error.message,
      };
    }
  }

  // 각 페이지 확인
  await checkPage('홈페이지', 'http://localhost:3000');
  await checkPage('대시보드', 'http://localhost:3000/dashboard');
  await checkPage('로그인', 'http://localhost:3000/login');
  await checkPage('Not Found', 'http://localhost:3000/notfound');

  await browser.close();

  // 결과 출력
  console.log('\n\n═══════════════════════════════════════════════════════');
  console.log('📊 오류 수집 결과 요약');
  console.log('═══════════════════════════════════════════════════════');

  let totalErrors = 0;
  let totalWarnings = 0;
  let totalNetworkErrors = 0;

  for (const [name, data] of Object.entries(results)) {
    if (data.success) {
      const errorCount = data.consoleErrors.length + data.pageErrors.length;
      const warningCount = data.consoleWarnings.length;
      const networkErrorCount = data.networkErrors.length;

      totalErrors += errorCount;
      totalWarnings += warningCount;
      totalNetworkErrors += networkErrorCount;

      console.log(`\n${name} (${data.url})`);
      console.log(`  콘솔 오류: ${data.consoleErrors.length}`);
      console.log(`  콘솔 경고: ${warningCount}`);
      console.log(`  페이지 오류: ${data.pageErrors.length}`);
      console.log(`  네트워크 오류: ${networkErrorCount}`);

      if (errorCount > 0) {
        data.consoleErrors.forEach(err => console.log(`    - ${err.message}`));
        data.pageErrors.forEach(err => console.log(`    - ${err.message}`));
      }
    }
  }

  console.log('\n총 오류: ' + totalErrors);
  console.log('총 경고: ' + totalWarnings);
  console.log('총 네트워크 오류: ' + totalNetworkErrors);
  console.log('═══════════════════════════════════════════════════════\n');

  return results;
}

collectErrors().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
