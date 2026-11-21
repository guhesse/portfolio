---
id: src/lib/scroll-motion.ts
label: Motion de scroll
kind: module
group: frontend
path: src/lib/scroll-motion.ts
updated: 2026-11-21
links:
  - to: ext:animejs
    kind: uses
docs: []
---

# Motion de scroll

`usePageMotion` aplica animações anime.js em elementos marcados (`data-motion*`) quando entram no viewport, sem repetir e respeitando reduced motion.

## Responsabilidades

- Animar headings, staggers e entradas de página (home, case, experiência).
- Não interferir em tilt de cards.

## Entradas e saídas

- Entrada: ref da página e nome lógico.
- Saída: timelines/animates com `onScroll`.

## Dependências

- anime.js v4.

## Decisões e cuidados

- Introduzido em 2026-11-04 para dar presença sem atrapalhar interação.

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-03 — Motion e física — [mudança](../changes/2026-11-03-physics-tools-motion.md)
