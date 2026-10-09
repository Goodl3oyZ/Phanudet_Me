import type { LabExperiment } from "@/content/types";

export const labExperiments: LabExperiment[] = [
  {
    slug: "proxmox-homelab",
    title: "Proxmox lab on reused hardware",
    category: "VIRTUALIZATION & HYPERVISOR",
    summary:
      "Turned a reused PC into a Proxmox VE host to isolate workloads, snapshot state, and rebuild virtual machines without risking the main workstation OS.",
    engineeringFocus:
      "Hypervisor isolation and disposable guest environments on physical hardware.",
    technologies: [
      "Proxmox VE",
      "Linux",
      "KVM / LXC",
      "ZFS Storage",
      "Local Networking",
    ],
    objective:
      "Turn an old PC into a virtualization host so guests and containers can be created, snapshotted, and rebuilt without treating the physical box as a single-purpose workstation.",
    architecture:
      "Physical host → Proxmox VE → Linux virtual machines and container workloads. Management stays on the lab network. Public IPs, cluster names, and admin URLs are not published.",
    components: [
      "Reused physical PC",
      "Proxmox VE",
      "Linux guest environments",
      "Storage on local disks",
    ],
    configuration: [
      "Hypervisor installed on the rebuilt host.",
      "Guests isolated from each other rather than running every experiment on the host OS.",
      "No WAN administration interface is documented here.",
    ],
    constraints: [
      "Hardware is whatever the reused PC provides: CPU, RAM, disks, and optional GPU.",
      "A lab host is a single point of failure unless backups exist.",
    ],
    verification: [
      "Guests boot and can be restarted independently of the host desktop session.",
      "Failed experiments can be discarded by restoring or recreating a guest.",
    ],
    limitations: [
      "This is a personal learning lab, not a documented high-availability cluster.",
      "Performance numbers are omitted; they were not captured as reproducible benchmarks.",
    ],
    evidence: [
      "Described in the résumé HomeLab accomplishment as a rebuilt PC used to learn Proxmox, VMs, containers, and self-hosted services.",
    ],
  },
  {
    slug: "docker-services",
    title: "Dockerized self-hosted services",
    category: "CONTAINERIZATION & COMPOSE",
    summary:
      "Configured application stacks as Compose services so databases, caches, object storage, and APIs communicate over named private networks.",
    engineeringFocus:
      "Declarative multi-container stacks and clean service teardown.",
    technologies: ["Docker", "Docker Compose", "PostgreSQL", "Redis", "MinIO"],
    objective:
      "Run application stacks as Compose services so databases, caches, object storage, and app processes can be started together and torn down cleanly.",
    architecture:
      "Compose project defines named services on a private Docker network. Applications reach dependencies by service hostname, not by developer localhost assumptions.",
    components: ["Docker", "Docker Compose", "Application containers", "Datastore containers"],
    configuration: [
      "Services declared in Compose files with explicit ports for the host when needed.",
      "Environment files kept out of git; examples stay credential-free.",
    ],
    constraints: [
      "Bind-mounts and published ports increase the host attack surface if left open.",
      "Images must not contain secrets from local .env files.",
    ],
    verification: [
      "A stack is considered working when containers start and the application health or homepage responds locally.",
      "The e-commerce project’s Compose file is a concrete example of API, frontend, PostgreSQL, Redis, and MinIO running together.",
    ],
    limitations: [
      "Compose on one machine is not Kubernetes and is not claimed as production orchestration.",
    ],
    evidence: [
      "WebEcommerce backend Compose configuration in the local project tree.",
      "Docker listed as a core infrastructure skill on the résumé.",
    ],
  },
  {
    slug: "local-ai",
    title: "Local AI workload experiments",
    category: "LOCAL AI & LLM WORKLOADS",
    summary:
      "Ran open-weights LLMs and web interfaces locally to study how GPU VRAM, system RAM, CPU threads, and disk storage constrain inference concurrency.",
    engineeringFocus:
      "Hardware resource bounds and VRAM allocation for local model serving.",
    technologies: ["Ollama", "Open WebUI", "GGUF Quantization", "Linux GPU Runtime", "Local Inference"],
    objective:
      "Run language-model interfaces locally to see how GPU, VRAM, CPU, RAM, and storage constrain context length, concurrency, and model choice.",
    architecture:
      "Model runtime and a local web UI on the lab host or a guest. Requests stay on the lab network. No public inference endpoint is advertised.",
    components: ["Ollama", "Open WebUI", "Host CPU/RAM", "Optional GPU and VRAM"],
    configuration: [
      "Models pulled and served locally rather than through a paid API for these experiments.",
      "UI and runtime kept off the public internet in the documentation of this lab.",
    ],
    constraints: [
      "VRAM size dominates which models can load.",
      "Disk space matters once multiple GGUF or equivalent artifacts are stored.",
      "A laptop-class or reused desktop GPU will not match datacenter inference hardware.",
    ],
    verification: [
      "A successful experiment is a model that loads and answers a prompt in the local UI.",
      "Failed loads (out of memory, missing GPU libraries) are treated as useful evidence of resource limits.",
    ],
    limitations: [
      "No tokens/second charts or quality scores are published here.",
      "RAG and vector-database tools appear on the résumé skill list; they are not documented as a measured production retrieval system on this page.",
    ],
    evidence: [
      "Résumé HomeLab text on local AI and hardware interaction.",
      "Toolkit entries for Ollama and Open WebUI.",
    ],
  },
  {
    slug: "linux-troubleshooting",
    title: "Linux troubleshooting practice",
    category: "SYSTEMS DIAGNOSTICS & LOGS",
    summary:
      "Diagnosed service failures directly with system logs, process state, and network socket tools rather than relying on vendor APM dashboards.",
    engineeringFocus:
      "Structured log analysis, systemd unit checks, and network proxy troubleshooting.",
    technologies: ["Linux CLI", "systemd", "Journald / Dozzle", "Nginx", "Network Sockets"],
    objective:
      "Use Linux as the default environment for services so failures are diagnosed with logs, process state, and network basics instead of opaque vendor dashboards.",
    architecture:
      "Linux guests and containers emit logs locally. Optional tools from the skill list (Dozzle for container logs, Grafana for metrics) may be used while learning, but this page does not present a live monitoring product.",
    components: ["Linux", "systemd or container logs", "Nginx as a reverse proxy where used"],
    configuration: [
      "Prefer inspecting logs and unit/container status before changing application code.",
      "Keep firewall and published-port changes explicit.",
    ],
    constraints: [
      "Without centralized logging, evidence disappears after a container is removed.",
      "A reverse proxy misconfiguration can look like an application bug.",
    ],
    verification: [
      "A troubleshooting note is complete when the symptom, the check performed, and the change are written down.",
      "This portfolio does not display fabricated live graphs.",
    ],
    limitations: [
      "Case studies remain qualitative until a specific incident write-up is added.",
    ],
    evidence: [
      "Linux Essential certification (Cisco, 2025) and Linux listed in infrastructure skills.",
    ],
  },
];
