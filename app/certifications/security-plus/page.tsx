"use client";

import CertificationPathwayClient from '../../../src/components/certifications/CertificationPathwayClient';
import { certificationPathwayRegistry } from '../../../src/data/certificationPathways';

const pathway = certificationPathwayRegistry['security-plus'];

export default function SecurityPlusPage() {
  return (
    <CertificationPathwayClient
      certificationId="comptia-security-plus-sy0-701"
      certificationTitle="CompTIA Security+ SY0-701"
      pageTitle={pathway.pageTitle}
      pageDescription={pathway.pageDescription}
      sections={pathway.sections}
      lessons={pathway.lessons}
      coreResources={pathway.coreResources}
      stats={pathway.stats}
    />
  );
}
