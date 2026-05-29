"use client";

import CertificationPathwayClient from '../../../src/components/certifications/CertificationPathwayClient';
import { certificationPathwayRegistry } from '../../../src/data/certificationPathways';

const pathway = certificationPathwayRegistry['network-plus'];

export default function NetworkPlusPage() {
  return (
    <CertificationPathwayClient
      certificationId="comptia-network-plus-n10-009"
      certificationTitle="CompTIA Network+ N10-009"
      pageTitle={pathway.pageTitle}
      pageDescription={pathway.pageDescription}
      sections={pathway.sections}
      lessons={pathway.lessons}
      coreResources={pathway.coreResources}
      stats={pathway.stats}
    />
  );
}
