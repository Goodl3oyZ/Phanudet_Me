import type { Project } from "@/content/types";

export const projects: Project[] = [
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    category: "Software",
    filters: ["Software", "Infrastructure"],
    featured: true,
    summary:
      "Full-stack store built from scratch and running live: checkout with stock reservation, card (3-D Secure) and PromptPay payments, shipping and tracking, loyalty points, real-time notifications, and an admin CMS — deployed by CI/CD to my HomeLab.",
    role: "Individual builder — designed, implemented, tested, and deployed the frontend, API, data model, and infrastructure.",
    status: "Personal project",
    liveUrl: "https://shop.flukelnwza.online",
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Drizzle ORM",
      "Redis",
      "Socket.IO",
      "Omise",
      "S3 (SeaweedFS)",
      "Docker",
      "GitHub Actions",
      "Cloudflare Tunnel",
      "Jest",
      "Playwright",
    ],
    images: [
      {
        src: "/images/projects/ecommerce-platform/storefront.webp",
        alt: "Storefront home page with a dark hero showing a smartwatch and product highlights",
        width: 1440,
        height: 900,
        caption: "Storefront home page (demo catalog).",
      },
      {
        src: "/images/projects/ecommerce-platform/product.webp",
        alt: "Product page with image gallery, colour and size options, stock status and add to cart",
        width: 1440,
        height: 900,
        caption: "Product page: variants, live stock, VAT and shipping notes.",
      },
      {
        src: "/images/projects/ecommerce-platform/order-tracking.webp",
        alt: "Order page with a four-step timeline, carrier tracking number and a received button",
        width: 1440,
        height: 900,
        caption: "Customer order timeline with carrier tracking and delivery confirmation.",
      },
      {
        src: "/images/projects/ecommerce-platform/admin-shipping.webp",
        alt: "Admin order list with a dialog to choose a carrier and enter a tracking number",
        width: 1440,
        height: 900,
        caption: "Admin: ship an order with carrier and tracking number; the customer is notified.",
      },
      {
        src: "/images/projects/ecommerce-platform/blog.webp",
        alt: "Blog page listing three articles with cover images",
        width: 1440,
        height: 900,
        caption: "Articles and pages written in the admin CMS, rendered on the server.",
      },
    ],
    overview:
      "A full-stack e-commerce platform I built alone to learn how a real store fits together — storefront, API, data, payments, files, background jobs, and deployment — and then took it live. It runs at shop.flukelnwza.online on my own HomeLab behind Cloudflare Tunnel, and every push to main is tested in GitHub Actions and deployed automatically.",
    problem:
      "Commerce looks like CRUD but fails at the seams: two customers buying the last item, a payment that succeeds after the order expired, a webhook that arrives twice, a notification sent for a change that rolled back. The project exists to handle those cases deliberately instead of hoping they never happen.",
    intendedUsers:
      "Shoppers and shop staff (admins, moderators). It runs on a single home server with a demo catalog, so it is a working deployment rather than a business with customer volume.",
    implementation: [
      "Next.js storefront: product search and filters, cart drawer, checkout, order timeline with carrier tracking, reviews, notifications bell, blog and policy pages; Thai UI with light and dark themes.",
      "Express 5 API with Zod validation on every route, role-based access (customer, moderator, admin, super admin), rate limiting, login lockout, and email verification.",
      "PostgreSQL with Drizzle ORM: stock is reserved atomically at checkout (a CHECK constraint keeps it at zero or above) and every change is recorded as an inventory movement.",
      "Payments with Omise: cards with 3-D Secure redirects and PromptPay QR; webhooks re-read the charge from Omise; a background worker expires unpaid orders, reconciles unknown outcomes, and refunds payments that could not be applied.",
      "Order notifications are written in the same transaction as the status change and delivered after commit through PostgreSQL LISTEN/NOTIFY to Socket.IO and email.",
      "Shipping zones by province, admin shipping with carrier and tracking number, customer delivery confirmation, and automatic completion seven days after shipping.",
      "Verified-buyer reviews that award loyalty points once per product (enforced by a partial unique index), coupons, and a points-for-coupons loyalty program.",
      "Admin panel: products and variants, orders, payments and refunds, reports with CSV export, support chat, a content CMS for articles and pages, and store settings including the logo.",
      "Images in S3-compatible storage (SeaweedFS); Docker Compose for production with Caddy, served through Cloudflare Tunnel with no open ports.",
      "CI/CD: GitHub Actions runs the test suite and build, then calls an HMAC-signed deploy webhook; the server deploys that commit, waits for the health check, and rolls back on failure.",
    ],
    architecture: {
      caption:
        "Architecture of the live deployment. Visitors reach Caddy through Cloudflare Tunnel; Caddy routes pages to Next.js and /api to Express. The API uses PostgreSQL, Redis, and S3 storage (SeaweedFS), calls Omise for payments and receives its webhooks, and pushes notifications over Socket.IO.",
      layers: [
        { id: "client", label: "Client Layer" },
        { id: "application", label: "Application Layer" },
        { id: "external", label: "External Services" },
        { id: "data", label: "Data & Infrastructure Layer" },
      ],
      nodes: [
        {
          id: "browser",
          label: "Browser / Next.js Frontend",
          detail: "Storefront & admin, via Cloudflare Tunnel + Caddy",
          layerId: "client",
          icon: "Globe",
          tags: ["App Router", "Socket.IO client"],
        },
        {
          id: "api",
          label: "Express API",
          detail: "REST, auth, payment worker",
          layerId: "application",
          icon: "Server",
          tags: ["Zod DTOs", "Socket.IO", "LISTEN/NOTIFY"],
        },
        {
          id: "omise",
          label: "Omise Gateway",
          detail: "Cards (3-D Secure) & PromptPay",
          layerId: "external",
          icon: "CreditCard",
          tags: ["Charges", "Webhooks"],
        },
        {
          id: "db",
          label: "PostgreSQL",
          detail: "Orders, stock, content",
          layerId: "data",
          icon: "Database",
          tags: ["Drizzle ORM"],
        },
        {
          id: "redis",
          label: "Redis",
          detail: "Sessions & rate limits",
          layerId: "data",
          icon: "Zap",
          tags: ["Lockout", "Idempotency"],
        },
        {
          id: "minio",
          label: "S3 Storage (SeaweedFS)",
          detail: "Object storage",
          layerId: "data",
          icon: "HardDrive",
          tags: ["Product & site images"],
        },
      ],
      edges: [
        { from: "browser", to: "api", label: "HTTPS / WebSocket", type: "request" },
        { from: "api", to: "db", label: "SQL", type: "data" },
        { from: "api", to: "redis", label: "Sessions & limits", type: "data" },
        { from: "api", to: "minio", label: "Objects", type: "data" },
        { from: "api", to: "omise", label: "Charges & refunds", type: "outbound" },
        { from: "omise", to: "api", label: "Webhook", type: "webhook", dashed: true },
      ],
    },
    decisions: [
      {
        title: "Charge after the order commits",
        body: "The order and its stock reservation are committed first, then the card is charged. A lost Omise response is treated as unknown rather than failed, and a worker reconciles it, so money is never taken for an order that rolled back and a customer is never charged twice by a blind retry.",
      },
      {
        title: "Deliver notifications after commit",
        body: "Notifications are inserted in the same transaction as the status change and announced with pg_notify, which PostgreSQL only sends on commit. A listener pushes them to sockets and email, so nothing is delivered for a change that was rolled back.",
      },
      {
        title: "Deploy by signed webhook instead of SSH",
        body: "The server sits behind Cloudflare Tunnel with no inbound ports. GitHub only sends an HMAC-signed request; the server pulls the commit itself, checks it is on main, deploys, and rolls back if the health check fails.",
      },
    ],
    verification: [
      "258 Jest and SuperTest API tests against real PostgreSQL, Redis, and S3 containers, with a coverage gate that every one of the 274 routes is exercised and documented in OpenAPI.",
      "Concurrency tests for overselling and double payment, and a time-zone regression test: tests run in UTC like CI and production.",
      "An end-to-end check against the real Omise API in test mode: card paid and refunded, insufficient funds declined, PromptPay paid through the webhook.",
      "Browser checks with Playwright on desktop and mobile widths, light and dark themes.",
    ],
    limitations: [
      "Runs on a single home server; there is no multi-region failover or managed database.",
      "Carrier tracking links out to the carrier; delivery status is not pulled from carrier APIs yet.",
      "Catalog content is demo data for showing the system, not a commercial product range.",
    ],
    lessons: [
      "Most of the work in commerce is integration and failure handling: payments, webhooks, stock, and time zones, more than product CRUD.",
      "Tests only catch what their environment can reproduce — a bug hidden by my local time zone was caught only once CI ran in UTC.",
      "Shipping a real deployment taught as much as building: secrets, migrations, rollbacks, and OAuth provider reviews all happen outside the code.",
    ],
    evidence: [
      {
        type: "repository",
        label: "WebEcommerce source repository",
        href: "https://github.com/Goodl3oyZ/WebEcommerce",
      },
      {
        type: "documentation",
        label: "Live store — shop.flukelnwza.online",
        href: "https://shop.flukelnwza.online",
      },
    ],
    relatedSlugs: ["homelab", "voice-pc-remote"],
  },
  {
    slug: "voice-pc-remote",
    title: "Voice PC Remote",
    category: "Infrastructure",
    filters: ["Infrastructure", "AI / ML"],
    featured: true,
    summary:
      "Control a Windows PC from a phone with voice commands and local AI: a mobile PWA, a speech-to-text orchestrator on the HomeLab, and an HMAC-authenticated agent on the PC.",
    role: "Individual builder — architecture, orchestrator, PC agent, PWA, evaluation, and deployment.",
    status: "Personal project",
    liveUrl: "https://pc.flukelnwza.online",
    technologies: [
      "Python",
      "FastAPI",
      "faster-whisper",
      "Ollama",
      "Open WebUI",
      "PWA",
      "Docker",
      "Cloudflare Tunnel",
    ],
    images: [
      {
        src: "/images/projects/voice-pc-remote/sign-in.webp",
        alt: "Voice PC Remote sign-in card explaining two-step sign-in with Google and a device secret key",
        width: 1440,
        height: 900,
        caption: "Two-step sign-in: an allowed Google account, then a secret key to pair the device.",
      },
    ],
    overview:
      "A voice remote for my own PC. Speech from a phone is transcribed on the HomeLab, turned into a structured command with a local model, and executed by an agent on the Windows PC. Everything runs on hardware I own; nothing is sent to a cloud speech or LLM service.",
    problem:
      "Remote-control tools usually trade convenience for security or depend on cloud AI. The goal was hands-free control that stays private and refuses commands it cannot verify.",
    intendedUsers: "Personal use. Sign-in is limited to allowed accounts and paired devices.",
    implementation: [
      "Mobile PWA served through Cloudflare Tunnel, installable on the phone's home screen.",
      "PC1 orchestrator (FastAPI) on the HomeLab: speech-to-text with faster-whisper and command interpretation with a local model through Ollama.",
      "PC2 agent on Windows executes commands; requests are signed with an HMAC secret kept in Windows Credential Manager.",
      "Two-step sign-in: Google account allow-list, then a one-time device pairing secret.",
      "Evaluation scripts: golden command tests, red-team prompts, soak tests, a speech-to-text benchmark, and wake-word evaluation.",
    ],
    decisions: [
      {
        title: "Local models instead of cloud APIs",
        body: "Voice and commands stay on my network. The cost is accuracy and latency bounded by my own GPU and model size, which the STT benchmark measures.",
      },
      {
        title: "Sign every command",
        body: "The PC agent only acts on HMAC-signed requests from the orchestrator, so a leaked PWA session alone cannot run commands on the PC.",
      },
    ],
    limitations: [
      "Single-user system tuned for my own PC and voice.",
      "Recognition quality depends on the local model and microphone conditions.",
    ],
    lessons: [
      "Evaluation (golden sets, red-team prompts, soak runs) is what turns a voice demo into something safe to leave running.",
    ],
    relatedSlugs: ["homelab", "ecommerce-platform"],
  },
  {
    slug: "mlp-genetic-fuzzy",
    title: "MLP, Genetic Algorithm, and Fuzzy Logic",
    category: "AI / ML",
    filters: ["AI / ML"],
    featured: true,
    summary:
      "Multilayer perceptron implemented without machine-learning libraries, with backpropagation, genetic algorithms, fuzzy logic, and 10-fold cross-validation on WDBC.",
    role: "Individual implementer of models, training loops, and evaluation procedure.",
    status: "Academic project",
    technologies: ["Python", "From-scratch MLP", "Genetic algorithm", "Fuzzy logic"],
    overview:
      "Academic machine-learning work implementing a multilayer perceptron without machine-learning libraries. Backpropagation, a genetic algorithm, and fuzzy logic were applied to regression and classification problems. Models were evaluated with 10-fold cross-validation. The genetic algorithm was used to optimize MLP weights for breast cancer classification on the WDBC dataset across five network architectures.",
    problem:
      "Library-based model training hides the mechanics of weight updates, evaluation splits, and search. Implementing the network and search methods directly makes those mechanics inspectable.",
    intendedUsers:
      "The work is an academic study of model behavior, not a clinical diagnostic product.",
    implementation: [
      "MLP implemented from scratch, including forward pass and backpropagation.",
      "Genetic algorithm used to search MLP weights for WDBC classification.",
      "Fuzzy logic techniques applied alongside the neural and evolutionary methods.",
      "10-fold cross-validation used as the evaluation protocol.",
      "Five network architectures compared on the WDBC classification task.",
    ],
    architecture: {
      caption:
        "Data pipeline and model evaluation flow for the MLP, Genetic Algorithm, and Fuzzy Logic experiments.",
      layers: [
        { id: "data-prep", label: "Data & Cross-Validation" },
        { id: "model-core", label: "Model Architecture" },
        { id: "algorithms", label: "Search & Training Algorithms" },
        { id: "evaluation", label: "Evaluation & Output" },
      ],
      nodes: [
        {
          id: "data",
          label: "WDBC Dataset",
          detail: "Breast Cancer Data",
          layerId: "data-prep",
          icon: "FileText",
        },
        {
          id: "folds",
          label: "10-Fold CV",
          detail: "Validation Splits",
          layerId: "data-prep",
          icon: "Layers",
        },
        {
          id: "mlp",
          label: "MLP from Scratch",
          detail: "Multilayer Perceptron",
          layerId: "model-core",
          icon: "Cpu",
          tags: ["Forward Pass", "Layer Weights"],
        },
        {
          id: "bp",
          label: "Backpropagation",
          detail: "Gradient Descent",
          layerId: "algorithms",
          icon: "RefreshCw",
        },
        {
          id: "ga",
          label: "Genetic Algorithm",
          detail: "Weight Optimization",
          layerId: "algorithms",
          icon: "Sparkles",
        },
        {
          id: "fuzzy",
          label: "Fuzzy Logic",
          detail: "Rule Inference",
          layerId: "algorithms",
          icon: "Sliders",
        },
        {
          id: "eval",
          label: "Held-Out Evaluation",
          detail: "Cross-Validated Metrics",
          layerId: "evaluation",
          icon: "CheckCircle",
        },
      ],
      edges: [
        { from: "data", to: "folds", label: "Preprocessed Data" },
        { from: "folds", to: "mlp", label: "Fold Training" },
        { from: "mlp", to: "bp", label: "Gradient Updates" },
        { from: "mlp", to: "ga", label: "Population Search" },
        { from: "mlp", to: "fuzzy", label: "Feature Logic" },
        { from: "bp", to: "eval", label: "BP Validation" },
        { from: "ga", to: "eval", label: "GA Validation" },
      ],
    },
    decisions: [
      {
        title: "No ML library for the network",
        body: "Implementing the MLP directly trades speed and convenience for transparency. Every update rule has to be written and debugged by hand.",
      },
      {
        title: "Cross-validation instead of a single split",
        body: "10-fold cross-validation reduces dependence on one lucky train/test cut. It does not by itself prove generalization to a clinical population.",
      },
    ],
    verification: [
      "Evaluation used 10-fold cross-validation across five architectures on WDBC.",
      "Accuracy, F1, runtime, and architecture rankings are not published here because reproducible result tables were not available in the portfolio sources.",
    ],
    limitations: [
      "Numeric results are omitted until they can be reproduced from source and logged outputs.",
      "A from-scratch MLP is a teaching implementation, not a substitute for audited medical software.",
    ],
    lessons: [
      "Weight search via genetic algorithms is easy to describe and expensive to run compared with gradient descent.",
      "Cross-validation is an evaluation protocol, not a guarantee that a model is ready for real users.",
    ],
    relatedSlugs: ["homelab", "ecommerce-platform"],
  },
  {
    slug: "homelab",
    title: "HomeLab and Local AI",
    category: "Infrastructure",
    filters: ["Infrastructure"],
    featured: true,
    summary:
      "Rebuilt an old PC into a personal lab for Proxmox, virtual machines, containers, self-hosted services, and local AI workloads.",
    role: "Operator and experimenter on personal hardware.",
    status: "Ongoing learning",
    technologies: [
      "Linux",
      "Proxmox VE",
      "Docker",
      "Ollama",
      "Open WebUI",
      "Nginx",
    ],
    overview:
      "An old PC was rebuilt as a personal HomeLab to learn Proxmox, virtual machines, containers, and self-hosted services. Local AI was used to observe how GPU, VRAM, CPU, RAM, and storage interact when running model workloads, and how hardware limits show up as practical constraints.",
    problem:
      "Cloud dashboards hide the relationship between processes, disks, memory, and GPUs. A small lab makes those relationships visible, including failure modes such as insufficient VRAM or storage pressure.",
    intendedUsers:
      "Personal learning environment only. It is not offered as a public hosting platform.",
    implementation: [
      "Proxmox used to run virtual machines and containerized workloads on reused hardware.",
      "Docker used to package and run self-hosted services.",
      "Local model serving explored with Ollama and Open WebUI from the technical toolkit.",
      "Linux used as the primary operating environment for services and troubleshooting.",
      "Hosts my live projects — the e-commerce store, Voice PC Remote, and this portfolio — published through Cloudflare Tunnel without opening ports, with Grafana and Dozzle for metrics and logs.",
    ],
    architecture: {
      caption:
        "Infrastructure topology for personal lab hardware, hypervisor, virtualization, containers, and local AI workloads.",
      layers: [
        { id: "hardware", label: "Physical Hardware" },
        { id: "hypervisor", label: "Virtualization Layer" },
        { id: "workloads", label: "Guest Workloads" },
        { id: "ai-services", label: "AI Applications" },
      ],
      nodes: [
        {
          id: "host",
          label: "Physical Host",
          detail: "Reused PC Hardware",
          layerId: "hardware",
          icon: "HardDrive",
          tags: ["CPU", "RAM", "GPU"],
        },
        {
          id: "proxmox",
          label: "Proxmox VE",
          detail: "Type-1 Hypervisor",
          layerId: "hypervisor",
          icon: "Server",
          tags: ["VM & Container Host"],
        },
        {
          id: "vm",
          label: "Linux Guests",
          detail: "Isolated Virtual Machines",
          layerId: "workloads",
          icon: "Terminal",
        },
        {
          id: "docker",
          label: "Docker Engine",
          detail: "Container Services",
          layerId: "workloads",
          icon: "Box",
          tags: ["Compose Services"],
        },
        {
          id: "ai",
          label: "Local AI Stack",
          detail: "Ollama & Open WebUI",
          layerId: "ai-services",
          icon: "Cpu",
          tags: ["GGUF Models", "Local Inference"],
        },
      ],
      edges: [
        { from: "host", to: "proxmox", label: "Bare-Metal OS" },
        { from: "proxmox", to: "vm", label: "Virtual Machines" },
        { from: "proxmox", to: "docker", label: "Container Engine" },
        { from: "docker", to: "ai", label: "Local Model Serving" },
      ],
    },
    decisions: [
      {
        title: "Reuse hardware instead of renting GPUs first",
        body: "A local box makes resource exhaustion obvious. It also means experiments are bounded by whatever GPU, RAM, and disks are actually installed.",
      },
      {
        title: "Sanitize operational detail",
        body: "This case study describes architecture and constraints, not private IPs, tunnel hostnames, credentials, or administration endpoints.",
      },
    ],
    verification: [
      "Verification is operational: guests boot, containers start, and local model UIs respond on the lab network.",
      "No public uptime, token-throughput, or monitoring screenshots are published because they were not captured as reproducible evidence.",
    ],
    limitations: [
      "The lab is a personal environment and will change as hardware and experiments change.",
      "Tools listed in the résumé skill set (for example Grafana or Tailscale) are not claimed here as a fully documented production observability or remote-access deployment.",
    ],
    lessons: [
      "Local LLMs make VRAM and context length feel like systems problems, not just model-card footnotes.",
      "Virtualization helps isolate experiments, but storage and backups still decide whether the lab survives a mistake.",
    ],
    relatedSlugs: ["ecommerce-platform", "voice-pc-remote"],
  },
  {
    slug: "edverra",
    title: "EdVerra",
    category: "Team Projects",
    filters: ["Team Projects", "Software"],
    featured: false,
    summary:
      "Team software project where I led development, owned system design and technical direction, and evaluated whether AI belonged in the product.",
    role: "Software development team lead — system design and technical direction.",
    status: "Team project",
    technologies: [],
    overview:
      "EdVerra was a team software project. I led the software development team and was responsible for system design and technical direction. The work strengthened the habit of identifying real pain points, deciding where AI can add value, and rejecting AI when a simpler approach is more practical.",
    problem:
      "Teams can adopt AI because it is fashionable rather than because it solves a verified user problem. The project required judging that trade-off explicitly.",
    teamContribution:
      "I owned technical direction and system design for the software team. Other teammates contributed; this page does not assign unstated implementation details to any one person.",
    implementation: [
      "Led software development planning and technical direction.",
      "Evaluated AI against alternative non-AI designs before treating a model as required.",
    ],
    limitations: [
      "Public architecture diagrams, repository links, and a technology list are omitted because they were not present in the résumé or available project files.",
    ],
    lessons: [
      "Technical leadership includes saying no to an AI component when the problem does not need one.",
    ],
    relatedSlugs: ["skill-bridge", "restaurant-pos"],
  },
  {
    slug: "skill-bridge",
    title: "Skill Bridge",
    category: "Team Projects",
    filters: ["Team Projects", "Software"],
    featured: false,
    summary:
      "Employment-oriented product work inspired by JobDB, focused on accessibility for people with disabilities.",
    role: "Project owner — requirements gathering and product direction.",
    status: "Team project",
    technologies: [],
    overview:
      "Skill Bridge was a team product effort inspired by JobDB. It was specifically designed to improve employment opportunities and accessibility for people with disabilities. I worked as project owner, gathering and analyzing requirements from stakeholders to define product direction.",
    problem:
      "General job boards are not automatically usable or relevant for people with disabilities. The project started from that accessibility gap rather than from a generic marketplace clone.",
    intendedUsers: "People with disabilities seeking employment, plus stakeholders who defined requirements.",
    teamContribution:
      "My verified contribution is product ownership: stakeholder requirements and product direction. Implementation ownership by other teammates is not itemized here.",
    limitations: [
      "No public repository, screenshots, or stack list was available in the portfolio sources, so those sections are omitted.",
    ],
    lessons: [
      "Requirements work is part of engineering: accessibility goals have to be explicit before interface or data-model decisions.",
    ],
    relatedSlugs: ["edverra", "restaurant-pos"],
  },
  {
    slug: "restaurant-pos",
    title: "Restaurant POS",
    category: "Team Projects",
    filters: ["Team Projects", "Software"],
    featured: false,
    summary:
      "Frontend work on a restaurant point-of-sale web application, focused on service workflows and replacing dedicated POS hardware where practical.",
    role: "Frontend developer.",
    status: "Team project",
    technologies: [],
    overview:
      "I worked as a frontend developer on a restaurant POS web application. The work focused on understanding restaurant service workflows and exploring how software can reduce operational cost by reducing the need for dedicated physical POS equipment.",
    problem:
      "Restaurant service involves seating, orders, and payment flow. Dedicated terminals add hardware cost if a browser-based workflow can cover the same steps.",
    intendedUsers: "Restaurant staff using a web POS during service.",
    teamContribution:
      "Verified contribution is frontend development. Backend, hardware, and product ownership details are not claimed here.",
    limitations: [
      "Specific UI libraries, repositories, and production metrics were not available in the résumé or local artifacts.",
    ],
    relatedSlugs: ["ecommerce-platform", "edverra"],
  },
  {
    slug: "systems-embedded",
    title: "Systems and Embedded Projects",
    category: "Software",
    filters: ["Software"],
    featured: false,
    summary:
      "Assembly-to-machine translator with a behavioral simulator, plus an ESP32 Useless Box for hardware and software integration.",
    role: "Individual implementer of translator, simulator, and embedded prototype.",
    status: "Academic project",
    technologies: ["Assembly", "Machine code simulation", "ESP32"],
    overview:
      "Two related learning projects: an Assembly-to-machine translator and behavioral simulator supporting arithmetic operations and recursive functions, and an ESP32-based Useless Box used to explore IoT and embedded systems. Together they cover program execution, low-level computation, hardware-software integration, and sensor/actuator control.",
    problem:
      "High-level languages hide instruction encoding, call stacks, and the timing of sensors and actuators. Small translators and embedded toys make those layers concrete.",
    implementation: [
      "Translator from assembly to machine representation.",
      "Behavioral simulator with arithmetic operations and recursive functions.",
      "ESP32 Useless Box combining sensing and actuation.",
    ],
    limitations: [
      "Source repositories and measurement logs were not included in the portfolio evidence set.",
    ],
    lessons: [
      "Recursion is easier to write than to watch at the machine level, where stack growth is explicit.",
      "Embedded demos fail in physical ways (wiring, timing) that software tests do not capture.",
    ],
    relatedSlugs: ["mlp-genetic-fuzzy", "homelab"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(project: Project): Project[] {
  if (!project.relatedSlugs?.length) {
    return [];
  }
  return project.relatedSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((item): item is Project => Boolean(item));
}

export function featuredProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
