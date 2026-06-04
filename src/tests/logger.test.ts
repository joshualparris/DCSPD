import { afterEach, describe, expect, it, vi } from 'vitest';
import { devLog, isDevEnvironment, logApiError } from '../lib/logger';

describe('logger', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('treats test environment as non-production', () => {
    expect(isDevEnvironment()).toBe(true);
  });

  it('does not log dev messages in production', () => {
    vi.stubEnv('NODE_ENV', 'production');
    const spy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    devLog('secret prompt payload');
    expect(spy).not.toHaveBeenCalled();
  });

  it('logApiError omits full error objects in production', () => {
    vi.stubEnv('NODE_ENV', 'production');
    const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    logApiError('ai.test', new Error('provider timeout'));
    expect(spy).toHaveBeenCalledWith('[ai.test] provider timeout');
  });
});
