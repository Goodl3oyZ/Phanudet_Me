import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

type NotFoundStateProps = {
  title?: string;
  body?: string;
};

export function NotFoundState({
  title = "Page not found",
  body = "The page you requested does not exist or is no longer published.",
}: NotFoundStateProps) {
  return (
    <div className="mx-auto max-w-xl py-20 text-center">
      <p className="font-mono text-sm text-ink-muted">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-4 text-ink-muted">{body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <PrimaryButton href="/">Home</PrimaryButton>
        <SecondaryButton href="/projects">Projects</SecondaryButton>
      </div>
    </div>
  );
}
