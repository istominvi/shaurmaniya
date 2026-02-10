import { test, expect } from '@playwright/test';

test('take screenshot of page', async ({ page }) => {
  await page.goto('http://localhost:3006');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'page-screenshot.png', fullPage: true });
});
