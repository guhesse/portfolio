---
id: scripts/optimize-images.mjs
label: Otimizar imagens
kind: script
group: tooling
path: scripts/optimize-images.mjs
status: ativo
summary: Converte PNG/JPEG de public/images para WebP com sharp e remove os originais.
updated: 2026-11-26
links: []
docs: []
---

# Otimizar imagens

Script Node que percorre `public/images`, converte PNG/JPEG em WebP (sharp) e remove os originais pesados.

## Responsabilidades

- Manter capas e galerias leves para o portfólio.

## Entradas e saídas

- Entrada: imagens raster em `public/images`.
- Saída: `.webp` (largura máx. 640 no about, 1100 nos demais).

## Dependências

- `sharp` (dev/uso manual).

## Decisões e cuidados

- Rodar sob demanda; não faz parte do `npm run build`.

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-03 — Imagens leves no lançamento bilíngue — [mudança](../changes/2026-11-03-i18n-deploy-vps.md)
