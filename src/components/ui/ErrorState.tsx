"use client";

type ErrorStateProps = {
  title?: string;
  body?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = "Something went wrong",
  body = "The page failed to load. Try again, or return to the homepage.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-3 text-ink-muted">{body}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-accent px-5 text-sm font-medium text-white hover:bg-accent-hover"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
