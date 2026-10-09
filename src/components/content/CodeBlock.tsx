"use client";

import { useState, type ReactNode } from "react";

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (!node || typeof node !== "object") {
    return "";
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }
  if ("props" in node) {
    const element = node as { props?: { children?: ReactNode } };
    return extractText(element.props?.children);
  }
  return "";
}

export function CodeBlock({ children }: { children?: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const text = extractText(children).replace(/\n$/, "");

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="relative my-6 min-w-0 max-w-full overflow-x-auto rounded-xl border border-line bg-ink">
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied to clipboard" : "Copy code"}
        className="absolute right-2 top-2 min-h-11 rounded-lg bg-white/10 px-3 text-xs text-white hover:bg-white/20"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="overflow-x-auto p-4 pt-14 font-mono text-sm leading-6 text-white whitespace-pre">
        {children}
      </pre>
    </div>
  );
}
