---
id: src/components/sections/hero-tree.tsx
label: HeroTree (legado Ops)
kind: component
group: frontend
path: src/components/sections/hero-tree.tsx
updated: 2026-11-21
links: []
docs: []
---

# HeroTree (legado Ops)

Visualização em árvore/animação usada só por `OpsPage`. Não entra na home atual.

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

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-12 — Criado com a página Ops — [mudança](../changes/2026-11-12-operacao-na-home.md)
