import { ProjectFilters } from "@/components/project/ProjectFilters";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Selected Engineering Work",
  "Academic, personal, and team projects in software, machine learning, and infrastructure.",
  "/projects",
);

export default function ProjectsPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Projects"
        title="Selected Engineering Work"
        description="These case studies use facts from the résumé and available source trees. Filters hide work that does not belong to a category rather than inventing extra projects."
      />
      <div className="pb-16">
        <ProjectFilters projects={projects} />
      </div>
    </Container>
  );
}
