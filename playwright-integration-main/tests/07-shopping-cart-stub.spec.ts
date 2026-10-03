import { test, expect } from '@playwright/test';

test('Inventory REAL -> Shopping Cart STUB: Check student name', async ({ page }) => {

  await page.goto('/');

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await page.waitForURL(/inventory\.html/);

  await expect(page.locator('.inventory_list')).toBeVisible();

  await page.setContent(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Shopping Cart Stub</title>
      </head>

      <body>
        <h1>Shopping Cart Stub</h1>

        <div data-test="stub-shopping-cart">

          <h2>Shopping Cart</h2>

          <div class="student-name">
            กรณิศ นุ่นรอด
          </div>

        </div>
      </body>
    </html>
  `);

  await expect(
    page.locator('[data-test="stub-shopping-cart"]')
  ).toContainText('กรณิศ นุ่นรอด');

});