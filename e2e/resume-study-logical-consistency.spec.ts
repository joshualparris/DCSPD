import { test, expect } from '@playwright/test';

const vaguePhrases = [
  'read the relevant section',
  'read the matching resource',
  'read the ITIL section',
  'review the related module',
  'open the matching resource',
  'find the section',
  'or review',
  'most closely related'
];

function countExampleBullets(text: string) {
  return (text.match(/(?:^|\s)-\s+/g) ?? []).length;
}

function assertReadStepIsSelfContained(bodyText: string) {
  expect(bodyText).toContain('Examples:');
  expect(countExampleBullets(bodyText)).toBeGreaterThanOrEqual(2);
  expect(bodyText).toMatch(/(Now write|write one sentence|write a sentence)/i);
  expect(bodyText).toContain('Main idea:');
}

function assertNoVagueReadingPrompts(bodyText: string) {
  for (const phrase of vaguePhrases) {
    expect(bodyText).not.toContain(phrase);
  }
}

test.describe('Resume Study logical consistency', () => {
  test('Dashboard exposes Resume Study card and opens the page', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.evaluate(() => window.localStorage.clear());

    const dashboardCard = page.getByRole('link', { name: /Interrupt-safe PD/i }).first();
    await expect(dashboardCard).toBeVisible();
    await dashboardCard.click();

    await expect(page).toHaveURL(/\/resume-study$/);
  });

  test('Resume Study flow is self-contained, consistent, and persists progress', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.evaluate(() => window.localStorage.clear());
    await page.goto('/resume-study', { waitUntil: 'networkidle' });

    const resumeMain = page.locator('main').filter({ hasText: /Day 1 of 16/i }).first();

    await expect(resumeMain.getByRole('heading', { name: /Day 1 of 16/i })).toBeVisible();
    await expect(resumeMain.getByText(/Step 1 of 5/i)).toBeVisible();
    await expect(resumeMain.getByRole('heading', { name: /Read/i })).toBeVisible();
    await expect(resumeMain.getByText(/Exact task/i)).toBeVisible();
    await expect(resumeMain.locator('textarea#resume-study-note')).toBeVisible();
    await expect(resumeMain.getByRole('button', { name: /Mark step complete/i })).toBeVisible();
    await expect(resumeMain.getByRole('button', { name: /Next step/i })).toBeVisible();

    const mainText = await resumeMain.innerText();
    assertNoVagueReadingPrompts(mainText);
    assertReadStepIsSelfContained(mainText);

    const instructionTexts: string[] = [];
    const promptTexts: string[] = [];

    for (let stepIndex = 1; stepIndex <= 5; stepIndex++) {
      const stepLabel = await resumeMain.locator('h2').first().innerText();
      const instruction = await resumeMain.locator('h2').first().locator('xpath=following-sibling::p[1]').innerText();
      const prompt = await resumeMain.getByText('Exact task').locator('xpath=following-sibling::p[1]').innerText();

      instructionTexts.push(instruction);
      promptTexts.push(prompt);

      if (stepLabel === 'Read') {
        const readText = await resumeMain.innerText();
        assertReadStepIsSelfContained(readText);
      }

      if (stepIndex < 5) {
        await page.getByRole('button', { name: /Next step/i }).click();
        await expect(page.getByText(new RegExp(`Step ${stepIndex + 1} of 5`, 'i'))).toBeVisible();
      }
    }

    for (let i = 1; i < instructionTexts.length; i++) {
      expect(instructionTexts[i]).not.toBe(instructionTexts[i - 1]);
      expect(promptTexts[i]).not.toBe(promptTexts[i - 1]);
    }

    await page.goto('/resume-study', { waitUntil: 'networkidle' });
    await expect(page.getByText(/Step 5 of 5/i)).toBeVisible();

    const noteText = 'Resume Study note persistence check.';
    await page.locator('textarea#resume-study-note').fill(noteText);
    await page.getByRole('button', { name: /Mark step complete/i }).click();
    await page.getByRole('button', { name: /Next step/i }).click();

    await expect(page.getByRole('heading', { name: /Day 2 of 16/i })).toBeVisible();
    await expect(page.getByText(/Step 1 of 5/i)).toBeVisible();

    const noteForStep = 'Resume Study note on day 2, step 1.';
    await page.locator('textarea#resume-study-note').fill(noteForStep);
    await page.reload({ waitUntil: 'networkidle' });

    await expect(page.getByRole('heading', { name: /Day 2 of 16/i })).toBeVisible();
    await expect(page.getByText(/Step 1 of 5/i)).toBeVisible();
    await expect(page.locator('textarea#resume-study-note')).toHaveValue(noteForStep);

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Reset the 16-day Resume Study plan back to Day 1, Step 1?');
      await dialog.accept();
    });

    await page.getByRole('button', { name: /Reset plan/i }).click();
    const resetMain = page.locator('main').filter({ hasText: /Resume Study/i }).first();
    await expect(page.getByRole('heading', { name: /Day 1 of 16/i })).toBeVisible();
    await expect(resetMain).toContainText('0%');
  });
});
