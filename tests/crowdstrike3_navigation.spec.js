import { test, expect } from '@playwright/test';

test('check we can navigate', async ({ page }) => {
  await page.goto('https://www.crowdstrike.com/en-us/');
  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  await page.getByRole('button', { name: 'Platform' }).click();
  await page.waitForTimeout(2000); // Wait for 2 seconds
  console.log('Waiting for 2000ms after clicking Platform');
  await page.getByRole('link', { name: 'Explore the platform' }).click();
  await page.waitForTimeout(2000); // Wait for 2 seconds
  console.log('Waiting for 2000ms after clicking Platform');
  await expect(page.locator('#platform-graphic-products-page-hero_animated')).toContainText('The cybersecurity platform for the AI era');await expect(page.locator('#platform-graphic-products-page-hero_animated')).toContainText('The cybersecurity platform for the AI era');
});