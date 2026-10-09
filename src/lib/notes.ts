import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { NoteFrontmatter } from "@/content/types";
import { headingId } from "@/lib/heading-id";

const notesDirectory = path.join(process.cwd(), "src/content/notes");

export type Note = NoteFrontmatter & {
  body: string;
};

function isNoteFrontmatter(value: unknown): value is NoteFrontmatter {
  if (!value || typeof value !== "object") {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    typeof record.slug === "string" &&
    typeof record.title === "string" &&
    typeof record.category === "string" &&
    typeof record.summary === "string" &&
    typeof record.writtenOn === "string"
  );
}

export function getNoteSlugs(): string[] {
  return fs
    .readdirSync(notesDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getNoteBySlug(slug: string): Note | undefined {
  const fullPath = path.join(notesDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return undefined;
  }
  const file = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(file);
  if (!isNoteFrontmatter(parsed.data)) {
    throw new Error(`Invalid frontmatter in ${slug}.md`);
  }
  if (parsed.data.slug !== slug) {
    throw new Error(`Slug mismatch in ${slug}.md`);
  }
  return {
    ...parsed.data,
    relatedProjects: parsed.data.relatedProjects,
    body: parsed.content,
  };
}

export function getAllNotes(): Note[] {
  return getNoteSlugs()
    .map((slug) => getNoteBySlug(slug))
    .filter((note): note is Note => Boolean(note))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function extractHeadings(markdown: string): { id: string; text: string }[] {
  return markdown
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line.replace(/^##\s+/, "").trim();
      return {
        id: headingId(text),
        text,
      };
    });
}
