---
slug: layered-commerce-api
title: Layering a commerce API without hiding the seams
category: Software architecture
summary: How the e-commerce API keeps routes, validation, services, and infrastructure in separate layers, based on the actual project layout.
writtenOn: "2026-10-10"
relatedProjects:
  - ecommerce-platform
---

## Why the seams matter

A storefront looks simple from the browser: list products, add to cart, pay. The implementation is a set of independently failing parts. The WebEcommerce API keeps those parts in a route → controller → service → infrastructure sequence instead of letting handlers talk to PostgreSQL, Redis, and MinIO directly.

## Layout that matches the runtime

The backend is an Express 5 ESM process. After Redis and session setup, the process mounts middleware (CORS, Helmet, rate limiting, JSON body parsing), then routers, then Socket.IO, then a global error handler. Health is a JSON endpoint that reports database, Redis, and MinIO status rather than a boolean that ignores dependencies.

## Validation before business logic

Zod DTOs sit on the route. Invalid input never reaches a service that would otherwise emit a half-written row. That choice is boring on purpose. Commerce bugs often start as “the handler assumed a field existed.”

## Auth is several mechanisms, not one

The same API accepts JWT cookies or bearer tokens, Express sessions, and Passport OAuth callbacks for GitHub, Google, and Facebook. OAuth lives under `/oauth`, not under `/api`. Roles are stored in a `user_roles` table and collapsed to the highest role for authorization checks.

This is more moving parts than a tutorial login form. It is also closer to how a real shop accumulates identity over time.

## Payments belong at the edge

Omise webhooks are registered before the generic auth middleware. A provider callback cannot send a session cookie. Treating the webhook as “just another POST” is a common way to create an unreachable or overly protected endpoint.

## What this does not prove

The architecture is documented from the source tree. It does not prove production traffic, PCI scope, or uptime. Docker Compose on a workstation reproduces the topology; it does not replace capacity planning.
