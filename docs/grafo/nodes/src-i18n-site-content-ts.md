---
id: src/i18n/site-content.ts
label: Conteúdo localizado
kind: module
group: frontend/i18n
path: src/i18n/site-content.ts
status: ativo
summary: Traduz navegação, projetos, processo e depoimentos a partir da base em content.ts.
updated: 2026-11-26
links:
  - to: src/data/content.ts
    kind: imports
    label: base PT de projetos/processo/depoimentos
docs: []
---

# Conteúdo localizado

`getSiteContent(locale)` traduz navegação, projetos, processo e depoimentos a partir da base em `data/content.ts`.

## Responsabilidades

- Overlay EN sobre títulos/industries/descriptions/details dos projetos.
- Manter a lista de projetos alinhada à fonte PT.

## Entradas e saídas

- Entrada: locale.
- Saída: `SiteContent` consumido pelas seções e pela ProjectPage.

## Dependências

- `src/data/content.ts`.

## Decisões e cuidados

- Novos cases exigem entrada em `content.ts` e, se necessário, bloco em `projectEn`.

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-15 — Cases Angélica/Orçamenta — [mudança](../changes/2026-11-15-cases-angelica-orcamenta.md)
- 2026-11-19 — Coliseu e Porsche no conteúdo — [mudança](../changes/2026-11-19-webgl-coliseu-porsche.md)
