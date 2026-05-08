"use client";

import { useMemo, useState } from 'react';
import { classroomFaultDrills, classroomHotspots } from '../../../src/data/virtualClassroom';

export default function ClassroomDeskSimulationPage() {
  const [selectedHotspotId, setSelectedHotspotId] = useState(classroomHotspots[0].id);
  const [selectedDrillId, setSelectedDrillId] = useState(classroomFaultDrills[0].id);
  const [checkedHotspots, setCheckedHotspots] = useState<Record<string, boolean>>({});
  const selectedHotspot = classroomHotspots.find((hotspot) => hotspot.id === selectedHotspotId) || classroomHotspots[0];
  const selectedDrill = classroomFaultDrills.find((drill) => drill.id === selectedDrillId) || classroomFaultDrills[0];
  const selectedCorrectCount = useMemo(
    () => selectedDrill.correctHotspots.filter((id) => checkedHotspots[id]).length,
    [checkedHotspots, selectedDrill]
  );

  function toggleCheck(id: string) {
    setCheckedHotspots((current) => ({
      ...current,
      [id]: !current[id]
    }));
  }

  function changeDrill(id: string) {
    setSelectedDrillId(id);
    setCheckedHotspots({});
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Virtual classroom desk</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            Cable, display, audio, and Wi-Fi troubleshooting simulation
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Practise choosing safe first checks before changing settings. This uses a synthetic classroom layout and
            avoids real room names, asset tags, or internal network details.
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="relative h-[520px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
            <div className="absolute left-[6%] top-[8%] h-[84%] w-[88%] rounded-[2rem] border-4 border-slate-300 bg-white" />
            <div className="absolute left-[56%] top-[15%] h-[40%] w-[40%] rounded-2xl bg-slate-800" />
            <div className="absolute left-[9%] top-[58%] h-[25%] w-[47%] rounded-2xl bg-amber-100" />
            <div className="absolute left-[12%] top-[18%] h-[8%] w-[22%] rounded-full bg-blue-100" />
            {classroomHotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                type="button"
                onClick={() => setSelectedHotspotId(hotspot.id)}
                className={`absolute rounded-2xl border-2 px-2 py-1 text-xs font-semibold shadow-sm transition ${
                  selectedHotspot.id === hotspot.id
                    ? 'border-blue-700 bg-blue-600 text-white'
                    : checkedHotspots[hotspot.id]
                      ? 'border-emerald-600 bg-emerald-100 text-emerald-900'
                      : 'border-slate-400 bg-white text-slate-800'
                }`}
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  width: `${hotspot.width}%`,
                  height: `${hotspot.height}%`
                }}
              >
                {hotspot.label}
              </button>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Fault drill</h2>
            <select
              value={selectedDrillId}
              onChange={(event) => changeDrill(event.target.value)}
              className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            >
              {classroomFaultDrills.map((drill) => (
                <option key={drill.id} value={drill.id}>
                  {drill.title}
                </option>
              ))}
            </select>
            <p className="mt-4 text-sm leading-6 text-slate-600">{selectedDrill.symptom}</p>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
              Useful checks selected:{' '}
              <span className="font-semibold text-slate-900">
                {selectedCorrectCount}/{selectedDrill.correctHotspots.length}
              </span>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{selectedHotspot.label}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{selectedHotspot.safeCheck}</p>
            <button
              type="button"
              onClick={() => toggleCheck(selectedHotspot.id)}
              className="mt-4 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
            >
              {checkedHotspots[selectedHotspot.id] ? 'Mark unchecked' : 'Mark checked'}
            </button>
            <div className="mt-5 grid gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-900">Likely faults</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
                  {selectedHotspot.likelyFaults.map((fault) => (
                    <li key={fault}>{fault}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">Evidence to record</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
                  {selectedHotspot.evidenceToRecord.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {selectedCorrectCount === selectedDrill.correctHotspots.length ? (
            <section className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-900 shadow-sm">
              <div className="font-semibold">Model answer</div>
              <p className="mt-2">{selectedDrill.modelAnswer}</p>
            </section>
          ) : null}
        </aside>
      </section>
    </div>
  );
}
