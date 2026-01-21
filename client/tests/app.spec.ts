import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:3000/')
});

test.describe('Validate Login Page and Navigate through the application',  () => {
  test('Log in, select order and display all the information ', async ({ page }) => {
    await expect(page).toHaveURL("http://localhost:3000/");
    await page.locator('label').first().click();
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('example123@test.com');
    await page.getByRole('button', { name: 'SEND' }).click();
    await page.getByText('Please enter correct email.').click();
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').press('Control+a');
    await page.getByRole('textbox').fill('test@example.com');
    await page.getByText('Please enter your email address to see your recent orders').click();
    await page.getByRole('button', { name: 'SEND' }).click();
    await expect(page.getByText('Your Orders')).toBeVisible();
    await page.getByText('Tracking number');
    await page.getByText('Current status')
  });

  test('Toggle', async ({ page }) => {
    await expect(page).toHaveURL("http://localhost:3000/");
    await page.locator('label').first().click();
    await page.locator('html').click();
    await page.locator('#app div').filter({ hasText: 'Please enter your email address to see your recent ordersEmailSEND' }).nth(3).click();
    await page.locator('label').first().click();
    await page.locator('#app div').filter({ hasText: 'Please enter your email address to see your recent ordersEmailSEND' }).nth(3).click();
  });
})
