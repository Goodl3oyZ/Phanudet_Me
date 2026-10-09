import { Box, Cpu, HardDrive, Layers, Server, Terminal, Zap } from "lucide-react";

export function ProxmoxVisual() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-surface p-4 text-xs font-sans">
      <div className="flex items-center justify-between text-[11px] font-semibold text-ink-muted">
        <span className="flex items-center gap-1.5">
          <Server className="h-3.5 w-3.5 text-slate-700" /> Physical Host
        </span>
        <span className="rounded bg-slate-200/70 px-1.5 py-0.5 text-[10px] text-slate-700">
          Proxmox VE
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-line bg-white p-2.5">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
            <Layers className="h-3.5 w-3.5 text-emerald-700" />
            <span>Linux Guest VMs</span>
          </div>
          <p className="mt-1 text-[10.5px] text-ink-muted">Isolated OS & Workloads</p>
          <div className="mt-2 flex gap-1">
            <span className="rounded bg-slate-100 px-1 py-0.5 text-[9px] font-medium text-slate-600">
              Snapshot
            </span>
            <span className="rounded bg-slate-100 px-1 py-0.5 text-[9px] font-medium text-slate-600">
              Rollback
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-line bg-white p-2.5">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
            <Box className="h-3.5 w-3.5 text-blue-700" />
            <span>LXC Containers</span>
          </div>
          <p className="mt-1 text-[10.5px] text-ink-muted">Lightweight Services</p>
          <div className="mt-2 flex gap-1">
            <span className="rounded bg-slate-100 px-1 py-0.5 text-[9px] font-medium text-slate-600">
              Fast Boot
            </span>
            <span className="rounded bg-slate-100 px-1 py-0.5 text-[9px] font-medium text-slate-600">
              Shared Kernel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DockerVisual() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-surface p-4 text-xs font-sans">
      <div className="flex items-center justify-between text-[11px] font-semibold text-ink-muted">
        <span className="flex items-center gap-1.5">
          <Box className="h-3.5 w-3.5 text-blue-700" /> Docker Compose Stack
        </span>
        <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] text-blue-800">
          Private Network
        </span>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        <div className="flex flex-col items-center rounded-lg border border-line bg-white p-2 text-center">
          <Server className="h-3.5 w-3.5 text-slate-700" />
          <span className="mt-1 text-[10px] font-semibold text-slate-800">API</span>
          <span className="text-[9px] text-ink-muted">Express</span>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-line bg-white p-2 text-center">
          <Zap className="h-3.5 w-3.5 text-amber-600" />
          <span className="mt-1 text-[10px] font-semibold text-slate-800">Redis</span>
          <span className="text-[9px] text-ink-muted">Session</span>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-line bg-white p-2 text-center">
          <HardDrive className="h-3.5 w-3.5 text-indigo-600" />
          <span className="mt-1 text-[10px] font-semibold text-slate-800">Postgres</span>
          <span className="text-[9px] text-ink-muted">SQL DB</span>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-line bg-white p-2 text-center">
          <Box className="h-3.5 w-3.5 text-emerald-600" />
          <span className="mt-1 text-[10px] font-semibold text-slate-800">MinIO</span>
          <span className="text-[9px] text-ink-muted">S3 Store</span>
        </div>
      </div>
    </div>
  );
}

export function LocalAIVisual() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-surface p-4 text-xs font-sans">
      <div className="flex items-center justify-between text-[11px] font-semibold text-ink-muted">
        <span className="flex items-center gap-1.5">
          <Cpu className="h-3.5 w-3.5 text-purple-700" /> Local Model Serving
        </span>
        <span className="rounded bg-purple-100 px-1.5 py-0.5 text-[10px] text-purple-800">
          Ollama Engine
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-line bg-white p-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            UI & API
          </span>
          <p className="mt-0.5 font-semibold text-slate-800">Open WebUI</p>
          <span className="mt-1 inline-block text-[9.5px] text-ink-muted">
            Local prompt interface
          </span>
        </div>
        <div className="rounded-lg border border-line bg-white p-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Resource Allocation
          </span>
          <p className="mt-0.5 font-semibold text-slate-800">VRAM & GGUF</p>
          <span className="mt-1 inline-block text-[9.5px] text-ink-muted">
            Bounded memory load
          </span>
        </div>
      </div>
    </div>
  );
}

export function LinuxTroubleshootingVisual() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-[11px] text-slate-200 shadow-inner">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[10px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <Terminal className="h-3 w-3 text-emerald-400" /> lab-node:~#
        </span>
        <span className="text-emerald-400">journalctl & systemd</span>
      </div>
      <div className="mt-2.5 space-y-1.5">
        <div className="flex items-start gap-2">
          <span className="text-slate-500">$</span>
          <span>systemctl status nginx --no-pager</span>
        </div>
        <div className="pl-4 text-[10px] text-amber-400">
          ● Active: active (running) since lab boot
        </div>
        <div className="flex items-start gap-2">
          <span className="text-slate-500">$</span>
          <span>ss -tulpn | grep :8080</span>
        </div>
        <div className="pl-4 text-[10px] text-slate-300">
          LISTEN 0 128 127.0.0.1:8080 (app-service)
        </div>
      </div>
    </div>
  );
}
