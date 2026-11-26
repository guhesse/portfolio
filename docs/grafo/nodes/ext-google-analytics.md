---
id: ext:google-analytics
label: Google Analytics 4
kind: external
group: infra
path: ""
status: ativo
summary: GA4 via gtag no index.html; pageviews e eventos custom do SPA.
updated: 2026-11-26
links: []
docs:
  - index.html
---

# Google Analytics 4

Propriedade GA4 do portfólio. A fila `gtag` começa no `index.html`; o script do Tag Manager só carrega após o evento `load`.

## Responsabilidades

- Receber pageviews e eventos customizados (`scroll_depth`, cliques de CTA/WhatsApp, section_view).

## Variáveis de ambiente

- Nenhuma; o measurement id está no HTML e em `src/App.tsx` (público no cliente).

## Quem chama

- `index.html` (bootstrap da fila e config).
- `src/App.tsx` (pageview por pathname).
- `src/lib/analytics.ts` e hooks (`useAnalytics`, `useSectionTracking`).

## Limites e custo

- Conta Google Analytics do autor; volume típico de site pessoal.

## Decisões e cuidados

- Script deferido pós-load para não atrapalhar a primeira pintura.

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2025-11-25 — Inclusão do GA — [mudança](../changes/2025-11-25-ssl-ga.md)
