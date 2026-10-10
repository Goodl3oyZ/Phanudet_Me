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

### 1. Clone repository on server
```bash
git clone https://github.com/Goodl3oyZ/Phanudet_Me.git
cd Phanudet_Me
```

### 2. Configure Environment (`.env`)
Create a `.env` file on the server:
```bash
cat << 'EOF' > .env
# Public domain URL (without trailing slash)
SITE_URL=https://phanudet.dev

# Custom server port (optional, defaults to 3000 if unset)
PORT=3000
EOF
```

### 3. Build & Start with Docker Compose
```bash
docker compose up -d --build
```

---

## Cloudflare Tunnel Setup (Recommended for Zero Trust & Automatic SSL)

Using Cloudflare Tunnel (`cloudflared`) connects your container directly to your domain without exposing public server ports.

### Option A: Cloudflare Dashboard (Named Tunnel)
1. Go to **Cloudflare Zero Trust Dashboard** → **Networks** → **Tunnels**.
2. Click **Create a Tunnel** (e.g. name: `portfolio-tunnel`).
3. Run the provided `cloudflared service install <token>` command on your Linux server.
4. In Cloudflare Tunnel settings, add a Public Hostname:
   - **Subdomain/Domain**: `phanudet.dev` (or your domain)
   - **Type**: `HTTP`
   - **URL**: `127.0.0.1:3000` (or `127.0.0.1:${PORT}`)

### Option B: Cloudflare CLI (`cloudflared`)
```bash
# 1. Install cloudflared CLI
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb

# 2. Login to Cloudflare
cloudflared tunnel login

# 3. Create Tunnel
cloudflared tunnel create portfolio

# 4. Route DNS domain to tunnel
cloudflared tunnel route dns portfolio phanudet.dev

# 5. Run tunnel forwarding to container port
cloudflared tunnel run --url http://127.0.0.1:3000 portfolio
```

---

## Nginx / Reverse Proxy Setup (Alternative)

If using traditional Nginx reverse proxy with Cloudflare DNS (Proxied `Orange Cloud` mode):

```nginx
server {
    server_name phanudet.dev;

    location / {
        proxy_pass http://127.0.0.1:3000; # Or your custom $PORT
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Health Verification

Verify that your container and service respond correctly:

```bash
# Verify healthz endpoint (returns {"status":"ok"})
curl -fsS http://127.0.0.1:3000/healthz

# Verify HTTP status code (returns 200)
curl -fsS -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000/
```

Compose automatically uses the same dynamic `/healthz` check.

## Rollback procedure

Keep previous image tags or Git commits. To roll back:

```bash
git checkout <previous-commit-sha>
docker compose up -d --build
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
