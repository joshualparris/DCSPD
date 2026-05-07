export type SanitizeResult = {
  text: string;
  redactionSummary: string;
  redactions: number;
};

function redact(pattern: RegExp, label: string, input: string) {
  let count = 0;
  const next = input.replace(pattern, () => {
    count += 1;
    return `[REDACTED:${label}]`;
  });
  return { next, count };
}

export function sanitizeForAi(input: string): SanitizeResult {
  let text = input ?? '';
  let redactions = 0;
  const labels: string[] = [];

  // Email addresses
  {
    const { next, count } = redact(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, 'EMAIL', text);
    if (count) labels.push(`emails:${count}`);
    redactions += count;
    text = next;
  }

  // URLs (http/https)
  {
    const { next, count } = redact(/https?:\/\/[^\s)]+/gi, 'URL', text);
    if (count) labels.push(`urls:${count}`);
    redactions += count;
    text = next;
  }

  // IPv4 addresses
  {
    const { next, count } = redact(/\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g, 'IPV4', text);
    if (count) labels.push(`ipv4:${count}`);
    redactions += count;
    text = next;
  }

  // Ticket IDs / long identifiers (heuristic)
  {
    const { next, count } = redact(/\b(?:INC|REQ|TKT|TICKET|CASE)[-_ ]?\d{4,}\b/gi, 'TICKET', text);
    if (count) labels.push(`ticketIds:${count}`);
    redactions += count;
    text = next;
  }

  // Device serial-ish tokens (heuristic: long mixed alnum strings)
  // Important: require BOTH letters and digits so normal long words are not redacted.
  {
    const { next, count } = redact(
      /\b(?=[A-Za-z0-9-]{10,}\b)(?=[A-Za-z0-9-]*[A-Za-z])(?=[A-Za-z0-9-]*\d)[A-Za-z0-9-]+\b/g,
      'ID',
      text
    );
    if (count) labels.push(`ids:${count}`);
    redactions += count;
    text = next;
  }

  // Password lines (best-effort)
  {
    const { next, count } = redact(/(?:password|passcode|pwd)\s*[:=]\s*\S+/gi, 'PASSWORD', text);
    if (count) labels.push(`passwords:${count}`);
    redactions += count;
    text = next;
  }

  const redactionSummary = labels.length ? `Redacted ${redactions} item(s) (${labels.join(', ')}).` : 'No redactions applied.';

  return {
    text,
    redactionSummary,
    redactions
  };
}

