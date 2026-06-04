/**
 * Server-safe logging helpers. Never log prompts, user answers, or raw AI payloads in production.
 */

function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function isDevEnvironment(): boolean {
  return !isProduction();
}

export function devLog(...args: unknown[]): void {
  if (!isProduction()) {
    console.log(...args);
  }
}

export function devDebug(label: string, detail?: string): void {
  if (!isProduction() && detail !== undefined) {
    console.log(label, detail);
  }
}

/**
 * Logs API failures without echoing request bodies or provider response text.
 */
export function logApiError(scope: string, err: unknown): void {
  const message =
    err instanceof Error ? err.message : typeof err === 'string' ? err : 'unknown error';
  console.error(`[${scope}] ${message}`);
}
