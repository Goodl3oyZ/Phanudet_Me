import type { Architecture, ArchitectureNode } from "@/content/types";
import {
  Box,
  CheckCircle,
  Cpu,
  CreditCard,
  Database,
  FileText,
  GitFork,
  Globe,
  HardDrive,
  Layers,
  RefreshCw,
  Server,
  Sliders,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

function RenderIcon({ name, className = "h-4 w-4" }: { name?: string; className?: string }) {
  switch (name) {
    case "Globe":
      return <Globe className={className} />;
    case "Server":
      return <Server className={className} />;
    case "Database":
      return <Database className={className} />;
    case "Zap":
      return <Zap className={className} />;
    case "HardDrive":
      return <HardDrive className={className} />;
    case "CreditCard":
      return <CreditCard className={className} />;
    case "Cpu":
      return <Cpu className={className} />;
    case "Layers":
      return <Layers className={className} />;
    case "FileText":
      return <FileText className={className} />;
    case "CheckCircle":
      return <CheckCircle className={className} />;
    case "RefreshCw":
      return <RefreshCw className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "Sliders":
      return <Sliders className={className} />;
    case "GitFork":
      return <GitFork className={className} />;
    case "Box":
      return <Box className={className} />;
    case "Terminal":
      return <Terminal className={className} />;
    default:
      return <Server className={className} />;
  }
}

export function ArchitectureDiagram({ architecture }: { architecture: Architecture }) {
  const isEcommerce = architecture.nodes.some((n) => n.id === "omise");

  return (
    <figure className="w-full">
      {/* Mobile view: Accessible grouped list and visual data flow steps */}
      <div className="space-y-6 md:hidden">
        {architecture.layers ? (
          <div className="space-y-4">
            {architecture.layers.map((layer) => {
              const layerNodes = architecture.nodes.filter((n) => n.layerId === layer.id);
              if (layerNodes.length === 0) return null;
              return (
                <div
                  key={layer.id}
                  className="rounded-xl border border-line bg-muted/40 p-4 shadow-xs"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                    {layer.label}
                  </span>
                  <div className="mt-2 space-y-2.5">
                    {layerNodes.map((node) => (
                      <div
                        key={node.id}
                        className="rounded-lg border border-line bg-background p-3"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-surface text-ink">
                            <RenderIcon name={node.icon} className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-ink">{node.label}</p>
                            {node.detail ? (
                              <p className="text-xs text-ink-muted">{node.detail}</p>
                            ) : null}
                          </div>
                        </div>
                        {node.tags && node.tags.length > 0 ? (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {node.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded bg-surface px-1.5 py-0.5 text-[10px] font-medium text-ink-muted"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <ul className="space-y-3">
            {architecture.nodes.map((node) => (
              <li key={node.id} className="rounded-xl border border-line bg-muted p-4">
                <p className="font-medium text-ink">{node.label}</p>
                {node.detail ? <p className="text-sm text-ink-muted">{node.detail}</p> : null}
              </li>
            ))}
          </ul>
        )}

        {architecture.edges.length > 0 ? (
          <div className="rounded-xl border border-line bg-surface p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Data & Control Flow
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              {architecture.edges.map((edge, idx) => {
                const fromNode = architecture.nodes.find((n) => n.id === edge.from);
                const toNode = architecture.nodes.find((n) => n.id === edge.to);
                if (!fromNode || !toNode) return null;
                const isWebhook = edge.type === "webhook" || edge.dashed;

                return (
                  <li
                    key={`${edge.from}-${edge.to}-${idx}`}
                    className="flex flex-col gap-1 rounded-md border border-line/60 bg-background p-2.5"
                  >
                    <div className="flex items-center gap-1.5 font-medium text-ink">
                      <span>{fromNode.label}</span>
                      <span className={isWebhook ? "text-indigo-600" : "text-ink-muted"}>→</span>
                      <span>{toNode.label}</span>
                    </div>
                    {edge.label ? (
                      <span
                        className={`self-start rounded px-1.5 py-0.5 text-[10px] font-medium ${
                          isWebhook
                            ? "border border-indigo-200 bg-indigo-50 text-indigo-700"
                            : "bg-surface text-ink-muted"
                        }`}
                      >
                        {edge.label}
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>

      {/* Desktop / Tablet view: Professional SVG Architecture Diagram */}
      <div
        className="mt-4 hidden min-w-0 max-w-full overflow-x-auto rounded-2xl border border-line bg-muted/30 p-4 md:block"
        tabIndex={0}
        role="region"
        aria-label="Architecture diagram"
      >
        {isEcommerce ? (
          <EcommerceDiagramSVG architecture={architecture} />
        ) : (
          <GenericLayeredDiagramSVG architecture={architecture} />
        )}
      </div>

      <figcaption className="mt-3 text-sm text-ink-muted">{architecture.caption}</figcaption>
    </figure>
  );
}

function EcommerceDiagramSVG({ architecture }: { architecture: Architecture }) {
  const getNode = (id: string): ArchitectureNode =>
    architecture.nodes.find((n) => n.id === id) || { id, label: id };

  const browser = getNode("browser");
  const api = getNode("api");
  const omise = getNode("omise");
  const db = getNode("db");
  const redis = getNode("redis");
  const minio = getNode("minio");

  return (
    <svg
      role="img"
      aria-label={architecture.caption}
      viewBox="0 0 840 460"
      className="h-auto w-full min-w-[48rem] max-w-none font-sans"
    >
      <defs>
        <marker
          id="arrow-request"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" />
        </marker>
        <marker
          id="arrow-outbound"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1e293b" />
        </marker>
        <marker
          id="arrow-webhook"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#4f46e5" />
        </marker>
      </defs>

      {/* Layer Containers */}
      {/* 1. Client Layer */}
      <g>
        <rect
          x="30"
          y="20"
          width="490"
          height="85"
          rx="12"
          fill="#f8fafc"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        <text
          x="44"
          y="38"
          fill="#64748b"
          fontSize="10"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          CLIENT LAYER
        </text>
      </g>

      {/* 2. Application Layer */}
      <g>
        <rect
          x="30"
          y="130"
          width="490"
          height="145"
          rx="12"
          fill="#f8fafc"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        <text
          x="44"
          y="148"
          fill="#64748b"
          fontSize="10"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          APPLICATION LAYER
        </text>
      </g>

      {/* 3. External Services */}
      <g>
        <rect
          x="550"
          y="130"
          width="260"
          height="145"
          rx="12"
          fill="#f8fafc"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        <text
          x="564"
          y="148"
          fill="#64748b"
          fontSize="10"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          EXTERNAL SERVICES
        </text>
      </g>

      {/* 4. Data & Infrastructure Layer */}
      <g>
        <rect
          x="30"
          y="305"
          width="780"
          height="135"
          rx="12"
          fill="#f8fafc"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        <text
          x="44"
          y="323"
          fill="#64748b"
          fontSize="10"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          DATA & INFRASTRUCTURE LAYER
        </text>
      </g>

      {/* Orthogonal Connectors */}

      {/* 1. Browser -> Express API */}
      <g>
        <path
          d="M 275 92 L 275 152"
          stroke="#475569"
          strokeWidth="1.75"
          fill="none"
          markerEnd="url(#arrow-request)"
        />
        <rect x="205" y="108" width="140" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1" />
        <text
          x="275"
          y="121"
          textAnchor="middle"
          fill="#334155"
          fontSize="10"
          fontWeight="600"
        >
          REST / HTTPS Requests
        </text>
      </g>

      {/* 2. Express API -> PostgreSQL */}
      <g>
        <path
          d="M 165 255 L 165 338"
          stroke="#475569"
          strokeWidth="1.75"
          fill="none"
          markerEnd="url(#arrow-request)"
        />
        <rect x="110" y="285" width="110" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1" />
        <text
          x="165"
          y="298"
          textAnchor="middle"
          fill="#334155"
          fontSize="10"
          fontWeight="600"
        >
          SQL / Drizzle ORM
        </text>
      </g>

      {/* 3. Express API -> Redis */}
      <g>
        <path
          d="M 275 255 L 275 280 Q 275 285 283 285 L 412 285 Q 420 285 420 290 L 420 338"
          stroke="#475569"
          strokeWidth="1.75"
          fill="none"
          markerEnd="url(#arrow-request)"
        />
        <rect x="290" y="276" width="115" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1" />
        <text
          x="347"
          y="289"
          textAnchor="middle"
          fill="#334155"
          fontSize="10"
          fontWeight="600"
        >
          Sessions & Limits
        </text>
      </g>

      {/* 4. Express API -> MinIO */}
      <g>
        <path
          d="M 385 255 L 385 295 Q 385 300 393 300 L 667 300 Q 675 300 675 305 L 675 338"
          stroke="#475569"
          strokeWidth="1.75"
          fill="none"
          markerEnd="url(#arrow-request)"
        />
        <rect x="480" y="291" width="100" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1" />
        <text
          x="530"
          y="304"
          textAnchor="middle"
          fill="#334155"
          fontSize="10"
          fontWeight="600"
        >
          S3 Object Store
        </text>
      </g>

      {/* 5. Express API -> Omise (Outbound Payment Request) */}
      <g>
        <path
          d="M 405 180 L 570 180"
          stroke="#1e293b"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrow-outbound)"
        />
        <rect x="425" y="163" width="125" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1" />
        <text
          x="487"
          y="176"
          textAnchor="middle"
          fill="#1e293b"
          fontSize="10"
          fontWeight="600"
        >
          Outbound Payment
        </text>
      </g>

      {/* 6. Omise -> Express API (Inbound Webhook Callback) */}
      <g>
        <path
          d="M 570 220 L 405 220"
          stroke="#4f46e5"
          strokeWidth="2"
          strokeDasharray="5 4"
          fill="none"
          markerEnd="url(#arrow-webhook)"
        />
        <rect x="425" y="228" width="125" height="18" rx="4" fill="#eef2ff" stroke="#c7d2fe" />
        <text
          x="487"
          y="241"
          textAnchor="middle"
          fill="#4338ca"
          fontSize="10"
          fontWeight="600"
        >
          Webhook Callback
        </text>
      </g>

      {/* Node Cards */}

      {/* Node: Browser / Next.js */}
      <foreignObject x="145" y="42" width="260" height="50">
        <NodeCard node={browser} />
      </foreignObject>

      {/* Node: Express API */}
      <foreignObject x="145" y="152" width="260" height="103">
        <NodeCard node={api} />
      </foreignObject>

      {/* Node: Omise */}
      <foreignObject x="570" y="160" width="220" height="85">
        <NodeCard node={omise} />
      </foreignObject>

      {/* Node: PostgreSQL */}
      <foreignObject x="50" y="338" width="230" height="85">
        <NodeCard node={db} />
      </foreignObject>

      {/* Node: Redis */}
      <foreignObject x="305" y="338" width="230" height="85">
        <NodeCard node={redis} />
      </foreignObject>

      {/* Node: MinIO */}
      <foreignObject x="560" y="338" width="230" height="85">
        <NodeCard node={minio} />
      </foreignObject>
    </svg>
  );
}

function GenericLayeredDiagramSVG({ architecture }: { architecture: Architecture }) {
  const layers = architecture.layers || [
    { id: "default", label: "Components & Dependencies" },
  ];

  const nodeHeight = 78;
  const layerHeight = 110;
  const totalHeight = Math.max(380, layers.length * layerHeight + 40);

  const layerNodesMap = new Map<string, ArchitectureNode[]>();
  layers.forEach((l) => layerNodesMap.set(l.id, []));

  architecture.nodes.forEach((node) => {
    const layerId = node.layerId && layerNodesMap.has(node.layerId) ? node.layerId : layers[0].id;
    layerNodesMap.get(layerId)?.push(node);
  });

  const nodePositions = new Map<
    string,
    { x: number; y: number; width: number; height: number; cx: number; cy: number }
  >();

  layers.forEach((layer, layerIdx) => {
    const nodes = layerNodesMap.get(layer.id) || [];
    const count = nodes.length;
    if (count === 0) return;

    const layerY = 20 + layerIdx * layerHeight;
    const nodeWidth = count > 3 ? 180 : count === 1 ? 280 : 220;
    const totalNodesWidth = count * nodeWidth;
    const remainingSpace = 780 - totalNodesWidth;
    const gap = Math.max(16, remainingSpace / (count + 1));

    nodes.forEach((node, idx) => {
      const x = 30 + gap + idx * (nodeWidth + gap);
      const y = layerY + 24;
      nodePositions.set(node.id, {
        x,
        y,
        width: nodeWidth,
        height: nodeHeight,
        cx: x + nodeWidth / 2,
        cy: y + nodeHeight / 2,
      });
    });
  });

  return (
    <svg
      role="img"
      aria-label={architecture.caption}
      viewBox={`0 0 840 ${totalHeight}`}
      className="h-auto w-full min-w-[44rem] max-w-none font-sans"
    >
      <defs>
        <marker
          id="arrow-generic"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" />
        </marker>
      </defs>

      {/* Layer Boxes */}
      {layers.map((layer, idx) => {
        const layerY = 20 + idx * layerHeight;
        return (
          <g key={layer.id}>
            <rect
              x="30"
              y={layerY}
              width="780"
              height="95"
              rx="12"
              fill="#f8fafc"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
            <text
              x="44"
              y={layerY + 17}
              fill="#64748b"
              fontSize="10"
              fontWeight="700"
              letterSpacing="0.08em"
            >
              {layer.label.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Orthogonal Edges */}
      {architecture.edges.map((edge, idx) => {
        const fromPos = nodePositions.get(edge.from);
        const toPos = nodePositions.get(edge.to);
        if (!fromPos || !toPos) return null;

        let d = "";
        let labelX = (fromPos.cx + toPos.cx) / 2;
        let labelY = (fromPos.cy + toPos.cy) / 2;

        if (fromPos.cy < toPos.cy) {
          // Top to Bottom
          const x1 = fromPos.cx;
          const y1 = fromPos.y + fromPos.height;
          const x2 = toPos.cx;
          const y2 = toPos.y;
          const midY = (y1 + y2) / 2;

          if (Math.abs(x1 - x2) < 5) {
            d = `M ${x1} ${y1} L ${x2} ${y2}`;
            labelX = x1;
            labelY = midY;
          } else {
            d = `M ${x1} ${y1} L ${x1} ${midY - 4} Q ${x1} ${midY} ${x1 < x2 ? x1 + 4 : x1 - 4} ${midY} L ${x2 < x1 ? x2 + 4 : x2 - 4} ${midY} Q ${x2} ${midY} ${x2} ${midY + 4} L ${x2} ${y2}`;
            labelX = (x1 + x2) / 2;
            labelY = midY;
          }
        } else {
          // Same row or side-by-side
          const x1 = fromPos.x + fromPos.width;
          const y1 = fromPos.cy;
          const x2 = toPos.x;
          const y2 = toPos.cy;
          d = `M ${x1} ${y1} L ${x2} ${y2}`;
          labelX = (x1 + x2) / 2;
          labelY = y1;
        }

        return (
          <g key={`${edge.from}-${edge.to}-${idx}`}>
            <path
              d={d}
              stroke="#475569"
              strokeWidth="1.75"
              fill="none"
              markerEnd="url(#arrow-generic)"
            />
            {edge.label ? (
              <g>
                <rect
                  x={labelX - 45}
                  y={labelY - 9}
                  width="90"
                  height="18"
                  rx="4"
                  fill="#ffffff"
                  stroke="#cbd5e1"
                />
                <text
                  x={labelX}
                  y={labelY + 4}
                  textAnchor="middle"
                  fill="#334155"
                  fontSize="9"
                  fontWeight="600"
                >
                  {edge.label}
                </text>
              </g>
            ) : null}
          </g>
        );
      })}

      {/* Nodes */}
      {architecture.nodes.map((node) => {
        const pos = nodePositions.get(node.id);
        if (!pos) return null;
        return (
          <foreignObject
            key={node.id}
            x={pos.x}
            y={pos.y}
            width={pos.width}
            height={pos.height}
          >
            <NodeCard node={node} />
          </foreignObject>
        );
      })}
    </svg>
  );
}

function NodeCard({ node }: { node: ArchitectureNode }) {
  return (
    <div className="flex h-full w-full flex-col justify-between rounded-xl border border-line bg-white p-2.5 shadow-xs transition-colors hover:border-slate-400">
      <div className="flex items-start gap-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-700">
          <RenderIcon name={node.icon} className="h-3.5 w-3.5" />
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-xs font-bold text-slate-900">{node.label}</p>
          {node.detail ? (
            <p className="truncate text-[10.5px] text-slate-500">{node.detail}</p>
          ) : null}
        </div>
      </div>
      {node.tags && node.tags.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {node.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-slate-100 px-1.5 py-0.5 text-[9.5px] font-medium text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
