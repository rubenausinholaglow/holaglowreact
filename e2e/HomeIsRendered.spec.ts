import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto(
    process.env.BASE_URL ? process.env.BASE_URL : 'http://localhost:3000'
  );
  await expect(
    page.getByRole('heading', { name: 'Medicina estética para cuidar' })
  ).toBeVisible();
});
