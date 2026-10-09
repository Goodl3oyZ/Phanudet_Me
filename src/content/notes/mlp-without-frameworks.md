---
slug: mlp-without-frameworks
title: Training an MLP without a machine-learning framework
category: Machine learning
summary: What implementing backpropagation, a genetic algorithm, and 10-fold cross-validation by hand actually forces you to confront.
writtenOn: "2026-10-10"
relatedProjects:
  - mlp-genetic-fuzzy
---

## The point of doing it by hand

Using a high-level library is the right default for most products. Implementing a multilayer perceptron without those libraries is a different exercise: every matrix multiply, every gradient, and every early-stopping mistake is yours.

The academic project combined three techniques:

- backpropagation for gradient-based weight updates
- a genetic algorithm for weight search on WDBC classification
- fuzzy logic as an additional method on regression and classification problems

## Cross-validation is a protocol

10-fold cross-validation was the evaluation method. That is a statement about how splits were drawn, not a published accuracy table. This note does not invent F1 scores, wall-clock times, or architecture rankings. Those belong in a lab log that can be re-run.

Five network architectures were trained on WDBC. Comparing architectures without a fixed protocol is how optimistic numbers appear. The protocol here was at least consistent: same dataset, same fold method, different shapes.

## Genetic algorithms are honest about cost

A genetic algorithm on network weights makes the search visible. Population size, mutation, and generations are explicit knobs. They also make runtime painful. Gradient descent is not magically correct, but it uses the structure of the loss. Evolutionary search does not, unless you add it.

## What I would log next time

If this work is repeated, the artifacts that matter are:

- seed and fold indices
- architecture definitions
- training curves per fold
- a script that prints a table from those files

Without those files, a portfolio should stay quiet about “performance.”
