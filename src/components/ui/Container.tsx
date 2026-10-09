import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "main" | "nav";
  narrow?: boolean;
};

export function Container({
  children,
  className = "",
  as: Tag = "div",
  narrow = false,
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full min-w-0 ${narrow ? "max-w-[45rem]" : "max-w-[75rem]"} px-5 md:px-8 lg:px-12 ${className}`}
    >
      {children}
    </Tag>
  );
}
