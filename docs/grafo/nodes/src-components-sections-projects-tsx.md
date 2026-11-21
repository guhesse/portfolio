---
id: src/components/sections/projects.tsx
label: Seção Trabalhos
kind: component
group: frontend
path: src/components/sections/projects.tsx
updated: 2026-11-21
links:
  - to: src/i18n/messages.ts
    kind: imports
    label: copy via useUi().projects
  - to: src/i18n/site-content.ts
    kind: reads
    label: lista de projetos
  - to: src/i18n/locale.ts
    kind: imports
  - to: src/lib/analytics.ts
    kind: calls
  - to: src/pages/ProjectPage.tsx
    kind: calls
    label: Link para /projetos/:slug
  - to: public/adgile
    kind: http
  - to: public/coliseu
    kind: http
  - to: public/porsche
    kind: http
docs: []
---

# Seção Trabalhos

Seção de portfólio: índice, título, filtros (todos / marca / ops) e grade/lista de cases com mídia.

## Responsabilidades

- Montar itens de marca a partir de `projects` e itens de operação (caps) com imagens fallback.
- Abrir case interno, PDF, URL externa ou app estático conforme o item.
- Filtrar e rastrear cliques.

## Entradas e saídas

- Entrada: locale, `messages.projects`, lista de projetos.
- Saída: markup da seção `#projetos`.

## Dependências

- i18n, analytics, rotas de case, apps estáticos.

## Decisões e cuidados

- O `h2` do título usa `whitespace-pre-line` para respeitar `\n` no título PT.
- Título e descrição também abrem o projeto (não só a mídia).

## Histórico

- 2026-11-21 — `whitespace-pre-line` no h2 do título para quebras do PT — [mudança](../changes/2026-11-21-titulo-trabalhos-quebras.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-12 — Título/descrição abrem o projeto — [mudança](../changes/2026-11-12-titulo-abre-projeto.md)
