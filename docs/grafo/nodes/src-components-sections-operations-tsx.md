---
id: src/components/sections/operations.tsx
label: Seção Operação
kind: component
group: frontend
path: src/components/sections/operations.tsx
updated: 2026-11-21
links:
  - to: src/i18n/use-locale.ts
    kind: imports
  - to: src/lib/analytics.ts
    kind: calls
docs: []
---

# Seção Operação

Seção `#operacao` da home com métricas animadas (count-up) e copy de Creative Operations.

## Responsabilidades

- Mostrar números da operação quando a seção entra no viewport.
- Respeitar `prefers-reduced-motion`.

## Entradas e saídas

- Entrada: `messages.ops` / UI de operação.
- Saída: seção com estatísticas.

## Dependências

- i18n, section-tracking.

## Decisões e cuidados

- Substitui a landing `/ops` no fluxo atual; `OpsPage` permanece legado.

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-12 — Operação reunida na home — [mudança](../changes/2026-11-12-operacao-na-home.md)
