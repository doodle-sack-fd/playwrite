import { test, expect } from '@playwright/test';

const host = process.env.BASE_URL || 'http://localhost:3000/';

test('has title', async ({ page }) => {
	await page.goto(host);

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle('React App');
});
