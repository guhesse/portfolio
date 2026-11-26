---
id: src/pages/OpsPage.tsx
label: OpsPage (morto)
kind: page
group: frontend/pages
path: src/pages/OpsPage.tsx
status: morto
summary: Landing antiga de Creative Operations; App redireciona /ops e nada a importa.
updated: 2026-11-26
links:
  - to: src/components/layout/site-header.tsx
    kind: renders
  - to: src/components/layout/site-footer.tsx
    kind: renders
  - to: src/components/sections/hero-dots.tsx
    kind: renders
  - to: src/components/sections/hero-tree.tsx
    kind: renders
  - to: src/i18n/use-locale.ts
    kind: imports
  - to: src/lib/analytics.ts
    kind: calls
  - to: src/lib/scroll-motion.ts
    kind: calls
docs: []
---

# OpsPage (morto)

Página completa de Creative Operations criada em 2026-11-12. Continua no repositório (com `HeroTree` e métricas), mas **não está ligada às rotas**: `App` redireciona `/ops` para `/#operacao`.

## Responsabilidades

- Histórico: landing dedicada de operação criativa.
- Status `morto`: nenhum importador; `/ops` só redireciona. A UI viva está em `operations.tsx`.

## Entradas e saídas

- Nenhuma via router atual.
- Se importada, renderizaria header, árvore/hero e footer.

## Dependências

- `hero-tree`, hero-dots, layout, i18n, analytics.

## Decisões e cuidados

- Manter no grafo para não perder o rastro; não confundir com a seção ativa `#operacao`.

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-12 — Página Ops criada e depois operação na home — [mudança](../changes/2026-11-12-operacao-na-home.md)
