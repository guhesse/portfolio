---
id: src/i18n/use-locale.ts
label: Hooks de locale
kind: module
group: frontend/i18n
path: src/i18n/use-locale.ts
status: ativo
summary: Hooks que ligam o pathname aos dicionários useLocale, useUi e useSiteContent.
updated: 2026-11-26
links:
  - to: src/i18n/locale.ts
    kind: imports
  - to: src/i18n/messages.ts
    kind: reads
  - to: src/i18n/site-content.ts
    kind: reads
docs: []
---

# Hooks de locale

Ponte React entre o pathname e os dicionários: `useLocale`, `useUi`, `useSiteContent`.

## Responsabilidades

- Expor locale atual, home path e pathFor(outro locale).
- Devolver `messages[locale]` e conteúdo localizado do site.

## Entradas e saídas

- Entrada: `useLocation()`.
- Saída: objetos tipados de UI e conteúdo.

## Dependências

- locale.ts, messages.ts, site-content.ts, react-router-dom.

## Decisões e cuidados

- Não há Context de idioma: o path é a fonte da verdade.

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
