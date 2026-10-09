---
slug: local-llm-resources
title: Local LLMs are a hardware conversation
category: Local AI
summary: Running models at home makes GPU memory, RAM, CPU, and disk limits visible in a way API invoices do not.
writtenOn: "2026-10-10"
relatedProjects:
  - homelab
---

## Why run models locally

A hosted API hides the machine. You learn prompting and integration, not why a 7B-class model fits while a larger one does not. The HomeLab work used local AI specifically to watch GPU, VRAM, CPU, RAM, and storage interact.

## The first constraint is memory, not cleverness

If the weights do not fit in VRAM (or spill in a way the runtime cannot handle), nothing else in the stack matters. CPU offload can keep an experiment alive and still make it too slow to iterate. That is useful information. It is not a benchmark.

## Disk is the quiet failure

Model files accumulate. Snapshots, quantized variants, and UI containers share the same disks as virtual machines. A lab that can boot Proxmox guests and also store several model artifacts needs an explicit storage plan. “Just pull another tag” is how disks fill.

## Do not publish fake dashboards

Token throughput, GPU utilization graphs, and uptime percentages are easy to fabricate and hard to defend. This site describes the experiment and the constraints. It does not plot numbers that were not measured under a documented procedure.

## A practical verification loop

1. Confirm the runtime process is up on the lab network.
2. Load the smallest model that the hardware should accept.
3. Send one prompt through the local UI.
4. Record whether the load failed, swapped, or answered.

That is enough to learn. It is not enough to claim a production inference service.
