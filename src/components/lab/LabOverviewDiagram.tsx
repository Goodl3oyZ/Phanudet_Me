// LabOverviewDiagram component for 5 infrastructure layers

export function LabOverviewDiagram() {
  return (
    <figure className="w-full">
      <div className="overflow-x-auto rounded-2xl border border-line bg-muted/40 p-4 md:p-6">
        <div className="min-w-[50rem]">
          <svg
            role="img"
            aria-label="Lab Infrastructure Layers Overview"
            viewBox="0 0 840 430"
            className="h-auto w-full font-sans"
          >
            <defs>
              <marker
                id="lab-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
              </marker>
            </defs>

            {/* Layer 5: Access & Networking */}
            <g>
              <rect
                x="30"
                y="15"
                width="780"
                height="65"
                rx="10"
                fill="#ffffff"
                stroke="#e2e8f0"
                strokeWidth="1"
              />
              <text
                x="45"
                y="33"
                fill="#64748b"
                fontSize="10"
                fontWeight="700"
                letterSpacing="0.08em"
              >
                5. ACCESS & NETWORKING (PRIVATE LAB BOUNDARY)
              </text>
              <rect x="230" y="40" width="380" height="30" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
              <text
                x="420"
                y="60"
                textAnchor="middle"
                fill="#1e293b"
                fontSize="11"
                fontWeight="600"
              >
                Private Network (No Public WAN Routes) • Nginx Reverse Proxy
              </text>
            </g>

            {/* Connector L5 -> L4 */}
            <path
              d="M 420 80 L 420 100"
              stroke="#64748b"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              fill="none"
              markerEnd="url(#lab-arrow)"
            />

            {/* Layer 4: Application Services */}
            <g>
              <rect
                x="30"
                y="100"
                width="780"
                height="75"
                rx="10"
                fill="#ffffff"
                stroke="#e2e8f0"
                strokeWidth="1"
              />
              <text
                x="45"
                y="118"
                fill="#64748b"
                fontSize="10"
                fontWeight="700"
                letterSpacing="0.08em"
              >
                4. APPLICATION & MODEL SERVICES
              </text>

              {/* Service Box 1 */}
              <rect x="50" y="128" width="340" height="36" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
              <text x="220" y="150" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="600">
                Docker Compose Stacks (API, Postgres, Redis, MinIO)
              </text>

              {/* Service Box 2 */}
              <rect x="450" y="128" width="340" height="36" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
              <text x="620" y="150" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="600">
                Local AI Runtime (Ollama Engine + Open WebUI)
              </text>
            </g>

            {/* Connectors L4 -> L3 */}
            <path
              d="M 220 175 L 220 195"
              stroke="#64748b"
              strokeWidth="1.5"
              fill="none"
              markerEnd="url(#lab-arrow)"
            />
            <path
              d="M 620 175 L 620 195"
              stroke="#64748b"
              strokeWidth="1.5"
              fill="none"
              markerEnd="url(#lab-arrow)"
            />

            {/* Layer 3: Guest Workloads */}
            <g>
              <rect
                x="30"
                y="195"
                width="780"
                height="75"
                rx="10"
                fill="#ffffff"
                stroke="#e2e8f0"
                strokeWidth="1"
              />
              <text
                x="45"
                y="213"
                fill="#64748b"
                fontSize="10"
                fontWeight="700"
                letterSpacing="0.08em"
              >
                3. GUEST WORKLOADS & CONTAINERS
              </text>

              {/* Workload Box 1 */}
              <rect x="50" y="223" width="340" height="36" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
              <text x="220" y="245" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="600">
                Docker Engine Runtime & Named Container Networks
              </text>

              {/* Workload Box 2 */}
              <rect x="450" y="223" width="340" height="36" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
              <text x="620" y="245" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="600">
                Linux Virtual Machines & Snapshot Restores
              </text>
            </g>

            {/* Connectors L3 -> L2 */}
            <path
              d="M 420 270 L 420 290"
              stroke="#64748b"
              strokeWidth="1.5"
              fill="none"
              markerEnd="url(#lab-arrow)"
            />

            {/* Layer 2: Virtualization */}
            <g>
              <rect
                x="30"
                y="290"
                width="780"
                height="65"
                rx="10"
                fill="#ffffff"
                stroke="#e2e8f0"
                strokeWidth="1"
              />
              <text
                x="45"
                y="308"
                fill="#64748b"
                fontSize="10"
                fontWeight="700"
                letterSpacing="0.08em"
              >
                2. VIRTUALIZATION LAYER
              </text>
              <rect x="180" y="315" width="480" height="30" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
              <text
                x="420"
                y="334"
                textAnchor="middle"
                fill="#1e293b"
                fontSize="11"
                fontWeight="600"
              >
                Proxmox VE (Type-1 Bare-Metal Hypervisor & VM Orchestration)
              </text>
            </g>

            {/* Connector L2 -> L1 */}
            <path
              d="M 420 355 L 420 375"
              stroke="#64748b"
              strokeWidth="1.5"
              fill="none"
              markerEnd="url(#lab-arrow)"
            />

            {/* Layer 1: Physical Hardware */}
            <g>
              <rect
                x="30"
                y="375"
                width="780"
                height="45"
                rx="10"
                fill="#1e293b"
                stroke="#0f172a"
                strokeWidth="1"
              />
              <text
                x="45"
                y="392"
                fill="#94a3b8"
                fontSize="9"
                fontWeight="700"
                letterSpacing="0.08em"
              >
                1. PHYSICAL HARDWARE
              </text>
              <text
                x="420"
                y="402"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="11"
                fontWeight="600"
              >
                Reused Workstation Hardware: CPU • RAM • Local Storage Disks • Optional GPU
              </text>
            </g>
          </svg>
        </div>
      </div>
      <figcaption className="mt-2.5 text-center text-xs text-ink-muted">
        Layered architecture of the personal lab: physical host resources feed the Proxmox hypervisor, which isolates guest virtual environments, container stacks, and local AI runtimes on a private local network.
      </figcaption>
    </figure>
  );
}
