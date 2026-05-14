import { describe, expect, it } from 'vitest';
import { quickFixCheatSheets } from '../data/cheatSheets';
import { parseSyntheticTicketCsv } from '../lib/ticketCsvImport';

describe('quick-fix cheat sheets and synthetic ticket import', () => {
  it('keeps printable cheat sheets practical and privacy bounded', () => {
    expect(quickFixCheatSheets.length).toBeGreaterThanOrEqual(5);

    quickFixCheatSheets.forEach((sheet) => {
      expect(sheet.safeFirstChecks.length).toBeGreaterThanOrEqual(4);
      expect(sheet.askFirst.length).toBeGreaterThanOrEqual(3);
      expect(sheet.escalationTriggers.length).toBeGreaterThanOrEqual(3);
      expect(sheet.doNotDo.length).toBeGreaterThanOrEqual(3);
      expect(sheet.ticketTemplate).toContain('[');
      expect(sheet.relatedModuleIds.length).toBeGreaterThan(0);
    });
  });

  it('summarises synthetic ticket CSV rows without needing live Jira data', () => {
    const summary = parseSyntheticTicketCsv(`id,title,category,priority,channel,description
SYN-1,"Printer queue stuck, Follow-Me release missing",Printing,Normal,Walk-up,"Job submitted but did not appear at copier"
SYN-2,ViewBoard no audio,Classroom Tech,High,Phone,"Display works but sound uses laptop output"
SYN-3,Printer toner rubs off,Printing,Normal,Ticket,"Copy and print output both poor"`);

    expect(summary.totalTickets).toBe(3);
    expect(summary.categoryCounts[0]).toMatchObject({ label: 'Printing', count: 2 });
    expect(summary.priorityCounts.some((item) => item.label === 'High')).toBe(true);
    expect(summary.topTerms.some((item) => item.term === 'printer')).toBe(true);
    expect(summary.privacyWarnings.join(' ')).toContain('No obvious live identifiers');
  });

  it('flags likely live identifiers in imported CSV text', () => {
    const summary = parseSyntheticTicketCsv(`title,category,description
Login issue,Identity,"Alex Smith cannot sign in, email alex.smith@example.edu.au, IP 10.1.2.3"`);

    expect(summary.privacyWarnings.some((warning) => warning.includes('Email-like'))).toBe(true);
    expect(summary.privacyWarnings.some((warning) => warning.includes('IP-address-like'))).toBe(true);
    expect(summary.privacyWarnings.some((warning) => warning.includes('Possible full names'))).toBe(true);
  });
});
