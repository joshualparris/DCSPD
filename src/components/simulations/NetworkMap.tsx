"use client";

import { useState } from 'react';
import { initialNetworkNodes, dcsVlans, NetworkNode } from '../../data/networkSim';

export default function NetworkMap() {
  const [nodes] = useState<NetworkNode[]>(initialNetworkNodes);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [pingTargetId, setPingTargetId] = useState<string | null>(null);
  const [pingResult, setPingResult] = useState<{ success: boolean; log: string[] } | null>(null);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  const pingTarget = nodes.find(n => n.id === pingTargetId);

  function handleNodeClick(nodeId: string) {
    if (selectedNodeId && selectedNodeId !== nodeId) {
      setPingTargetId(nodeId);
      runPing(selectedNodeId, nodeId);
    } else {
      setSelectedNodeId(nodeId);
      setPingTargetId(null);
      setPingResult(null);
    }
  }

  function runPing(fromId: string, toId: string) {
    const from = nodes.find(n => n.id === fromId);
    const to = nodes.find(n => n.id === toId);
    if (!from || !to) return;

    const log: string[] = [];
    log.push(`Pinging ${to.label} [${to.ip || 'no-ip'}] from ${from.label}...`);

    let success = true;
    if (from.status !== 'online' || to.status !== 'online') {
      success = false;
      log.push('Destination host unreachable (one or more nodes offline).');
    } else if (from.vlan === 99 || to.vlan === 99) {
      success = false;
      log.push('Request timed out. (Guest VLAN isolation in effect)');
    } else {
      log.push(`Reply from ${to.ip}: bytes=32 time<1ms TTL=64`);
      log.push(`Reply from ${to.ip}: bytes=32 time<1ms TTL=64`);
    }

    setPingResult({ success, log });
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="relative flex-1 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-inner min-h-[500px]">
        <div className="absolute top-4 left-6 text-xs font-bold uppercase tracking-widest text-slate-400">
          Interactive DCS Network Topology
        </div>
        
        <svg width="100%" height="100%" viewBox="0 0 800 500" className="cursor-crosshair">
          {/* Connections */}
          {nodes.map(node => (
            node.connections.map(connId => {
              const target = nodes.find(n => n.id === connId);
              if (!target) return null;
              return (
                <line
                  key={`${node.id}-${connId}`}
                  x1={node.x} y1={node.y}
                  x2={target.x} y2={target.y}
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  strokeDasharray={node.vlan === 99 || target.vlan === 99 ? "4" : "0"}
                />
              );
            })
          ))}

          {/* Nodes */}
          {nodes.map(node => (
            <g 
              key={node.id} 
              transform={`translate(${node.x},${node.y})`}
              onClick={() => handleNodeClick(node.id)}
              className="cursor-pointer group"
            >
              <circle
                r="24"
                fill={selectedNodeId === node.id ? "#0f172a" : pingTargetId === node.id ? "#6366f1" : "white"}
                stroke={selectedNodeId === node.id ? "#0f172a" : "#cbd5e1"}
                strokeWidth="2"
                className="transition-colors duration-200 group-hover:stroke-slate-900"
              />
              <text
                y="40"
                textAnchor="middle"
                className="text-[10px] font-bold uppercase tracking-wider fill-slate-500 group-hover:fill-slate-900"
              >
                {node.label}
              </text>
              {node.type === 'router' && (
                <path d="M-8,-8 L8,8 M-8,8 L8,-8" stroke={selectedNodeId === node.id ? "white" : "#64748b"} strokeWidth="2" />
              )}
              {node.type === 'switch' && (
                <rect x="-8" y="-8" width="16" height="16" fill={selectedNodeId === node.id ? "white" : "#94a3b8"} rx="2" />
              )}
              {node.type === 'device' && (
                <circle r="6" fill={selectedNodeId === node.id ? "white" : "#cbd5e1"} />
              )}
            </g>
          ))}
        </svg>

        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
          {dcsVlans.map(vlan => (
            <div key={vlan.id} className="rounded-full bg-white/80 border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-500">
              VLAN {vlan.id}: {vlan.name}
            </div>
          ))}
        </div>
      </div>

      <aside className="w-full lg:w-80 space-y-4">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Node Inspector</h3>
          {selectedNode ? (
            <div className="mt-4 space-y-3">
              <div>
                <div className="text-xs text-slate-400 font-medium">Device</div>
                <div className="text-lg font-semibold text-slate-900">{selectedNode.label}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-400 font-medium">IP Address</div>
                  <div className="text-sm font-mono text-slate-700">{selectedNode.ip || 'DHCP'}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">VLAN</div>
                  <div className="text-sm font-mono text-slate-700">{selectedNode.vlan || 'Trunk'}</div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 leading-relaxed italic">
                  Tip: Click another node to attempt a &quot;ping&quot; simulation from this device.
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500 italic">Select a node on the map to inspect details.</p>
          )}
        </div>

        {pingResult && (
          <div className={`rounded-[2rem] border p-6 shadow-sm ${pingResult.success ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'}`}>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Terminal Output</h3>
            <div className="mt-4 font-mono text-[11px] space-y-1">
              {pingResult.log.map((line, i) => (
                <div key={i} className={pingResult.success ? 'text-emerald-800' : 'text-rose-800'}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
