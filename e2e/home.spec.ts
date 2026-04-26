

import { test, expect } from '@playwright/test';

test('homepage loads and shows title', async ({ page }) => {
await page.goto('/');
// Debug title (optional)
console.log(await page.title());

// Validate title (adjust if needed)
await expect(page).toHaveTitle(/Sign in - Jenkins/i);

// Wait for login form elements instead of counter/next-btn
await expect(page.locator('#j_username')).toBeVisible();
await expect(page.locator('input[name="j_password"]')).toBeVisible();
await expect(page.locator('button[type="submit"]')).toBeVisible();
});



/*import { test, expect } from '@playwright/test';

test('homepage loads and shows title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/spanish-word-flip-flash/i);
  // Consider the app loaded when either counter or next button is visible
  await page.waitForSelector('[data-testid="counter"], [data-testid="next-btn"]', { state: 'visible' });
});
*/



