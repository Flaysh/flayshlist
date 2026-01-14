import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('homepage loads with key elements', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /FLAYSH/i })).toBeVisible();
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByText('Music')).toBeVisible();
  });

  test('navigates to music page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /music/i }).first().click();

    await expect(page).toHaveURL('/music');
    await expect(page.getByRole('heading', { name: 'Music' })).toBeVisible();
  });

  test('navigates to visuals page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /visuals/i }).first().click();

    await expect(page).toHaveURL('/reels');
  });

  test('navigates to about page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /about/i }).first().click();

    await expect(page).toHaveURL('/about');
    await expect(page.getByText('Itay Flaysher')).toBeVisible();
  });

  test('navigates to chat page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /ask ai/i }).first().click();

    await expect(page).toHaveURL('/chat');
  });

  test('navigates to tools page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /how i built/i }).first().click();

    await expect(page).toHaveURL('/tools');
  });
});

test.describe('Homepage Content', () => {
  test('displays spotify embed section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Listen on Spotify')).toBeVisible();
  });

  test('displays social links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /github/i }).first()).toBeVisible();
  });

  test('displays category cards', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('DJ Sets & Productions')).toBeVisible();
  });
});

test.describe('AI Chat', () => {
  test('shows initial assistant message', async ({ page }) => {
    await page.goto('/chat');
    await expect(page.getByText(/I'm an AI assistant/i)).toBeVisible();
  });

  test('responds to user message', async ({ page }) => {
    await page.goto('/chat');
    
    await page.fill('input[placeholder*="Ask anything"]', 'What is your tech stack?');
    await page.click('button:has(svg)');

    await expect(page.getByText(/React.js/i)).toBeVisible({ timeout: 5000 });
  });

  test('suggested questions work', async ({ page }) => {
    await page.goto('/chat');
    
    await page.getByText("What's your tech stack?").click();
    await expect(page.getByText(/React.js/i)).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Mobile Navigation', () => {
  test('opens mobile menu on small viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuButton = page.getByRole('button', { name: /toggle navigation/i });
    await menuButton.click();

    await expect(page.getByRole('navigation', { name: /mobile/i })).toBeVisible();
  });

  test('navigates from mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    await page.getByRole('button', { name: /toggle navigation/i }).click();
    await page.getByRole('link', { name: /music/i }).click();

    await expect(page).toHaveURL('/music');
  });
});

test.describe('About Page', () => {
  test('displays experience section', async ({ page }) => {
    await page.goto('/about');

    await expect(page.getByText('Professional Experience')).toBeVisible();
    await expect(page.getByText('Apono')).toBeVisible();
  });

  test('displays skills section', async ({ page }) => {
    await page.goto('/about');

    await expect(page.getByText('Technical Skills')).toBeVisible();
  });

  test('displays education section', async ({ page }) => {
    await page.goto('/about');

    await expect(page.getByText('Education')).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('has proper heading hierarchy on homepage', async ({ page }) => {
    await page.goto('/');

    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
  });

  test('navigation links are keyboard accessible', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
});
