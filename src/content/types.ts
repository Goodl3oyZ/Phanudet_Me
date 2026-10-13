export const FILTER_CATEGORIES = [
  "All",
  "Software",
  "AI / ML",
  "Infrastructure",
  "Team Projects",
] as const;

export type FilterCategory = (typeof FILTER_CATEGORIES)[number];
export type ProjectCategory = Exclude<FilterCategory, "All">;

export type ProjectStatus =
  | "Academic project"
  | "Personal project"
  | "Team project"
  | "Ongoing learning";

export type EvidenceType = "repository" | "documentation" | "article";

export type EvidenceLink = {
  type: EvidenceType;
  label: string;
  href: string;
};

export type ArchitectureLayer = {
  id: string;
  label: string;
};

export type ArchitectureNode = {
  id: string;
  label: string;
  detail?: string;
  layerId?: string;
  icon?: string;
  tags?: string[];
};

export type ArchitectureEdge = {
  from: string;
  to: string;
  label?: string;
  type?: "request" | "data" | "webhook" | "outbound" | "inbound" | "default";
  dashed?: boolean;
};

export type Architecture = {
  caption: string;
  layers?: ArchitectureLayer[];
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
};

export type ProjectImage = {
  /** Path under /public, e.g. /images/projects/<slug>/storefront.webp */
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type Decision = {
  title: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  filters: ProjectCategory[];
  featured: boolean;
  summary: string;
  role: string;
  status: ProjectStatus;
  technologies: string[];
  overview: string;
  problem?: string;
  intendedUsers?: string;
  teamContribution?: string;
  implementation?: string[];
  architecture?: Architecture;
  decisions?: Decision[];
  verification?: string[];
  limitations?: string[];
  lessons?: string[];
  evidence?: EvidenceLink[];
  relatedSlugs?: string[];
  /** Public deployment, when the project runs live. */
  liveUrl?: string;
  /** Screenshots; the first one is the cover on cards and the case study. */
  images?: ProjectImage[];
};

export type LabExperiment = {
  slug: string;
  title: string;
  category?: string;
  summary?: string;
  engineeringFocus?: string;
  technologies?: string[];
  objective: string;
  architecture: string;
  components: string[];
  configuration: string[];
  constraints: string[];
  verification: string[];
  limitations: string[];
  evidence: string[];
};

export type NoteCategory =
  | "Docker and CI/CD"
  | "Machine learning"
  | "Software architecture"
  | "Local AI";

export type NoteFrontmatter = {
  slug: string;
  title: string;
  category: NoteCategory;
  summary: string;
  writtenOn: string;
  relatedProjects?: string[];
};
