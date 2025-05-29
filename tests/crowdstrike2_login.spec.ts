import { test, expect } from '@playwright/test';
//import dotenv from 'dotenv';

// Load environment variables from the .env file
//dotenv.config();

test('check login works', async ({ page }) => {
  await page.goto('https://www.crowdstrike.com/en-us/');
  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Falcon platform' }).click();
  await page.goto('https://falcon.crowdstrike.com/login/?unilogin=1');
  //await page.getByRole('textbox', { name: 'Email' }).click();
  //await page.getByRole('textbox', { name: 'Email' }).fill('test@test.io');
  await page.getByRole('textbox', { name: 'Email' }).fill(process.env.CROWDSTRIKE_EMAIL || 'default_email@example.com');
  //await page.getByRole('checkbox', { name: 'Remember my email' }).check();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
});