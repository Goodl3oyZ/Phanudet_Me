---
slug: compose-full-stack
title: Compose as a contract between app and infrastructure
category: Docker and CI/CD
summary: Docker Compose is useful when service hostnames, health, and seed steps are treated as part of the application, not as a local hack.
writtenOn: "2026-10-10"
relatedProjects:
  - ecommerce-platform
  - homelab
---

## Localhost is the wrong hostname

Inside a Compose network, PostgreSQL is not `localhost`. It is whatever the service is named. The e-commerce stack uses separate services for the database, Redis, MinIO, API, and frontend. Application config has to match those names or the stack only works on the developer’s machine.

## Health is not the process ID

A container can be “running” while the database is still accepting connections or MinIO buckets do not exist. The API health payload that checks database, Redis, and MinIO is more honest than a process-level liveness probe alone.

## Seed and migrate are deploy steps

Schema push and seed scripts are part of bringing the system up. They should not be tribal knowledge. They also should not be baked into images with default admin passwords left in public documentation. Credentials belong in untracked env files.

## What CI should do first

Before any deployment talk, CI should install a lockfile, lint, typecheck, test, and build. Publishing an image is a separate, credentialed job. This portfolio’s workflow follows that split: verification on pull requests, no implied production SSH target.

```yaml
# Conceptual order — not a live cluster manifest
jobs:
  verify:
    steps: [checkout, install, lint, typecheck, test, build]
  publish:
    if: credentials are present
    steps: [build image, tag with SHA]
```

## Rollback is a tag, not a wish

If you ship a container, keep the previous image digest. Point Compose or your process manager at the last known tag, restart, and hit health again. Without tagged images there is nothing to roll back to.
