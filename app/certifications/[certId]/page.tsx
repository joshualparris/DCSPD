"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { certificationExpansion } from '../../../src/data/certificationExpansion';

const FULL_PATHWAY_ROUTES: Record<string, string> = {
  'aplus-core-1': '/certifications/aplus-core-1',
  'network-plus': '/certifications/network-plus',
  'security-plus': '/certifications/security-plus'
};

export default function CertificationRoutePage({ params }: { params: Promise<{ certId: string }> }) {
  const router = useRouter();
  const [certId, setCertId] = useState<string | undefined>(undefined);

  useEffect(() => {
    params.then((resolved) => {
      const id = resolved.certId;
      setCertId(id);
      const fullRoute = FULL_PATHWAY_ROUTES[id];
      if (fullRoute) {
        router.replace(fullRoute);
      }
    });
  }, [params, router]);

  const cert = certificationExpansion.find((item) => item.id === certId);

  if (!certId) {
    return <div className="p-8 text-slate-500">Loading certification...</div>;
  }

  if (FULL_PATHWAY_ROUTES[certId]) {
    return <div className="p-8 text-slate-500">Opening full pathway...</div>;
  }

  if (!cert) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Certification Not Found</h1>
        <Link href="/" className="text-blue-600 underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Link href="/" className="text-sm text-slate-600 underline">
        Back to Dashboard
      </Link>
      <h1 className="mt-4 text-2xl font-bold">{cert.title}</h1>
      <p className="mt-2 text-slate-600">This certification route is not configured yet.</p>
    </div>
  );
}
