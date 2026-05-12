import { test, expect } from '@playwright/test';

test('OutputPlot visual check', async ({ page }) => {
  await page.goto('http://localhost:5173/playground');
  await page.waitForSelector('.app-container', { state: 'visible' });
  // Add an interactive test if feasible
});
