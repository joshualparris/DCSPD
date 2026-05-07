import { describe, expect, it } from 'vitest';
import { sanitizeForAi } from '../lib/ai/sanitizeForAi';

describe('sanitizeForAi', () => {
  it('redacts emails, urls, ipv4, and password lines', () => {
    const input =
      'Email josh@example.com and check https://intranet.example.local/page. IP 10.0.0.12 password=secret123. INC-12345';
    const result = sanitizeForAi(input);
    expect(result.text).toContain('[REDACTED:EMAIL]');
    expect(result.text).toContain('[REDACTED:URL]');
    expect(result.text).toContain('[REDACTED:IPV4]');
    expect(result.text).toContain('[REDACTED:PASSWORD]');
    expect(result.text).toContain('[REDACTED:TICKET]');
    expect(result.redactions).toBeGreaterThan(0);
  });

  it('does not redact normal long words without digits', () => {
    const input =
      'The primary role of BIOS/UEFI is to initialize hardware and start the boot process, ensuring the system is properly configured.';
    const result = sanitizeForAi(input);
    expect(result.text).toContain('initialize hardware and start the boot process');
    expect(result.text).toContain('properly configured');
    expect(result.redactions).toBe(0);
  });
});

