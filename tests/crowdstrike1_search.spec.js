import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
});

test('check some of the text on crowdstrike home page', async ({ page }) => {
  //await page.goto('/');
  //await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  await expect(page.locator('#nav-utility')).toContainText('Experienced a breach?');
  await expect(page.getByRole('link', { name: 'Pricing', exact: true })).toBeVisible();
});

test('check search function', async ({ page }) => {
  //await page.goto('/');
  //await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  await page.getByRole('button', { name: 'Search Icon' }).click();
  await page.getByRole('searchbox', { name: 'Search field' }).fill('falcon');
  await expect(page).toHaveURL(new RegExp(`falcon`)); 
  console.log(`Search for "falcon" works as expected.`);
});

test('check search function for multiple terms', async ({ page }) => {
  const searchTerms = ['falcon', 'identity'];

  //await page.goto('/');
  //await page.getByRole('button', { name: 'Accept All Cookies' }).click();

  for (const term of searchTerms) {
    await page.getByRole('button', { name: 'Search Icon' }).click();
    await page.getByRole('searchbox', { name: 'Search field' }).fill(term);
    await page.keyboard.press('Enter'); 
    // Simulate pressing Enter to search
    await page.waitForTimeout(2000); // Wait for 2 seconds
    await expect(page).toHaveURL(new RegExp(`.*${term}.*`)); // Check if the URL contains the search term
    console.log(`Search for "${term}" works as expected.`);
    await page.locator('.modal-addsearch__close').click(); // Close the search
  }
});