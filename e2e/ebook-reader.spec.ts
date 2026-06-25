import { test, expect } from '@playwright/test';
import path from 'path';

// Regression test for the PDF.js worker fix: the reader must render an uploaded
// PDF. Previously the worker URL pointed at a non-existent v4-style ".js" file,
// so every document failed with "Unable to load this document."
test('ebook reader renders an uploaded PDF', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  const pageErrors: string[] = [];
  page.on('pageerror', (e) => pageErrors.push(e.message));

  await page.goto('/ebooks', { waitUntil: 'networkidle' });

  await page.setInputFiles('input[type="file"]', path.join(__dirname, 'fixtures', 'sample.pdf'));

  // The page count resolves once the document loads via the worker.
  await expect(page.locator('text=/Page\\s*1\\s*\\/\\s*1/')).toBeVisible({ timeout: 15000 });

  const body = await page.locator('body').innerText();
  expect(body).not.toContain('Unable to load this document');
  expect(body).not.toContain('Unable to render this page');

  // A canvas should be present and have real dimensions (the page rendered).
  const dims = await page.locator('canvas').evaluate((c: HTMLCanvasElement) => {
    const rect = c.getBoundingClientRect();
    return {
      w: c.width,
      h: c.height,
      renderedWidth: rect.width,
      renderedHeight: rect.height,
      filter: getComputedStyle(c).filter,
    };
  });
  expect(dims.w).toBeGreaterThan(0);
  expect(dims.h).toBeGreaterThan(0);
  expect(dims.renderedWidth).toBeGreaterThan(0);
  expect(dims.renderedHeight).toBeGreaterThan(0);
  expect(dims.renderedWidth / dims.renderedHeight).toBeCloseTo(dims.w / dims.h, 2);
  expect(dims.filter).toBe('none');

  expect(pageErrors.filter((e) => !/webpack|WebSocket/.test(e))).toEqual([]);
});
