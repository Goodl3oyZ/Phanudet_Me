# PHANUDET.DEV

Engineering portfolio for Phanudet Sueaphueak: software, machine learning experiments, and infrastructure learning. Public copy is English-only and limited to facts from the résumé PDF and available source trees.

## Technology stack

- Next.js 16 (App Router, TypeScript; standalone output only in Docker builds)
- Tailwind CSS 4
- Lucide icons
- pnpm
- ESLint
- Vitest and React Testing Library
- Playwright
- Docker multi-stage image and Compose
- GitHub Actions CI

## Prerequisites

- Node.js 20.9 or newer (22 used in Docker and CI)
- pnpm 12.10.1 (`packageManager` field)
- Docker Engine if you run the container
- Chromium for Playwright (`pnpm exec playwright install chromium`)

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env.local` if you need a public origin:

| Name | Required | Purpose |
| --- | --- | --- |
| `SITE_URL` | No | Canonical origin for metadata, sitemap, and robots. No trailing slash. If unset, canonical URLs are omitted and `sitemap.xml` is empty so localhost is not published as a public origin. |

There are no API keys, databases, or form endpoints.

## Build commands

```bash
pnpm build
pnpm start
```

Local and CI use `pnpm start` (`next start`). Docker builds set `DOCKER_BUILD=1` so Next.js emits the standalone server (`node server.js` in the image).

## Test commands

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build && CI=true pnpm test:e2e
pnpm verify
```

## Docker build and run

```bash
docker build -t phanudet-dev:local .
docker run --rm -p 3000:3000 --read-only --tmpfs /tmp phanudet-dev:local
```

Optional build argument:

```bash
docker build --build-arg SITE_URL=https://your-domain.example -t phanudet-dev:local .
```

Logs:

```bash
docker logs <container>
```

Stop:

```bash
docker stop <container>
```

The image runs as user `nextjs`, exposes port 3000 only, and health-checks `GET /healthz`.

## Docker Compose

```bash
docker compose up --build -d
docker compose ps
docker compose logs -f portfolio
curl http://127.0.0.1:3000/healthz
docker compose down
```

`PORT` (host) and `SITE_URL` (build arg via Compose) can be set in the environment. The service is not privileged and does not mount the Docker socket. Playwright in CI starts `next start` on port 3010.

## GitHub Actions workflow

`.github/workflows/ci.yml` runs on pull requests and on pushes to `main`:

1. Checkout
2. Node.js 22 and pnpm 12.10.1
3. `pnpm install --frozen-lockfile`
4. Lint, typecheck, unit tests, production build
5. Playwright Chromium journey tests

Image publish is a separate job on `main` only. It runs if `CONTAINER_REGISTRY`, `REGISTRY_USERNAME`, and `REGISTRY_PASSWORD` secrets exist. Pull requests never receive those secrets. There is no automatic SSH deploy.

## Linux deployment procedure

1. Build and tag an image (`phanudet-dev:<git-sha>`).
2. Copy `compose.yaml` to the host (or pull the image from your registry).
3. Set `IMAGE_TAG` to that SHA.
4. `docker compose up -d`
5. Place a reverse proxy in front of `127.0.0.1:3000`.
6. Confirm `GET /healthz` returns `{"status":"ok"}`.

Do not publish PostgreSQL, Redis, Proxmox, or other lab ports with this site. This app has no database.

## Reverse proxy or tunnel

Terminate TLS at Caddy, Nginx, Traefik, or a tunnel of your choice. Forward HTTP to `127.0.0.1:3000`. Example Nginx location:

```nginx
location / {
  proxy_pass http://127.0.0.1:3000;
  proxy_set_header Host $host;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

Rebuild with `SITE_URL` set to the public `https://` origin so canonical tags and the sitemap match the proxy hostname.

## Health verification

```bash
curl -fsS http://127.0.0.1:3000/healthz
curl -fsS -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000/
```

Compose uses the same `/healthz` check.

## Rollback procedure

Keep the previous image tag. To roll back:

```bash
export IMAGE_TAG=<previous-sha>
docker compose up -d
curl -fsS http://127.0.0.1:3000/healthz
```

If the new container is unhealthy, Compose `restart: unless-stopped` will keep retrying. Prefer pointing `IMAGE_TAG` at the last known good digest instead of rebuilding in place.

## Content editing guide

| Content | Location |
| --- | --- |
| Identity, skills, certifications | `src/content/site.ts` |
| Projects | `src/content/projects.ts` |
| Lab experiments | `src/content/lab.ts` |
| Notes | `src/content/notes/*.md` |
| Résumé PDF | `public/resume/Phanudet_Resume_ENG.pdf` |

Do not add employer names, metrics, or URLs that are not in those sources.

## How to add a new project

1. Add a `Project` object in `src/content/projects.ts` with a unique `slug`.
2. Fill only verified fields. Omit architecture, evidence, or technologies when unknown.
3. Set `filters` so the index page can categorize the work.
4. Link related slugs only if those projects exist.
5. Run `pnpm test` and open `/projects/<slug>`.

## How to add a new article

1. Create `src/content/notes/<slug>.md`.
2. Front matter must include `slug`, `title`, `category`, `summary`, and `writtenOn` (the date you actually wrote it).
3. Use `##` headings for the table of contents.
4. Optional `relatedProjects` is a list of project slugs.
5. Do not invent read counts or backdated publication history.

## Security notes

- No contact form and no application database.
- Markdown is rendered to React elements without `rehype-raw`.
- External links use `rel="noopener noreferrer"`.
- Docker runs as non-root, read-only root filesystem in Compose, no privileged mode.
- CI permissions are `contents: read`.
- Do not commit `.env` files or HomeLab addresses.
- Registry publish secrets are not available to forked pull requests.
- GitHub Container Registry publish would also need `packages: write`. The workflow keeps `contents: read` unless you add that permission yourself.

## Known limitations

- LinkedIn is named on the résumé but not linked; the public URL was not confirmed.
- Several team projects have no public repository in the evidence set.
- MLP numeric scores are omitted until they can be reproduced.
- The lab pages are documentation, not live Grafana or Dozzle dashboards.
- Playwright is not wired as a required GitHub status in this repository until the workflow is enabled on GitHub.

## Remaining setup tasks

1. Initialize git and push to the GitHub account you want to show.
2. Set `SITE_URL` to the real public origin.
3. Point DNS and TLS at the reverse proxy or tunnel.
4. Optionally add `CONTAINER_REGISTRY` secrets if you want CI to push images.
5. Add a LinkedIn URL in `src/content/site.ts` only after you confirm it.
6. Replace or update `public/resume/Phanudet_Resume_ENG.pdf` when the résumé changes.
