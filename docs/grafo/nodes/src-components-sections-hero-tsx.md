---
id: src/components/sections/hero.tsx
label: Seção Hero
kind: component
group: frontend
path: src/components/sections/hero.tsx
updated: 2026-11-21
links:
  - to: src/components/sections/hero-dots.tsx
    kind: renders
  - to: src/components/shared/physics-tags.tsx
    kind: renders
    label: lazy após idle
  - to: src/i18n/use-locale.ts
    kind: imports
  - to: src/lib/analytics.ts
    kind: calls
docs: []
---

# Seção Hero

Primeira dobra da home: título, texto, CTAs e fundo interativo (pontos + tags físicas).

## Responsabilidades

- Apresentar a proposta de valor.
- Adiar `PhysicsTags` com `requestIdleCallback` para não bloquear LCP.
- Manter texto clicável acima das tags sem travar o scroll.

## Entradas e saídas

- Entrada: `messages[locale].hero`.
- Saída: seção `#inicio` com tracking de view.

## Dependências

- hero-dots, physics-tags, i18n, analytics/section-tracking.

## Decisões e cuidados

- Há um bloco “fantasma” (`invisible` + `data-physics-obstacle`) para as tags colidirem com a área do texto.

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-12 — Texto na frente das tags — [mudança](../changes/2026-11-12-hero-texto-frente.md)
- 2026-11-03 — Ferramentas de física no hero — [mudança](../changes/2026-11-03-physics-tools-motion.md)
