---
id: ext:typekit
label: Adobe Fonts (Typekit)
kind: external
group: infra
path: ""
status: ativo
summary: Adobe Fonts (Typekit) carregado no index.html para a tipografia do site.
updated: 2026-11-26
links: []
docs:
  - index.html
---

# Adobe Fonts (Typekit)

Kit de fontes do site em `use.typekit.net`, carregado de forma assíncrona no HTML.

## Responsabilidades

- Tipografia display/corpo do brand.

## Variáveis de ambiente

- Nenhuma; o id do kit está no `href` do stylesheet em `index.html`.

## Quem chama

- `index.html` (preconnect + stylesheet com `media="print" onload`).

## Limites e custo

- Conta Adobe Fonts; CDN externa — offline local perde as webfonts.

## Decisões e cuidados

- `media="print" onload` evita bloquear o render.

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
