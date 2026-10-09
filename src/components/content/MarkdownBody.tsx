import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/content/CodeBlock";
import { headingId } from "@/lib/heading-id";

const components: Components = {
  h2: ({ children }) => {
    const text = String(children);
    return (
      <h2 id={headingId(text)} className="mt-10 scroll-mt-24 text-[1.75rem] font-semibold">
        {children}
      </h2>
    );
  },
  h3: ({ children }) => (
    <h3 className="mt-8 text-xl font-semibold">{children}</h3>
  ),
  p: ({ children }) => <p className="mt-4 text-ink">{children}</p>,
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-ink">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-ink">{children}</ol>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-accent underline-offset-4 hover:underline"
      {...(href?.startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  ),
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  code: ({ children, className }) => {
    if (className) {
      return <code className="font-mono text-[0.9em] text-white">{children}</code>;
    }
    return (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">
        {children}
      </code>
    );
  },
};

export function MarkdownBody({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
