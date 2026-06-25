import { test, expect, Page } from '@playwright/test';

// Every static route in the app.
const STATIC_ROUTES = [
  '/',
  '/academic-pd',
  '/academic-pd/bridge',
  '/academic-pd/feedback',
  '/admin',
  '/admin/content',
  '/admin/custom-content',
  '/admin/integrations',
  '/admin/slg-import',
  '/assets',
  '/certificates',
  '/certifications/aplus-core-1',
  '/certifications/aplus-core-2',
  '/certifications/network-plus',
  '/certifications/security-plus',
  '/cheat-sheets',
  '/daily-challenge',
  '/due-today',
  '/ebooks',
  '/error-log',
  '/evidence-pack',
  '/feedback-log',
  '/focus',
  '/hardware',
  '/kb-sync',
  '/knowledge-base-lab',
  '/migration-guide',
  '/mobile-qa',
  '/modules',
  '/paths',
  '/pd-log',
  '/peer-review',
  '/playbooks',
  '/playground',
  '/practice-exam',
  '/progress',
  '/readiness',
  '/recent-updates',
  '/scenarios',
  '/scheduler',
  '/search',
  '/settings',
  '/simulations/classroom-desk',
  '/simulations/network',
  '/simulations/roleplay',
  '/skill-coach',
  '/strict-quiz',
  '/supervisor',
  '/sync',
  '/ticket-data-import',
  '/trainer-guide',
  '/usage-insights',
  '/voice-to-ticket',
  '/weekly-pd-path'
];

// Console messages that are benign and should not fail a test.
function isIgnorableConsoleError(text: string) {
  return (
    text.includes('favicon') ||
    text.includes('manifest') ||
    text.includes('Failed to load resource') ||
    text.includes('the server responded with a status') ||
    // AI endpoints intentionally degrade when unconfigured.
    text.includes('AI') ||
    text.includes('coach') ||
    text.includes('sw.js') ||
    text.includes('ServiceWorker') ||
    text.includes('[Fast Refresh]') ||
    // Dev-server hot-reload websocket noise (not an app concern).
    text.includes('webpack-hmr') ||
    text.includes('WebSocket') ||
    text.includes('ERR_INVALID_HTTP_RESPONSE')
  );
}

// Attaches collectors and returns a function that asserts no hard errors occurred.
function watchForErrors(page: Page) {
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];
  page.on('pageerror', (err) => pageErrors.push(err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error' && !isIgnorableConsoleError(msg.text())) {
      consoleErrors.push(msg.text());
    }
  });
  return { pageErrors, consoleErrors };
}

test.describe('every route renders without runtime errors', () => {
  for (const route of STATIC_ROUTES) {
    test(`route ${route}`, async ({ page }) => {
      const { pageErrors, consoleErrors } = watchForErrors(page);
      const response = await page.goto(route, { waitUntil: 'networkidle' });

      expect(response, `no response for ${route}`).toBeTruthy();
      expect(response!.status(), `bad status for ${route}`).toBeLessThan(400);

      // Brief settle for client hydration to surface any post-mount crashes.
      // networkidle already waited for load; 250ms is enough for effect errors.
      await page.waitForTimeout(250);

      const body = await page.locator('body').innerText();
      expect(body.length, `empty body on ${route}`).toBeGreaterThan(0);
      expect(body, `error overlay on ${route}`).not.toContain('Application error');
      expect(body, `unhandled error on ${route}`).not.toContain('Unhandled Runtime Error');

      expect(pageErrors, `uncaught error on ${route}: ${pageErrors.join(' | ')}`).toEqual([]);
      expect(consoleErrors, `console error on ${route}: ${consoleErrors.join(' | ')}`).toEqual([]);
    });
  }
});

