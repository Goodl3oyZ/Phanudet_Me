export function getSiteUrl(): string | undefined {
  const raw = process.env.SITE_URL?.trim();
  if (!raw) {
    return undefined;
  }
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(pathname: string): string | undefined {
  const origin = getSiteUrl();
  if (!origin) {
    return undefined;
  }
  if (pathname.startsWith("http://") || pathname.startsWith("https://")) {
    return pathname;
  }
  return `${origin}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
