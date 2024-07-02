import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  if (process.env.BASE_URL) {
    await page.goto(process.env.BASE_URL);
  }
  await expect(
    page.getByRole('heading', { name: 'Medicina estética para cuidar' })
  ).toBeVisible();
});
