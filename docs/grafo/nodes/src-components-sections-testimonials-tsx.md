---
id: src/components/sections/testimonials.tsx
label: Seção Depoimentos
kind: component
group: frontend/sections
path: src/components/sections/testimonials.tsx
status: ativo
summary: Lista de depoimentos com expansão suave no hover ou toque.
updated: 2026-11-26
links:
  - to: src/components/shared/section-heading.tsx
    kind: renders
  - to: src/i18n/use-locale.ts
    kind: imports
  - to: src/lib/analytics.ts
    kind: calls
docs: []
---

# Seção Depoimentos

Lista de depoimentos com expansão suave (hover em ponteiro fino; toque/clique no restante).

## Responsabilidades

- Mostrar quotes de `site-content.testimonials`.
- Alternar resumo/texto completo sem carrossel obrigatório.

## Entradas e saídas

- Entrada: testimonials localizados.
- Saída: seção de depoimentos.

## Dependências

- section-heading, i18n.

## Decisões e cuidados

- Em 2026-11-12 o hover passou a abrir o texto completo (`fcc855c`).

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-12 — Depoimentos no hover — [mudança](../changes/2026-11-12-operacao-na-home.md)
