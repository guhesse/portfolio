---
id: src/components/ui
label: UI shadcn/Radix
kind: component
group: frontend
path: src/components/ui
status: ativo
summary: Primitives shadcn/Radix (Button, Sheet, Dialog e afins) compartilhados pelo site.
updated: 2026-11-26
links: []
docs:
  - components.json
---

# UI shadcn/Radix

Biblioteca de primitives (Button, Sheet, Dialog, etc.) gerada no estilo shadcn. O site usa sobretudo Sheet no header; várias peças existem por scaffold e não aparecem nas seções principais.

## Responsabilidades

- Fornecer componentes acessíveis baseados em Radix + Tailwind.

## Entradas e saídas

- Entrada: props de cada primitive.
- Saída: elementos de UI.

## Dependências

- `@radix-ui/*`, `class-variance-authority`, `src/lib/utils.ts`.

## Decisões e cuidados

- Configurado em `components.json` (estilo new-york / aliases `@/`).

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
