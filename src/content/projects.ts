import type { Project } from "@/content/types";

export const projects: Project[] = [
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    category: "Software",
    filters: ["Software"],
    featured: true,
    summary:
      "Full-stack commerce application covering catalog, cart, checkout, payments, shipping, OAuth, and address management.",
    role: "Individual builder — designed and implemented frontend and backend modules from scratch.",
    status: "Personal project",
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Drizzle ORM",
      "Redis",
      "MinIO",
      "Docker",
      "Passport OAuth",
      "Omise",
      "Socket.IO",
      "Zod",
    ],
    overview:
      "A full-stack e-commerce platform built to understand how storefront, API, data, file storage, and background integrations fit together. The résumé describes 10+ core modules, including shopping cart, payment, shipping, OAuth authentication, and address management. The local source tree confirms a Next.js App Router frontend and an Express API with PostgreSQL, Redis, MinIO, Docker Compose, and JWT plus Passport OAuth.",
    problem:
      "Commerce systems couple many domains: identity, catalog, cart, orders, payments, shipping, and media. The project exists to implement those domains as separate modules instead of a single unstructured application.",
    intendedUsers:
      "A learning and integration target for a storefront, merchant administration, and authenticated shoppers. This is not presented as a public production storefront with live customers.",
    implementation: [
      "Next.js App Router storefront with React Query, Axios, Tailwind CSS, and form validation.",
      "Express 5 API using ESM, Helmet, rate limiting, Zod DTO validation, and a controller-service layout.",
      "Drizzle ORM against PostgreSQL, with Redis for sessions, lockout, and rate-limit storage.",
      "MinIO buckets for product, profile, store, and review objects.",
      "JWT access and refresh cookies, plus Passport OAuth for GitHub, Google, and Facebook.",
      "Cart, checkout, orders, payments (Omise webhook), shipping calculation, Thai address reference data, wishlists, coupons, loyalty points, and admin reporting routes.",
      "Socket.IO on the same HTTP server for chat handlers.",
      "Docker Compose for PostgreSQL, Redis, MinIO, API, and frontend services.",
    ],
    architecture: {
      caption:
        "Architecture overview for the E-Commerce Platform. Storefront requests originate from the Browser to the Express API. The API connects to PostgreSQL for data, Redis for sessions/limits, MinIO for media, and Omise for payment charges and webhook callbacks.",
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
          detail: "Storefront UI & Client State",
          layerId: "client",
          icon: "Globe",
          tags: ["App Router", "React Query", "Axios"],
        },
        {
          id: "api",
          label: "Express API",
          detail: "REST Services & Auth Middleware",
          layerId: "application",
          icon: "Server",
          tags: ["JWT & OAuth", "Zod DTOs", "Socket.IO"],
        },
        {
          id: "omise",
          label: "Omise Gateway",
          detail: "Payment Gateway Service",
          layerId: "external",
          icon: "CreditCard",
          tags: ["Charge API", "Webhook Dispatch"],
        },
        {
          id: "db",
          label: "PostgreSQL",
          detail: "Relational Database",
          layerId: "data",
          icon: "Database",
          tags: ["Drizzle ORM"],
        },
        {
          id: "redis",
          label: "Redis",
          detail: "In-Memory Datastore",
          layerId: "data",
          icon: "Zap",
          tags: ["Sessions & Lockout", "Rate Limiting"],
        },
        {
          id: "minio",
          label: "MinIO",
          detail: "Object Storage",
          layerId: "data",
          icon: "HardDrive",
          tags: ["Product Media", "User Uploads"],
        },
      ],
      edges: [
        {
          from: "browser",
          to: "api",
          label: "REST / HTTPS Requests",
          type: "request",
        },
        {
          from: "api",
          to: "db",
          label: "SQL / Drizzle ORM",
          type: "data",
        },
        {
          from: "api",
          to: "redis",
          label: "Sessions & Limits",
          type: "data",
        },
        {
          from: "api",
          to: "minio",
          label: "S3 Object Store",
          type: "data",
        },
        {
          from: "api",
          to: "omise",
          label: "Payment Charge",
          type: "outbound",
        },
        {
          from: "omise",
          to: "api",
          label: "Webhook Callback",
          type: "webhook",
          dashed: true,
        },
      ],
    },
    decisions: [
      {
        title: "Split frontend and API",
        body: "The storefront and API are separate packages so each can be containerized and developed independently. The cost is operational complexity compared with a single Next.js server.",
      },
      {
        title: "Compose infrastructure locally",
        body: "PostgreSQL, Redis, and MinIO run as Compose services so the stack can be reproduced without a cloud account. This matches a learning goal more than a managed production platform.",
      },
      {
        title: "Validate at the route boundary",
        body: "Zod DTOs sit in front of controllers. Invalid payloads fail before service logic runs, which keeps handlers thinner and makes OpenAPI generation more honest.",
      },
    ],
    verification: [
      "Backend includes Jest and SuperTest scripts, including a CI-oriented test command.",
      "API health endpoint reports database, Redis, and MinIO status for local checks.",
      "Swagger documentation and a validation script exist in the backend package.",
    ],
    limitations: [
      "The project is a local and containerized implementation, not a claimed public production deployment.",
      "OAuth providers require matching callback URLs and secrets that are environment-specific.",
      "Payment behavior depends on Omise configuration and should not be treated as a live merchant account.",
    ],
    lessons: [
      "Commerce complexity is mostly integration: auth cookies, webhook order, file uploads, and role checks matter as much as product CRUD.",
      "Docker hostnames, not localhost, are required when services talk to each other inside Compose.",
    ],
    evidence: [
      {
        type: "repository",
        label: "WebEcommerce source repository",
        href: "https://github.com/Goodl3oyZ/WebEcommerce",
      },
    ],
    relatedSlugs: ["restaurant-pos", "homelab"],
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
    relatedSlugs: ["ecommerce-platform", "mlp-genetic-fuzzy"],
  },
  {
    slug: "edverra",
    title: "EdVerra",
    category: "Team Projects",
    filters: ["Team Projects", "Software"],
    featured: true,
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
