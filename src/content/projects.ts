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
          detail: "Storefront & admin",
          layerId: "client",
          icon: "Globe",
          tags: ["App Router"],
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
    category: "AI / ML",
    filters: ["AI / ML", "Infrastructure", "Software"],
    featured: true,
    summary:
      "Speak to your phone and your Windows PC does it — with no cloud AI. Speech-to-text and an LLM run on my HomeLab GPU; a policy layer and an HMAC-signed agent decide what is allowed to run.",
    role: "Individual builder — design document, architecture, PC1 orchestrator, PC2 agent, Chrome extension, PWA, evaluation, and deployment.",
    status: "Personal project",
    liveUrl: "https://pc.flukelnwza.online",
    technologies: [
      "Python",
      "FastAPI",
      "WebSocket",
      "faster-whisper",
      "Ollama",
      "Gemma (gemma4-e2b)",
      "React",
      "TypeScript",
      "PWA",
      "SQLite",
      "Chrome extension",
      "Docker",
      "Proxmox LXC + GPU",
      "Cloudflare Tunnel",
      "GitHub Actions",
    ],
    images: [
      {
        src: "/images/projects/voice-pc-remote/screens.webp",
        alt: "Four phone screens of the Voice PC app: a finished command with verified steps, the Apps grid, a YouTube wizard, and the command history",
        width: 1600,
        height: 1000,
        caption: "Home with a verified result, Apps, a step-by-step YouTube wizard, and history (demo data).",
      },
      {
        src: "/images/projects/voice-pc-remote/sign-in.webp",
        alt: "Voice PC Remote sign-in card explaining two-step sign-in with Google and a device secret key",
        width: 1440,
        height: 900,
        caption: "Two-step sign-in: an allowed Google account, then a secret key to pair the device.",
      },
    ],
    metrics: [
      { value: "95 %", label: "Correct tool chosen on the golden command set" },
      { value: "0", label: "Dangerous commands executed (red-team and golden sets)" },
      { value: "0.45 s", label: "LLM planning time, median, on a 4 GB GPU" },
      { value: "93 %", label: "Spoken commands that run the intended action (35 commands × 3 voices)" },
      { value: "~300", label: "Automated tests; core and policy coverage gate ≥ 85 %" },
      { value: "4", label: "Phases shipped: core, browser, AI coding agent, hands-free" },
    ],
    overview:
      "Voice PC Remote lets me control my own Windows PC by voice from a phone: open apps and sites, search, play music on YouTube, change the volume, drive OBS, Office, and Steam, and even ask an AI coding agent to change a project. Speech recognition and the language model run on my HomeLab (PC1), not in the cloud. The PC (PC2) runs an agent that connects out to PC1, checks every request again, and reports what actually happened. I wrote the design document first (requirements, threat model, test cases, phases and gates), then built it phase by phase.",
    problem:
      "Letting a language model control a real computer is risky: speech is misheard, the model can be wrong or manipulated by text on a web page, and a remote-control endpoint on the internet is a target. The goal was hands-free control that stays private and never runs something it cannot justify.",
    intendedUsers: "Personal use. Sign-in is limited to an allow-listed Google account on a device paired with a secret key.",
    flow: [
      {
        title: "Speak on the phone",
        body: "The PWA records audio (tap, hold, or hands-free with voice activity detection and the wake word “computer”). PC1 transcribes it with faster-whisper; the phone shows what it heard so I can fix it before pressing Send.",
      },
      {
        title: "Rules before the model",
        body: "Aliases fix common mishearings, and simple commands such as “open Chrome”, “stop”, or “status” match rule shortcuts, so they finish in about a second without the LLM.",
      },
      {
        title: "Plan with the local LLM",
        body: "Anything else goes to Ollama with the tool schemas, where allowed apps and sites are enums. The model returns a tool call, a question back when the request is ambiguous, or a refusal.",
      },
      {
        title: "Policy decides",
        body: "The router denies by default: unknown tools, bad arguments, rate limits, and the kill switch all stop the job. Risky actions (level 3 and up) show a confirmation card with the exact arguments, bound by a hash so they cannot change after approval.",
      },
      {
        title: "Signed, then checked again on the PC",
        body: "PC1 signs the request with HMAC-SHA256 over method, path, timestamp, nonce, and body hash. The agent on PC2 rejects old or replayed requests, re-checks its own allowlist, runs the tool without a shell, and verifies the result.",
      },
      {
        title: "Answer from the verified result",
        body: "The summary on the phone is built from what the PC confirmed, never guessed, and pushed live over WebSocket. Every step is timed and written to hash-chained audit logs on both machines.",
      },
    ],
    customDiagram: "voice-pc-remote",
    knowledge: [
      {
        area: "AI and speech",
        items: [
          "Speech-to-text with faster-whisper (CTranslate2, int8 on CPU): vocabulary prompts, forced language, repetition-loop handling, confidence-based “did I hear you right?”.",
          "LLM tool calling with Ollama: tool schemas with enums, ask-back for ambiguity, retry on invalid JSON.",
          "Choosing a model for a 4 GB GPU by benchmark (accuracy, refusal, latency) and recording the decision in an ADR.",
          "Wake-word filtering and client-side voice activity detection for hands-free use.",
        ],
      },
      {
        area: "Security engineering",
        items: [
          "STRIDE threat model across trust zones; the LLM and screen content are treated as untrusted input (prompt-injection taint).",
          "HMAC-SHA256 request signing with timestamps, nonces, and idempotency keys; deny-by-default policy and risk levels.",
          "Google OAuth with PKCE plus device pairing, HttpOnly cookies, CSRF header, WebSocket origin checks.",
          "Hash-chained audit logs, fail-closed when the audit cannot be written, an offline kill switch, and a Stop that always works.",
          "AI code edits held for approval when they add process, network, or secret access (found by my own red-team).",
        ],
      },
      {
        area: "Backend and architecture",
        items: [
          "FastAPI REST and WebSocket APIs; a job state machine (planning → routing → dispatching → verifying → done, with clarify, confirm, cancel).",
          "Ports and adapters: the core has no framework imports, so STT, LLM, and PC2 can be swapped for fakes in tests.",
          "Shared contracts package for tool schemas and signing, used by both PC1 and PC2; SQLite in WAL mode; circuit breaker for PC2.",
        ],
      },
      {
        area: "Windows and browser automation",
        items: [
          "A Windows agent that launches and verifies apps, sends media keys, and drives OBS, Office, and Steam.",
          "A Chrome extension that controls the owner's own Chrome (YouTube, search, social sites) and reconnects by itself.",
          "AI coding agent on registered git projects: every edit on an ai/* branch, fixed test command, diff and revert from the phone.",
          "Wake-on-LAN to wake the PC from the HomeLab.",
        ],
      },
      {
        area: "Infrastructure and operations",
        items: [
          "Proxmox LXC with GPU passthrough, Ollama and Open WebUI in Docker, the orchestrator as a systemd service.",
          "Cloudflare Tunnel so neither PC1 nor PC2 opens a port; the PC agent dials out over WebSocket.",
          "CI on GitHub Actions: ruff, pytest with a coverage gate, bandit, pip-audit, npm audit, gitleaks, and the evaluation set.",
        ],
      },
      {
        area: "Evaluation and testing",
        items: [
          "Golden command set measuring tool accuracy, refusals, clarifications, and latency per stage.",
          "Red-team suite (prompt injection, dangerous commands, shells), soak runs, a speech-to-text benchmark with noise, and a wake-word evaluation.",
          "End-to-end tests with real HMAC and a real socket relay between PC1 and PC2.",
        ],
      },
    ],
    implementation: [
      "Phase 1 — core pipeline: voice and text commands, rule shortcuts, LLM planner, policy router, signed dispatch, verified results, history, and Stop.",
      "Phase 2 — browser: web and YouTube search with results on the phone, “open result 2”, playing videos and music, tabs, and stopping at CAPTCHAs instead of solving them.",
      "Phase 3 — AI coding agent: edits on registered projects only, on ai/* branches, with tests, diffs, and revert on the phone.",
      "Phase 4 — hands-free: wake word, voice answers, screen description with a vision model, and Wake-on-LAN.",
      "App flows: the phone draws each app (YouTube, Music, Search, Code, Office, OBS, Steam, social sites) as a short wizard generated by PC1, so tapping and speaking share one pipeline.",
    ],
    decisions: [
      {
        title: "Local models instead of cloud APIs",
        body: "Voice and commands stay on my network. The cost is accuracy and latency bounded by a 4 GB GPU, so every model change is benchmarked first: gemma4-e2b (QAT) won at 0.43 s median planning with 100 % of the GPU.",
      },
      {
        title: "Review what was heard before sending",
        body: "Owner testing showed commands running on misheard words. PC1 now only transcribes; the phone shows the editable text and nothing runs until Send.",
      },
      {
        title: "The PC dials out",
        body: "PC2 opens no inbound port and needs no VPN: it keeps an outbound WebSocket to PC1 through the tunnel, authenticated with an HMAC challenge.",
      },
      {
        title: "English first, measured",
        body: "Whisper small was reliable in English but not in Thai on this hardware, so English is fixed by default and Thai is an explicit switch rather than automatic language guessing.",
      },
    ],
    limitations: [
      "Single-user system tuned for my own PC, apps, and voice.",
      "Speech-to-text runs on CPU (about 2–4 s per command); a larger GPU would allow bigger Whisper and LLM models.",
      "The risky-code check is a pattern list and cannot prove code safe; the ai/* branch and revert remain the backstop.",
    ],
    lessons: [
      "Evaluation (golden sets, red-team prompts, soak runs) is what turns a voice demo into something safe to leave running.",
      "Writing the design document with test cases and gates first made each phase easy to finish and verify.",
      "Real use finds what tests miss: a library update broke every audio command in production until I decoded audio myself.",
    ],
    relatedSlugs: ["homelab", "ecommerce-platform"],
  },
  {
    slug: "gymmate",
    title: "GymMate",
    category: "Team Projects",
    filters: ["Team Projects", "Software", "Infrastructure"],
    featured: true,
    summary:
      "Capstone fitness platform for gym members, trainers, and gym owners: workout program builder, exercise substitution when a machine is busy, gamification, and a gym CMS with a floorplan editor.",
    role: "Web application developer in a three-person team (web, backend, mobile), CMU Computer Engineering capstone (261492).",
    status: "Team project",
    technologies: [
      "React",
      "React Native",
      "Go (Gin)",
      "PostgreSQL",
      "MinIO",
      "JWT",
      "OpenAPI / Swagger",
      "Docker",
      "GitHub Actions",
      "Proxmox VE",
      "Cloudflare Tunnel",
      "Tailscale",
      "Dozzle",
    ],
    overview:
      "GymMate centralizes a gym's data and training knowledge in one place. Members follow personalised programs on a mobile app and stay motivated through streaks, XP levels, badges, and a leaderboard. Trainers design programs from templates, assign them, and follow each trainee's progress on a dashboard. Gym owners manage machines, exercises, programs, and users in a web CMS, including a drag-and-drop floorplan that shows where each machine is.",
    problem:
      "Members get bored, stop seeing results, and lose motivation; trainers juggle programs and trainee history across scattered tools; gym owners need members to keep coming back. A busy or missing machine also breaks a planned workout.",
    intendedUsers:
      "Gym members (mobile), trainers and gym admins (web). The floorplan and equipment data were modelled on CMU Fitness by PlayGround.",
    teamContribution:
      "I built the web application: the member-facing web pages and the admin/trainer CMS (program builder, floorplan, machines, exercises, muscle atlas, users). Teammates owned the Go backend and the React Native mobile app.",
    images: [
      {
        src: "/images/projects/gymmate/cover.webp",
        alt: "GymMate web application on laptops and the mobile app on four phones: home, exercise library, workout plan, and floorplan",
        width: 1600,
        height: 1000,
        caption: "Web CMS on laptops and the member app on phones.",
      },
      {
        src: "/images/projects/gymmate/program-builder.webp",
        alt: "Create program dialog with a training day, split type, and an exercise list with sets, reps, weight, and rest",
        width: 1006,
        height: 1088,
        caption: "Program builder: training days, split type, and per-exercise sets, reps, weight, and rest.",
      },
      {
        src: "/images/projects/gymmate/profile.webp",
        alt: "Member profile card showing streak, workouts, awards, level, and XP progress",
        width: 1288,
        height: 598,
        caption: "Member profile with streak, level, and XP progress.",
      },
      {
        src: "/images/projects/gymmate/leaderboard.webp",
        alt: "Leaderboard podium with the top three members and the viewer's current ranking",
        width: 784,
        height: 602,
        caption: "Leaderboard podium and the member's own ranking.",
      },
      {
        src: "/images/projects/gymmate/api-docs.webp",
        alt: "Swagger page for the GymMate Backend API version 2.0.0 listing features and authentication endpoints",
        width: 1600,
        height: 848,
        caption: "OpenAPI 3 documentation served with Swagger UI.",
      },
      {
        src: "/images/projects/gymmate/proxmox.webp",
        alt: "Proxmox VE summary of the gm-server virtual machine with CPU and memory usage",
        width: 1600,
        height: 867,
        caption: "Backend VM on Proxmox; the web app runs in a separate VM.",
      },
      {
        src: "/images/projects/gymmate/ci-runs.webp",
        alt: "GitHub Actions list of 49 workflow runs that build and push the backend Docker image",
        width: 1228,
        height: 748,
        caption: "Every push to main builds and pushes a Docker image.",
      },
      {
        src: "/images/projects/gymmate/monitoring.webp",
        alt: "Dozzle dashboard for gm-server showing five running containers with CPU and memory",
        width: 1140,
        height: 820,
        caption: "Container logs and resource use in Dozzle.",
      },
    ],
    implementation: [
      "Program builder with templates and cloning, so trainers adapt an existing program instead of starting from scratch.",
      "Exercise substitution: exercises are encoded as feature vectors and ranked by cosine similarity, so the app suggests an alternative when a machine is busy or missing.",
      "Gamification: streaks, XP levels, badges, challenges, and weekly leaderboards.",
      "Gym CMS: floorplan editor with drag-and-drop machine placement, plus machines, exercises, muscle atlas, programs, and users.",
      "Trainer dashboard to assign programs and follow each trainee's progress and history.",
      "REST API with JWT authentication (HS256, one-hour expiry) and roles for members, trainers, and admins, documented in OpenAPI 3.",
      "Training logic grounded in the ACSM FITT-VP principle (frequency, intensity, time, type, volume, progression) and self-efficacy research on motivation.",
    ],
    architecture: {
      caption:
        "Three tiers: the React web app and React Native mobile app call the Go (Gin) REST API, which stores data in PostgreSQL and files in MinIO. Each tier runs in Docker on Proxmox VMs, exposed through Cloudflare Tunnel.",
      layers: [
        { id: "presentation", label: "Presentation Tier" },
        { id: "logic", label: "Logic Tier" },
        { id: "data", label: "Data Tier" },
      ],
      nodes: [
        { id: "web", label: "Web App", detail: "React — member pages & CMS", layerId: "presentation", icon: "Globe" },
        { id: "mobile", label: "Mobile App", detail: "React Native", layerId: "presentation", icon: "Smartphone" },
        { id: "api", label: "REST API", detail: "Go + Gin, JWT, roles", layerId: "logic", icon: "Server" },
        { id: "db", label: "PostgreSQL", detail: "Users, programs, logs", layerId: "data", icon: "Database" },
        { id: "files", label: "MinIO", detail: "Images & media", layerId: "data", icon: "HardDrive" },
      ],
      edges: [
        { from: "web", to: "api", label: "HTTPS / REST", type: "request" },
        { from: "mobile", to: "api", label: "HTTPS / REST", type: "request" },
        { from: "api", to: "db", label: "SQL", type: "data" },
        { from: "api", to: "files", label: "S3 API", type: "data" },
      ],
    },
    decisions: [
      {
        title: "Separate VMs for the web app and the backend",
        body: "The web app and the API run in their own Proxmox VMs with Docker. Dev and prod backends and databases sit side by side, so testing a change does not touch production data.",
      },
      {
        title: "Images built in CI, pulled by a webhook",
        body: "GitHub Actions builds and pushes Docker images to Docker Hub; a webhook on the server pulls the new image, restarts the containers, and posts each step to the team's Discord channel.",
      },
      {
        title: "Private access for developers",
        body: "Developer machines and the Proxmox host share a Tailscale network; only the web app, API, file, and webhook hosts are published, through Cloudflare Tunnel.",
      },
    ],
    verification: [
      "Internal and scenario testing, with measured response times, against an experiment design written before testing.",
      "User survey on the working demo (web app and mobile app).",
    ],
    limitations: [
      "The mobile app was not published to the app stores within the project timeline, so no real members used it; evaluation relied on internal and scenario testing.",
      "The project deployment is no longer online.",
      "Hardware limits: workouts are logged manually rather than from wearables or machine sensors.",
    ],
    lessons: [
      "Writing the API contract (OpenAPI) early let the web and mobile apps be built in parallel with the backend.",
      "A visible deploy log in chat makes a shared server easier to trust for a whole team.",
    ],
    relatedSlugs: ["restaurant-pos", "homelab"],
  },
  {
    slug: "restaurant-pos",
    title: "Restaurant POS",
    category: "Team Projects",
    filters: ["Team Projects", "Software"],
    featured: true,
    summary:
      "Web point-of-sale for restaurants: customers order by scanning a QR code at the table, the kitchen sees orders live, and cashiers settle bills by table with cash or PromptPay.",
    role: "Frontend developer in a three-person team.",
    status: "Team project",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Axios",
      "Go (Gin)",
      "GORM",
      "Casbin",
      "MinIO",
      "Omise (PromptPay)",
    ],
    overview:
      "A browser-based POS that covers a restaurant's service from seat to receipt. Each table has its own QR code; customers open the menu on their phones and send orders without waiting for staff. Waiters and cashiers manage tables by zone, chefs and bartenders see what to prepare, cashiers take payment by table, and owners see sales history and analytics.",
    problem:
      "Many restaurants still take orders on paper, which leads to mistakes, slow service, and lost orders. Table status (free, occupied, cleaning) is unclear, splitting bills and taking several payment methods is slow and error-prone, and owners have no sales data to plan with.",
    intendedUsers:
      "Restaurant owners and admins, waiters and cashiers, chefs and bartenders, and customers ordering from their table.",
    teamContribution:
      "I built the frontend: the customer QR ordering flow, menu and cart, orders, tables, payment, history and analytics, and settings pages. Teammates built the Go backend and the database.",
    images: [
      {
        src: "/images/projects/restaurant-pos/menu.webp",
        alt: "POS menu page with category filters and food cards with prices and add buttons",
        width: 1420,
        height: 642,
        caption: "Menu with categories; staff and customers share the same ordering flow.",
      },
      {
        src: "/images/projects/restaurant-pos/customer-qr.webp",
        alt: "Two phone screens: the menu opened from a table QR code, and the cart with a checkout button",
        width: 1080,
        height: 980,
        caption: "Customer flow: scan the table QR code, add dishes, and check out from the phone.",
      },
      {
        src: "/images/projects/restaurant-pos/tables.webp",
        alt: "Tables page with zones Bar, Main Hall, and Patio, table status, and the open orders of the selected table",
        width: 1600,
        height: 694,
        caption: "Tables by zone with live status and each table's open orders.",
      },
      {
        src: "/images/projects/restaurant-pos/orders.webp",
        alt: "Orders page filtered to open orders, showing an order for table T2",
        width: 1600,
        height: 722,
        caption: "Orders by status (open, paid, void) for the kitchen and bar.",
      },
      {
        src: "/images/projects/restaurant-pos/payment.webp",
        alt: "Payment by table: select orders of table T2 and pay by cash or PromptPay",
        width: 1600,
        height: 722,
        caption: "Payment by table: choose which orders to settle, then cash or PromptPay.",
      },
      {
        src: "/images/projects/restaurant-pos/history.webp",
        alt: "History and analytics page with total revenue, order count, average bill, and revenue per day chart",
        width: 1172,
        height: 530,
        caption: "Sales history and analytics for the owner.",
      },
    ],
    implementation: [
      "QR code per table: the link carries the table, so customer orders land on the right bill.",
      "Table management by zone with status (available, occupied, cleaning).",
      "Orders flow to the kitchen and bar, which update the status as dishes are prepared.",
      "Checkout by table with split bills, cash or PromptPay (through Omise), and receipts.",
      "Owner dashboard: revenue per day, by payment method, and best-selling dishes; menu and user management.",
      "Role-based access with Casbin: waiter/cashier, chef/bartender, manager/admin, and customer; staff sign in with session-based credentials and owners with OAuth 2.0.",
    ],
    limitations: [
      "Built and demonstrated locally; not deployed for a real restaurant.",
    ],
    lessons: [
      "Designing around each role's job (cashier, chef, owner) mattered more than the number of screens.",
      "Sharing one API client (Axios) and typed responses kept the many pages consistent as the backend changed.",
    ],
    relatedSlugs: ["ecommerce-platform", "gymmate"],
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
    relatedSlugs: ["skill-bridge", "gymmate"],
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
    relatedSlugs: ["edverra", "gymmate"],
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
