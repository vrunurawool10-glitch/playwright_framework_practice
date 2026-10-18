import { test, expect } from '@playwright/test';

test('Login to Aditya Birla Mutual Fund portal', async ({ page }) => {
  const username = 'vrunalirawool';
  const password = '$Money@4';

  await page.goto('https://mutualfund.adityabirlacapital.com/portal/investor/login');

  await page
    .locator('#Username').first().fill(username);

  await page
    .locator('#Password').first().fill(password);

  const checkbox = page.locator('input[type="checkbox"], input[name*="agree" i], input[id*="agree" i]');
  if (await checkbox.count()) {
    await checkbox.first().evaluate((el: HTMLInputElement) => {
      el.checked = true;
      el.dispatchEvent(new Event('change', { bubbles: true }));
      el.dispatchEvent(new Event('input', { bubbles: true }));
    });
  } else {
    const agreeText = page.locator('text=/I agree with the/i');
    if (await agreeText.count()) {
      await agreeText.first().click({ force: true });
    }
  }

  const loginButton = page
    .locator('button:has-text("Login"), button:has-text("Sign in"), button[type="submit"], input[type="submit"]')
    .first();

  await expect(loginButton).toBeVisible({ timeout: 30000 });
  await loginButton.click();

  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/portal\/investor\//, { timeout: 30000 });
})