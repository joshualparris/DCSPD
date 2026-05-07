"use client";

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { academicBridgeAreas, academicSubjects } from '../../../src/data/academicSubjects';
import type { AcademicSubject, AcademicTrack, DcsBridge } from '../../../src/types/academic';

type RelevanceFilter = 'all' | DcsBridge['relevance'];
type TrackFilter = 'all' | AcademicTrack;

type BridgeItem = {
  subject: AcademicSubject;
  bridge: DcsBridge;
};

const relevanceClasses: Record<DcsBridge['relevance'], string> = {
  high: 'border-red-200 bg-red-50 text-red-800',
  medium: 'border-amber-200 bg-amber-50 text-amber-900',
  low: 'border-emerald-200 bg-emerald-50 text-emerald-800'
};

const relevanceOrder: Record<DcsBridge['relevance'], number> = {
  high: 3,
  medium: 2,
  low: 1
};

function formatLabel(value: string) {
  return value.replace(/-/g, ' ');
}

export default function BridgePage() {
  const [relevanceFilter, setRelevanceFilter] = useState<RelevanceFilter>('all');
  const [trackFilter, setTrackFilter] = useState<TrackFilter>('all');

  const filteredItems = useMemo(() => {
    return academicSubjects.flatMap((subject) =>
      subject.dcsBridges
        .filter((bridge) => relevanceFilter === 'all' || bridge.relevance === relevanceFilter)
        .filter(() => trackFilter === 'all' || subject.track === trackFilter)
        .map((bridge) => ({ subject, bridge }))
    );
  }, [relevanceFilter, trackFilter]);

  const bridgesByArea = useMemo(() => {
    const grouped = Object.fromEntries(academicBridgeAreas.map((area) => [area, [] as BridgeItem[]])) as Record<
      DcsBridge['dcsArea'],
      BridgeItem[]
    >;

    filteredItems.forEach((item) => {
      grouped[item.bridge.dcsArea].push(item);
    });

    Object.values(grouped).forEach((items) => {
      items.sort((left, right) => {
        const relevanceDelta = relevanceOrder[right.bridge.relevance] - relevanceOrder[left.bridge.relevance];
        if (relevanceDelta !== 0) {
          return relevanceDelta;
        }
        return left.subject.code.localeCompare(right.subject.code);
      });
    });

    return grouped;
  }, [filteredItems]);

  const representedSubjects = new Set(filteredItems.map((item) => item.subject.code)).size;
  const practicalOutputs = filteredItems.filter((item) => item.bridge.practicalOutput).length;
  const highRelevanceCount = filteredItems.filter((item) => item.bridge.relevance === 'high').length;
  const moduleLinks = new Set(filteredItems.flatMap((item) => item.bridge.relatedDcsModuleIds)).size;

  return (
    <div className="space-y-6">
      <Link href="/academic-pd" className="inline-flex text-sm font-medium text-blue-700 hover:text-blue-900">
        Back to Academic PD
      </Link>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-4xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">DCS bridge</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            Academic study mapped to practical school IT capability.
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            This view connects each RBC and SMITB subject to the work patterns that matter at Dubbo Christian School:
            support quality, systems thinking, privacy-aware documentation, automation, data, security, cloud, and
            professional communication.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Visible bridges', filteredItems.length],
          ['Subjects represented', representedSubjects],
          ['High relevance', highRelevanceCount],
          ['DCSPrep module links', moduleLinks]
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-2 text-3xl font-semibold text-slate-900">{value}</div>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Track</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {(['all', 'RBC', 'SMITB'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTrackFilter(value)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    trackFilter === value ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  {value === 'all' ? 'All tracks' : value}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">Relevance</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {(['all', 'high', 'medium', 'low'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRelevanceFilter(value)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    relevanceFilter === value ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  {value === 'all' ? 'All relevance' : `${value} relevance`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-6">
        {academicBridgeAreas.map((area) => {
          const areaBridges = bridgesByArea[area] ?? [];

          return (
            <section key={area} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Capability area</div>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">{area}</h2>
                </div>
                <div className="text-sm text-slate-500">
                  {areaBridges.length} {areaBridges.length === 1 ? 'bridge' : 'bridges'}
                </div>
              </div>

              {areaBridges.length === 0 ? (
                <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                  No subjects match the current filters for this capability area.
                </p>
              ) : (
                <div className="mt-5 grid gap-4 xl:grid-cols-2">
                  {areaBridges.map(({ subject, bridge }) => (
                    <div key={`${subject.id}-${bridge.id}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <Link
                            href={`/academic-pd/subjects/${subject.code.toLowerCase()}`}
                            className="text-lg font-semibold text-blue-700 hover:text-blue-900"
                          >
                            {subject.code} - {subject.title}
                          </Link>
                          <p className="mt-1 text-sm text-slate-500">
                            {subject.track} | {subject.provider} | {formatLabel(subject.stream)}
                          </p>
                        </div>
                        <span className={`w-fit rounded-full border px-3 py-1 text-xs font-medium ${relevanceClasses[bridge.relevance]}`}>
                          {bridge.relevance} relevance
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-6 text-slate-700">{bridge.explanation}</p>

                      {bridge.relatedDcsModuleIds.length ? (
                        <div className="mt-4">
                          <div className="text-sm font-semibold text-slate-900">Related DCSPrep modules</div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {bridge.relatedDcsModuleIds.map((moduleId) => (
                              <span key={moduleId} className="rounded-full bg-white px-3 py-1 text-xs text-slate-600">
                                {moduleId}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {bridge.practicalOutput ? (
                        <div className="mt-4 rounded-2xl bg-white p-4">
                          <div className="text-sm font-semibold text-slate-900">Practical output</div>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{bridge.practicalOutput}</p>
                        </div>
                      ) : null}

                      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="text-sm font-semibold text-slate-900">Final challenge</div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{subject.finalChallenge.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Output coverage</div>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900">{practicalOutputs} mapped practical outputs</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Each mapped output should become a privacy-safe artefact: checklist, troubleshooting guide, design note, diagram,
          prototype, dashboard, or reflection that can improve support quality without exposing private operational detail.
        </p>
      </section>
    </div>
  );
}
