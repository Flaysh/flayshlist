import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');

    // Check for main heading with name
    await expect(page.getByRole('heading', { name: /FLAYSH/i })).toBeVisible();

    // Check navigation is present
    await expect(page.getByRole('navigation')).toBeVisible();

    // Check key links are present
    await expect(page.getByText('Music')).toBeVisible();
    await expect(page.getByText('Reels')).toBeVisible();
  });

  test('can navigate to music page', async ({ page }) => {
    await page.goto('/');

    // Click on Music
    await page.getByRole('link', { name: /music/i }).first().click();

    // Should be on music page
    await expect(page).toHaveURL('/music');
    await expect(page.getByRole('heading', { name: 'Music' })).toBeVisible();
  });

  test('can navigate to reels page', async ({ page }) => {
    await page.goto('/');

    // Click on Reels
    await page.getByRole('link', { name: /reels/i }).first().click();

    // Should be on reels page
    await expect(page).toHaveURL('/reels');
    await expect(page.getByRole('heading', { name: /reels/i })).toBeVisible();
  });

  test('can navigate to about page', async ({ page }) => {
    await page.goto('/');

    // Navigate to about
    await page.getByRole('link', { name: /about/i }).first().click();

    await expect(page).toHaveURL('/about');
    await expect(page.getByText('Itay Flaysher')).toBeVisible();
  });

  test('can navigate to chat page', async ({ page }) => {
    await page.goto('/');

    // Navigate to chat
    await page.getByRole('link', { name: /ask ai/i }).first().click();

    await expect(page).toHaveURL('/chat');
    await expect(page.getByRole('heading', { name: /ask ai/i })).toBeVisible();
  });

  test('can navigate to tools page', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /how i built/i }).first().click();

    await expect(page).toHaveURL('/tools');
    await expect(page.getByRole('heading', { name: /how i built/i })).toBeVisible();
  });

  test('social links are present', async ({ page }) => {
    await page.goto('/');

    // Check GitHub link exists
    await expect(page.getByRole('link', { name: /github/i }).first()).toBeVisible();
  });

  test('spotify embed loads on homepage', async ({ page }) => {
    await page.goto('/');

    // Check Spotify section exists
    await expect(page.getByText('Listen on Spotify')).toBeVisible();
  });

  test('AI chat responds to messages', async ({ page }) => {
    await page.goto('/chat');

    // Wait for initial message
    await expect(page.getByText(/I'm an AI assistant/i)).toBeVisible();

    // Type a message
    await page.fill('input[placeholder*="Ask anything"]', 'What is your tech stack?');
    await page.click('button:has(svg)');

    // Wait for response
    await expect(page.getByText(/React.js/i)).toBeVisible({ timeout: 5000 });
  });

  test('mobile navigation works', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    // Open mobile menu
    const menuButton = page.getByRole('button', { name: /toggle navigation/i });
    await menuButton.click();

    // Menu should be visible
    await expect(page.getByRole('navigation', { name: /mobile/i })).toBeVisible();

    // Can navigate
    await page.getByRole('link', { name: /music/i }).click();
    await expect(page).toHaveURL('/music');
  });
});
