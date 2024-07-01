import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await expect(
    page.getByRole('link', { name: 'Aumento de labios Aumento de' })
  ).toBeVisible();
});
