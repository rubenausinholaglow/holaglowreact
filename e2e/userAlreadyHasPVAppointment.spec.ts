import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.holaglow.com/');
  await page.getByRole('link', { name: 'Reservar cita' }).click();
  await page
    .getByText('AsesoramientoTe asesoramos con el escáner facial 3DGratis')
    .click();
  await page.getByText('Barcelona Avenida Diagonal').click();
  await page.getByLabel('Choose viernes, 28 de junio de').click();
  await page.getByText('11:00 h').click();
  await page.getByPlaceholder('Número de teléfono').click();
  await page.getByPlaceholder('Número de teléfono').type('627 950 137');
  await page.getByPlaceholder('Nombre').click();
  await page.getByPlaceholder('Nombre').fill('test');
  await page.getByPlaceholder('Apellidos').click();
  await page.getByPlaceholder('Apellidos').fill('holaglow');
  await page.getByPlaceholder('Correo electrónico').click();
  await page
    .getByPlaceholder('Correo electrónico')
    .fill('lluistallada@holaglow.com');
  await page.getByText('Acepto términos y condiciones').click();

  await page.getByRole('button', { name: 'Continuar' }).toBeEnabled();
});
