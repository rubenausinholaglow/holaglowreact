import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.holaglow.com/');
  await page
    .getByRole('heading', { name: 'Medicina estética para cuidar' })
    .click();
});
