export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="py-16 text-center text-ink-muted" role="status">
      {label}…
    </div>
  );
}
