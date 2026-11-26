---
id: src/components/sections/hero-tree.tsx
label: HeroTree (morto)
kind: component
group: frontend/sections
path: src/components/sections/hero-tree.tsx
status: morto
summary: Árvore Three.js usada só pela OpsPage; sem importadores ativos no fluxo atual.
updated: 2026-11-26
links: []
docs: []
---

# HeroTree (morto)

Visualização Three.js usada só por `OpsPage` (também morto). Não entra na home atual.

## Responsabilidades

- Ilustrar a operação criativa na página Ops legada.

## Entradas e saídas

- Entrada: props de copy/estatísticas vindas de `OpsPage`.
- Saída: markup animado.

## Dependências

- Consumido apenas por `src/pages/OpsPage.tsx`.

## Decisões e cuidados

- Grande arquivo (~570 linhas) preservado junto com a página legado.

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-12 — Criado com a página Ops — [mudança](../changes/2026-11-12-operacao-na-home.md)
