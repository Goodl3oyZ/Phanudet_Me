type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
};

export function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
    <header className="max-w-[45rem] pb-10 pt-10 md:pb-14 md:pt-16">
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-ink-muted">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-[2.25rem] font-semibold leading-[1.15] tracking-tight text-ink md:text-[3rem]">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 text-lg text-ink-muted">{description}</p>
      ) : null}
    </header>
  );
}
