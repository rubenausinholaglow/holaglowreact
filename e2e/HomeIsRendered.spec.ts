import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await expect(
    page.getByRole('heading', { name: 'Medicina estética para cuidar' })
  ).toBeVisible();
});
