import { certificationExpansion } from './certificationExpansion';
import { buildCertificationPathway } from '../lib/buildCertificationPathway';

const core1Meta = certificationExpansion.find((cert) => cert.id === 'aplus-core-1')!;
const networkMeta = certificationExpansion.find((cert) => cert.id === 'network-plus')!;
const securityMeta = certificationExpansion.find((cert) => cert.id === 'security-plus')!;

export const aplusCore1Pathway = buildCertificationPathway({
  certificationId: 'comptia-aplus-220-1201-core-1',
  certificationTitle: 'CompTIA A+ 220-1201 Core 1',
  examCode: '220-1201',
  videoUrlSlug: '220-1201',
  courseIndexUrl:
    'https://www.professormesser.com/free-a-plus-training/220-1201/220-1201-video/220-1201-training-course/',
  examObjectivesUrl:
    'https://partners.comptia.org/docs/default-source/resources/comptia-a-220-1201-exam-objectives-%282-0%29.pdf',
  meta: core1Meta
});

export const networkPlusPathway = buildCertificationPathway({
  certificationId: 'comptia-network-plus-n10-009',
  certificationTitle: 'CompTIA Network+ N10-009',
  examCode: 'N10-009',
  videoUrlSlug: 'n10-009',
  courseIndexUrl: 'https://www.professormesser.com/network-plus/n10-009/n10-009-video-index/',
  examObjectivesUrl: 'https://www.comptia.org/certifications/network',
  meta: networkMeta
});

export const securityPlusPathway = buildCertificationPathway({
  certificationId: 'comptia-security-plus-sy0-701',
  certificationTitle: 'CompTIA Security+ SY0-701',
  examCode: 'SY0-701',
  videoUrlSlug: 'sy0-701',
  courseIndexUrl: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video-index/',
  examObjectivesUrl: 'https://www.comptia.org/certifications/security',
  meta: securityMeta
});

export const certificationPathwayRegistry = {
  'aplus-core-1': {
    routeId: 'aplus-core-1',
    pageTitle: 'Professor Messer A+ 220-1201 Core 1 study and assessment',
    pageDescription:
      'Read each domain topic, open linked resources, connect it to DCS IT work, and submit privacy-safe answers for AI scoring.',
    ...aplusCore1Pathway
  },
  'network-plus': {
    routeId: 'network-plus',
    pageTitle: 'CompTIA Network+ N10-009 study and assessment',
    pageDescription:
      'Domain-based Network+ pathway with read/watch links, MCQ checks, and long-form AI feedback logged to PD evidence.',
    ...networkPlusPathway
  },
  'security-plus': {
    routeId: 'security-plus',
    pageTitle: 'CompTIA Security+ SY0-701 study and assessment',
    pageDescription:
      'Security+ domain pathway focused on safe escalation judgement and privacy-safe synthetic scenarios.',
    ...securityPlusPathway
  }
} as const;

export type CertificationPathwayKey = keyof typeof certificationPathwayRegistry;
