"use client";

import CertificationPathwayClient from '../../../src/components/certifications/CertificationPathwayClient';
import { certificationPathwayRegistry } from '../../../src/data/certificationPathways';

const pathway = certificationPathwayRegistry['aplus-core-1'];

export default function AplusCore1Page() {
  return (
    <CertificationPathwayClient
      certificationId="comptia-aplus-220-1201-core-1"
      certificationTitle="CompTIA A+ 220-1201 Core 1"
      pageTitle={pathway.pageTitle}
      pageDescription={pathway.pageDescription}
      sections={pathway.sections}
      lessons={pathway.lessons}
      coreResources={pathway.coreResources}
      stats={pathway.stats}
    />
  );
}
