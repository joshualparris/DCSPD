"use client";

import NetworkMap from '../../../src/components/simulations/NetworkMap';
import Link from 'next/link';

export default function NetworkSimulationPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Interactive Simulation</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            DCS Network Topology Map
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Visualize the school&apos;s logical network structure. Practice identifying VLAN boundaries, gateway routing, and troubleshooting connectivity issues without touching live equipment.
          </p>
        </div>
      </section>

      <NetworkMap />

      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Simulation Scenarios</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-6 border border-slate-100">
            <h3 className="font-bold text-slate-900">1. Guest Isolation Test</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Verify that devices on the **Guest VLAN (99)** cannot ping the **Domain Controller** or any other internal infrastructure. 
            </p>
            <div className="mt-4 text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Learning Goal: VLAN Segmentation</div>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6 border border-slate-100">
            <h3 className="font-bold text-slate-900">2. Printer Accessibility</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Confirm that **Admin PC 1 (VLAN 10)** can reach the **Admin Printer (VLAN 30)**. This requires inter-VLAN routing through the Core Gateway.
            </p>
            <div className="mt-4 text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Learning Goal: Inter-VLAN Routing</div>
          </div>
        </div>
      </section>

      <div className="flex justify-center pb-8">
        <Link 
          href="/scenarios"
          className="rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Return to Scenario Lab
        </Link>
      </div>
    </div>
  );
}
