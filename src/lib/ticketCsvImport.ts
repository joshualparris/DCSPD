export type SyntheticTicketRecord = {
  id: string;
  title: string;
  category: string;
  priority: string;
  channel: string;
  createdDate: string;
  description: string;
};

export type SyntheticTicketImportSummary = {
  tickets: SyntheticTicketRecord[];
  totalTickets: number;
  categoryCounts: Array<{ label: string; count: number; percentage: number }>;
  priorityCounts: Array<{ label: string; count: number; percentage: number }>;
  channelCounts: Array<{ label: string; count: number; percentage: number }>;
  topTerms: Array<{ term: string; count: number }>;
  privacyWarnings: string[];
};

const DEFAULT_HEADERS = ['id', 'title', 'category', 'priority', 'channel', 'createdDate', 'description'];
const STOP_WORDS = new Set([
  'the',
  'and',
  'for',
  'with',
  'that',
  'this',
  'from',
  'have',
  'has',
  'not',
  'but',
  'are',
  'was',
  'were',
  'user',
  'staff',
  'student',
  'teacher',
  'please',
  'issue',
  'problem',
  'ticket',
  'needs',
  'need',
  'cannot',
  'cant',
  'can'
]);

function normaliseHeader(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function parseCsvLine(line: string) {
  const cells: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && next === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      cells.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
}

function parseCsvRows(csv: string) {
  const rows: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];
    const next = csv[index + 1];

    if (char === '"' && next === '"') {
      current += '""';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (current.trim()) rows.push(current);
      current = '';
      if (char === '\r' && next === '\n') index += 1;
      continue;
    }

    current += char;
  }

  if (current.trim()) rows.push(current);
  return rows.map(parseCsvLine);
}

function pick(row: Record<string, string>, aliases: string[], fallback = '') {
  for (const alias of aliases) {
    const value = row[normaliseHeader(alias)];
    if (value) return value;
  }
  return fallback;
}

function countBy(tickets: SyntheticTicketRecord[], field: keyof SyntheticTicketRecord) {
  const counts = new Map<string, number>();

  tickets.forEach((ticket) => {
    const label = String(ticket[field] || 'Unspecified').trim() || 'Unspecified';
    counts.set(label, (counts.get(label) || 0) + 1);
  });

  return Array.from(counts.entries())
    .map(([label, count]) => ({
      label,
      count,
      percentage: tickets.length ? Math.round((count / tickets.length) * 1000) / 10 : 0
    }))
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label));
}

function extractTopTerms(tickets: SyntheticTicketRecord[]) {
  const counts = new Map<string, number>();
  const text = tickets.map((ticket) => `${ticket.title} ${ticket.description} ${ticket.category}`).join(' ');
  const words = text.toLowerCase().match(/[a-z][a-z0-9-]{2,}/g) || [];

  words.forEach((word) => {
    if (STOP_WORDS.has(word)) return;
    counts.set(word, (counts.get(word) || 0) + 1);
  });

  return Array.from(counts.entries())
    .map(([term, count]) => ({ term, count }))
    .sort((left, right) => right.count - left.count || left.term.localeCompare(right.term))
    .slice(0, 12);
}

function getPrivacyWarnings(csv: string, tickets: SyntheticTicketRecord[]) {
  const warnings: string[] = [];

  if (/@[a-z0-9.-]+\.[a-z]{2,}/i.test(csv)) {
    warnings.push('Email-like values detected. Use synthetic or anonymised rows only.');
  }

  if (/\b(?:\+?61|0)[2-478](?:[ -]?\d){8}\b/.test(csv)) {
    warnings.push('Phone-number-like values detected. Remove live contact details before importing.');
  }

  if (/\b(?:\d{1,3}\.){3}\d{1,3}\b/.test(csv)) {
    warnings.push('IP-address-like values detected. Replace internal addresses with safe examples.');
  }

  if (tickets.some((ticket) => /\b[A-Z][a-z]+ [A-Z][a-z]+\b/.test(`${ticket.title} ${ticket.description}`))) {
    warnings.push('Possible full names detected. Synthetic summaries should avoid identifying people.');
  }

  if (!warnings.length) {
    warnings.push('No obvious live identifiers detected, but still review the source before sharing.');
  }

  return warnings;
}

export function parseSyntheticTicketCsv(csv: string): SyntheticTicketImportSummary {
  const rows = parseCsvRows(csv);

  if (!rows.length) {
    return {
      tickets: [],
      totalTickets: 0,
      categoryCounts: [],
      priorityCounts: [],
      channelCounts: [],
      topTerms: [],
      privacyWarnings: ['No CSV rows were found. Paste synthetic ticket data to begin.']
    };
  }

  const firstRow = rows[0];
  const hasHeader = firstRow.some((cell) => ['title', 'summary', 'category', 'priority', 'description'].includes(normaliseHeader(cell)));
  const headers = hasHeader ? firstRow.map(normaliseHeader) : DEFAULT_HEADERS.map(normaliseHeader);
  const dataRows = hasHeader ? rows.slice(1) : rows;

  const tickets = dataRows
    .map((cells, index) => {
      const row = headers.reduce<Record<string, string>>((record, header, cellIndex) => {
        record[header] = cells[cellIndex] || '';
        return record;
      }, {});

      const id = pick(row, ['id', 'key', 'ticket', 'ticketId'], `SYN-${String(index + 1).padStart(3, '0')}`);
      const title = pick(row, ['title', 'summary', 'subject'], 'Untitled synthetic ticket');
      const description = pick(row, ['description', 'details', 'notes', 'body'], '');

      return {
        id,
        title,
        category: pick(row, ['category', 'theme', 'type', 'requestType'], 'Uncategorised'),
        priority: pick(row, ['priority', 'urgency', 'impact'], 'Normal'),
        channel: pick(row, ['channel', 'source', 'requestChannel'], 'Unknown'),
        createdDate: pick(row, ['createdDate', 'created', 'date', 'opened'], ''),
        description
      };
    })
    .filter((ticket) => ticket.title !== 'Untitled synthetic ticket' || ticket.description || ticket.category !== 'Uncategorised');

  return {
    tickets,
    totalTickets: tickets.length,
    categoryCounts: countBy(tickets, 'category'),
    priorityCounts: countBy(tickets, 'priority'),
    channelCounts: countBy(tickets, 'channel'),
    topTerms: extractTopTerms(tickets),
    privacyWarnings: getPrivacyWarnings(csv, tickets)
  };
}
