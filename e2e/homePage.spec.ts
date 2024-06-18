import { expect, test } from '@playwright/test';

test('Home has Treatments link and Products loaded', async ({ page }) => {
  await page.goto('https://www.holaglow.com/');
  await expect(
    page.getByRole('link', { name: 'Aumento de labios Aumento de' })
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Ver tratamientos' })
  ).toBeVisible();
  await page.getByRole('link', { name: 'Ver tratamientos' }).click();
  await expect(
    page.getByRole('link', { name: 'Aumento de labios Aumento de' })
  ).toBeVisible();
});
