import { test, expect } from '@playwright/test';

const criticalRoutes = ['/', '/modules', '/scenarios', '/settings', '/evidence-pack', '/simulations/roleplay'] as const;

for (const path of criticalRoutes) {
  test(`loads ${path} without crashing`, async ({ page }) => {
    const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
    expect(response, `No response for ${path}`).not.toBeNull();
    expect(response!.status(), `HTTP status for ${path}`).toBeLessThan(500);
    await expect(page.locator('body')).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible({ timeout: 30_000 });

    if (path === '/') {
      const dashboardState = page
        .getByRole('main')
        .getByText(/Loading your training cockpit|Welcome back/i);
      await expect(dashboardState.first()).toBeVisible({ timeout: 30_000 });
    } else {
      await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 30_000 });
    }
  });
}

test('manifest and service worker assets are available', async ({ request }) => {
  const manifest = await request.get('/manifest.json');
  expect(manifest.ok()).toBeTruthy();
  const manifestJson = await manifest.json();
  expect(manifestJson.start_url).toBeTruthy();

  const sw = await request.get('/sw.js');
  expect(sw.ok()).toBeTruthy();
  const swText = await sw.text();
  expect(swText).toContain('CACHE_NAME');
});

test('offline mode keeps the document shell visible', async ({ page, context }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('body')).toBeVisible();
  await context.setOffline(true);
  await expect(page.locator('body')).toBeVisible();
  // Service worker registration is skipped on localhost; full PWA offline QA is manual.
});
