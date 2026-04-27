import { chromium } from '@playwright/test';

async function testCorrectPort() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log(`[${msg.type().toUpperCase()}] ${msg.text()}`);
    }
  });

  try {
    // 포트 3002로 테스트
    console.log('=== 포트 3002 테스트 ===\n');

    const response = await page.goto('http://localhost:3002/login', { waitUntil: 'networkidle' });
    console.log(`응답 상태: ${response.status()} ${response.statusText()}`);

    // 페이지 제목 확인
    const title = await page.title();
    console.log(`페이지 제목: ${title}`);

    // 로그인 폼 요소 찾기
    const emailInput = await page.$('#email');
    if (emailInput) {
      console.log('✓ 이메일 입력 필드 찾음');
    } else {
      console.log('✗ 이메일 입력 필드를 찾을 수 없음');
    }

    const submitButton = await page.$('button[type="submit"]');
    if (submitButton) {
      console.log('✓ 제출 버튼 찾음');
    } else {
      console.log('✗ 제출 버튼을 찾을 수 없음');
    }

    await page.waitForTimeout(1000);
  } catch (error) {
    console.error('오류:', error.message);
  }

  await browser.close();
}

testCorrectPort().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
