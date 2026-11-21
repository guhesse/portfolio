---
id: src/lib/analytics.ts
label: Analytics GA4
kind: module
group: frontend
path: src/lib/analytics.ts
updated: 2026-11-21
links:
  - to: ext:google-analytics
    kind: calls
docs:
  - index.html
---

# Analytics GA4

`trackEvent` / `trackExternalLink` e os hooks `useAnalytics` / `useSectionTracking` que encapsulam `window.gtag`.

## Responsabilidades

- Padronizar eventos (section_view, navigation_click, scroll_depth, gallery, social…).
- Não quebrar se gtag ainda não carregou.

## Entradas e saídas

- Entrada: nome do evento e params.
- Saída: chamada `gtag('event', ...)` quando disponível.

## Dependências

- `ext:google-analytics` (script adiado no `index.html`, id G-C92MBMCXNL).
- Hooks em `src/hooks/` reexportam esta API.

## Decisões e cuidados

- A fila `dataLayer` começa cedo; o script do GTM só após `load`.

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2025-11-25 — GA e SSL — [mudança](../changes/2025-11-25-ssl-ga.md)
- 2026-03-16 — GA4 e Calendly — [mudança](../changes/2026-03-16-ga4-calendly.md)