test.describe('dynamic routes', () => {
  test('valid module id renders the module', async ({ page }) => {
    const { pageErrors } = watchForErrors(page);
    await page.goto('/modules/dcs-it-support-foundations', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('DCS IT Support Foundations');
    expect(pageErrors).toEqual([]);
  });

  test('legacy-alias module id resolves', async ({ page }) => {
    await page.goto('/modules/ict-helpdesk-101', { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    const body = await page.locator('body').innerText();
    expect(body).not.toContain('Module not found');
  });

  test('invalid module id shows a graceful not-found, not a crash', async ({ page }) => {
    const { pageErrors } = watchForErrors(page);
    await page.goto('/modules/this-module-does-not-exist', { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    const body = await page.locator('body').innerText();
    expect(body).toContain('Module not found');
    expect(pageErrors).toEqual([]);
  });

  test('invalid asset / cert / playbook ids do not crash', async ({ page }) => {
    for (const route of ['/assets/nope', '/certifications/nope', '/playbooks/nope']) {
      const { pageErrors } = watchForErrors(page);
      const res = await page.goto(route, { waitUntil: 'networkidle' });
      expect(res!.status(), `status ${route}`).toBeLessThan(500);
      await page.waitForTimeout(250);
      const body = await page.locator('body').innerText();
      expect(body, `crash on ${route}`).not.toContain('Application error');
      expect(pageErrors, `error on ${route}`).toEqual([]);
    }
  });
});

test.describe('resilience to corrupt localStorage', () => {
  const corruptValues: Record<string, string> = {
    dcsprep_learning_cockpit_v4: '{ this is : not json',
    dcsprep_custom_modules: '{"not":"an array"}',
    dcsprep_custom_assets: 'null',
    dcsprep_custom_scenarios: '"a string"',
    dcsprep_custom_playbooks: '12345',
    'dcsprep-gamification': '<<<broken>>>'
  };

  for (const route of ['/', '/modules', '/progress', '/assets', '/scenarios', '/skill-coach', '/due-today']) {
    test(`route ${route} survives corrupt storage`, async ({ page }) => {
      const { pageErrors } = watchForErrors(page);
      // Seed corrupt data before the app boots.
      await page.addInitScript((values) => {
        for (const [k, v] of Object.entries(values)) {
          window.localStorage.setItem(k, v as string);
        }
      }, corruptValues);

      await page.goto(route, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);

      const body = await page.locator('body').innerText();
      expect(body.length, `white screen on ${route}`).toBeGreaterThan(50);
      expect(body, `crash on ${route}`).not.toContain('Application error');
      expect(pageErrors, `uncaught error on ${route}: ${pageErrors.join(' | ')}`).toEqual([]);
    });
  }
});

test.describe('search edge cases', () => {
  const queries = ['', 'a', 'zzzzzznoresults', 'printer', '<script>alert(1)</script>', '   ', '%%%', 'a'.repeat(200)];
  for (const q of queries) {
    test(`search query ${JSON.stringify(q).slice(0, 30)} does not crash`, async ({ page }) => {
      const { pageErrors } = watchForErrors(page);
      await page.goto(`/search?q=${encodeURIComponent(q)}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);
      const body = await page.locator('body').innerText();
      expect(body, `crash for query ${q}`).not.toContain('Application error');
      expect(pageErrors, `error for query ${q}: ${pageErrors.join(' | ')}`).toEqual([]);
    });
  }
});

test.describe('API routes respond without server errors', () => {
  // 503 is an intentional "AI not configured" response (no GROQ_API_KEY) that the
  // client handles by falling back. We accept it; we only reject unhandled 500/502.
  const acceptable = (status: number) => status < 500 || status === 503;

  test('GET endpoints respond without an unhandled server error', async ({ request }) => {
    const getEndpoints = ['/api/ai/coach/health', '/api/check-environment', '/api/ebooks'];
    for (const url of getEndpoints) {
      const res = await request.get(url);
      expect(acceptable(res.status()), `unhandled ${res.status()} from ${url}`).toBeTruthy();
    }
  });

  test('POST AI endpoints degrade gracefully on minimal input', async ({ request }) => {
    const postEndpoints = ['/api/ai/coach', '/api/ai/note-generator', '/api/ai/oral-exam', '/api/ai/roleplay'];
    for (const url of postEndpoints) {
      const res = await request.post(url, { data: {} });
      // Clean 200 fallback, a controlled 4xx, or 503 not-configured; never an unhandled 500/502.
      expect(acceptable(res.status()), `unhandled ${res.status()} from ${url}`).toBeTruthy();
    }
  });

  test('progress-sync handles GET and POST without 5xx', async ({ request }) => {
    const get = await request.get('/api/progress-sync');
    expect(get.status()).toBeLessThan(500);
    const post = await request.post('/api/progress-sync', { data: { hello: 'world' } });
    expect(post.status()).toBeLessThan(500);
  });
});
