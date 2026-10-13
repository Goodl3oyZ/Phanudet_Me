export const site = {
  brand: "PHANUDET.DEV",
  owner: "Phanudet Sueaphueak",
  tagline: "Building software. Understanding systems.",
  /** Roles from the résumé, shown under the name. */
  roles: ["Software Development", "Cloud & DevOps", "AI/ML", "Security"],
  availability: "Open to entry-level roles in software, cloud, and security",
  photo: {
    src: "/images/profile/phanudet.webp",
    alt: "Portrait of Phanudet Sueaphueak",
    width: 800,
    height: 800,
  },
  introduction:
    "I build software, experiment with machine learning, and explore the infrastructure behind modern applications. My approach combines practical implementation with a focus on system design, technical trade-offs, and continuous learning.",
  heroSupport:
    "Computer Engineering graduate who ships full-stack apps end to end, from database and payments to CI/CD, and runs them on a self-hosted HomeLab.",
  location: "Nakhonsawan, Thailand",
  education: {
    school: "Chiang Mai University",
    degree: "B.Eng. in Computer Engineering",
    gpa: "3.50",
    location: "Chiang Mai, Thailand",
  },
  languages: [
    { name: "English", detail: "B1 (TOEIC 665)" },
    { name: "Thai", detail: "Native" },
  ],
  contact: {
    email: "flukephanudet.work@gmail.com",
    github: {
      label: "GitHub",
      href: "https://github.com/Goodl3oyZ",
    },
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/phanudet-sueaphueak-957757257/",
    },
  },
  resumePdf: {
    href: "/resume/Phanudet_Resume_ENG.pdf",
    filename: "Phanudet_Resume_ENG.pdf",
  },
} as const;

export const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/lab", label: "Engineering Lab" },
  { href: "/notes", label: "Notes" },
  { href: "/about", label: "About" },
] as const;

export const footerNav = [
  { href: "/resume", label: "Résumé" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
] as const;

export const technicalFocus = [
  {
    title: "Build",
    area: "Software engineering",
    body: "Full-stack web applications, typed interfaces, and practical system composition across frontend, API, and data layers.",
  },
  {
    title: "Understand",
    area: "AI and machine learning",
    body: "From-scratch neural network implementations, evaluation with cross-validation, and local LLM experiments that connect models to hardware constraints.",
  },
  {
    title: "Operate",
    area: "Infrastructure and deployment",
    body: "Linux environments, containers, virtualization, and self-hosted services used to learn how applications actually run.",
  },
] as const;

export const skillGroups = [
  {
    label: "Languages",
    items: ["TypeScript", "C++", "Java", "Python"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "Laravel"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "SQLite", "Redis"],
  },
  {
    label: "DevOps and infrastructure",
    items: [
      "Docker",
      "Proxmox VE",
      "Cloudflare Tunnel",
      "Tailscale",
      "Nginx",
      "Linux",
    ],
  },
  {
    label: "Observability",
    items: ["Grafana", "Dozzle"],
  },
  {
    label: "AI and local LLM",
    items: ["Ollama", "Open WebUI", "RAG", "Pinecone", "ChromaDB"],
  },
  {
    label: "Security and networking",
    items: ["Kali Linux", "Burp Suite", "Cisco Packet Tracer"],
  },
  {
    label: "Tools",
    items: ["Git", "Postman", "Jira", "VS Code", "GitHub Actions", "Swagger/OpenAPI"],
  },
] as const;

export const certifications = [
  {
    name: "HCCDA – Tech Essentials (Huawei Cloud)",
    year: "2025",
  },
  {
    name: "Linux Essential (Cisco)",
    year: "2025",
  },
  {
    name: "Cybersecurity Essentials (Cisco)",
    year: "2025",
  },
] as const;
