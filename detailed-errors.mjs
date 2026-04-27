import { chromium } from '@playwright/test';

async function detailedErrors() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // 자세한 로깅 설정
  page.on('console', msg => {
    console.log(`[${msg.type().toUpperCase()}] ${msg.text()}`);
  });

  page.on('pageerror', error => {
    console.log(`[PAGE ERROR] ${error.message}`);
    console.log(error.stack);
  });

  page.on('response', response => {
    if (response.status() >= 400) {
      console.log(`[NETWORK ERROR] ${response.status()} ${response.statusText()}`);
      console.log(`  URL: ${response.url()}`);
    }
  });

  page.on('requestfailed', request => {
    console.log(`[REQUEST FAILED] ${request.method()} ${request.url()}`);
    console.log(`  Failure: ${request.failure()?.errorText}`);
  });

  try {
    console.log('\n=== /login 페이지 접속 중 ===\n');
    const response = await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle' });
    console.log(`\n[응답 상태] ${response.status()} ${response.statusText()}`);
    console.log(`[응답 헤더]`);
    const headers = response.headers();
    console.log(`  content-type: ${headers['content-type']}`);
    console.log(`  x-powered-by: ${headers['x-powered-by']}`);

    // HTML 내용 확인
    const html = await response.text();
    console.log(`\n[HTML 길이] ${html.length} bytes`);
    console.log(`[HTML 샘플] ${html.substring(0, 500)}`);

    // 페이지 제목 확인
    const title = await page.title();
    console.log(`\n[페이지 제목] ${title}`);

    // 모든 콘솔 메시지 수집 (2초 대기)
    await page.waitForTimeout(2000);
  } catch (error) {
    console.error('Error:', error.message);
  }

  await browser.close();
}

detailedErrors().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
