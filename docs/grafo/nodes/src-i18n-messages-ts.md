---
id: src/i18n/messages.ts
label: Mensagens i18n
kind: module
group: i18n
path: src/i18n/messages.ts
updated: 2026-11-21
links: []
docs: []
---

# Mensagens i18n

Textos de interface em português e inglês (`pt` e `en`): meta, hero, header, footer, seções, ops, project page etc.

## Responsabilidades

- Manter as strings de UI por locale.
- Expor o objeto `messages` tipado como `Messages`.

## Entradas e saídas

- Entrada: locale escolhido via path.
- Saída: strings consumidas por `useUi()`.

## Dependências

- Consumido indiretamente por quase todas as seções via `use-locale`.

## Decisões e cuidados

- Quebras de linha no título PT de `projects.title` usam `\n` e dependem de `whitespace-pre-line` no `h2`.
- EN de `projects.title` permanece em uma linha.
- `footer.rights` PT foi encurtado para "Direitos reservados.".

## Histórico

- 2026-11-21 — Texto de direitos do rodapé PT encurtado — [mudança](../changes/2026-11-21-texto-direitos-rodape-pt.md)
- 2026-11-21 — Título PT de Trabalhos com quebras em 3 linhas — [mudança](../changes/2026-11-21-titulo-trabalhos-quebras.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
