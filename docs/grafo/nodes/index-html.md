---
id: index.html
label: Shell HTML
kind: entry
group: frontend
path: index.html
updated: 2026-11-21
links:
  - to: src/main.tsx
    kind: imports
  - to: ext:google-analytics
    kind: uses
  - to: ext:typekit
    kind: http
    label: fontes Adobe Fonts
docs: []
---

# Shell HTML

Documento base do SPA: meta OG/Twitter, canonical/hreflang, tema claro forçado, Typekit e fila gtag antes do bundle.

## Responsabilidades

- SEO e compartilhamento social (`portfolio.png`).
- Pré-carregar tipografia e analytics sem bloquear a primeira pintura.

## Entradas e saídas

- Entrada: placeholders do `vite-plugin-html`.
- Saída: página que monta React.

## Dependências

- Vite HTML plugin, GA, Typekit.

## Decisões e cuidados

- `color-scheme: only light` e remoção de classe `dark` evitam tema escuro indesejado.
- Blur/filtros pesados no CSS já impediram abertura no iPhone.

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-21 — Arte de compartilhamento — [mudança](../changes/2026-11-21-arte-compartilhamento.md)
- 2025-11-25 — GA e SSL — [mudança](../changes/2025-11-25-ssl-ga.md)
