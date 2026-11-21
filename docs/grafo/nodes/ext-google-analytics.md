---
id: ext:google-analytics
label: Google Analytics 4
kind: external
group: external
path: ""
updated: 2026-11-21
links: []
docs:
  - index.html
---

# Google Analytics 4

Propriedade GA4 usada pelo portfólio (measurement id configurado no `index.html` e nos pageviews do App).

## Responsabilidades

- Receber pageviews e eventos customizados via `gtag`.

## Entradas e saídas

- Entrada: eventos do front.
- Saída: relatórios no GA.

## Dependências

- Script `googletagmanager.com/gtag/js`.

## Decisões e cuidados

- Não documentar o id como segredo operacional além do que já está público no HTML.

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2025-11-25 — Inclusão do GA — [mudança](../changes/2025-11-25-ssl-ga.md)
