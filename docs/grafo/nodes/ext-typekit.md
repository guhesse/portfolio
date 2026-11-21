---
id: ext:typekit
label: Adobe Fonts (Typekit)
kind: external
group: external
path: ""
updated: 2026-11-21
links: []
docs:
  - index.html
---

# Adobe Fonts (Typekit)

Kit de fontes do site (`use.typekit.net`), carregado de forma assíncrona no HTML.

## Responsabilidades

- Tipografia display/corpo do brand.

## Entradas e saídas

- Entrada: CSS do kit.
- Saída: fontes aplicadas via classes no CSS do app.

## Dependências

- CDN Typekit.

## Decisões e cuidados

- `media="print" onload` evita bloquear render.

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
