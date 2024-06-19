import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.holaglow.com/');
  await expect(
    page.getByRole('link', { name: 'Aumento de labios Aumento de' })
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Ver tratamientos' })
  ).toBeVisible();
  await expect(page.getByText('TratamientosClínicasSobre')).toBeVisible();
  await expect(
    page.locator('div').filter({ hasText: 'Nuestras clí' }).nth(1)
  ).toBeVisible();
  await expect(page.getByText('Centro de medicina estéticaLa')).toBeVisible();
  await expect(
    page.locator('div:nth-child(14) > div > div:nth-child(2)')
  ).toBeVisible();
  await expect(page.getByText('Sobre nosotrosClí').nth(1)).toBeVisible();
});
