---
id: src/i18n/messages.ts
label: Mensagens i18n
kind: module
group: i18n
path: src/i18n/messages.ts
updated: 2026-11-21
links:
  - to: src/components/sections/projects.tsx
    kind: reads
    label: copy.projects consumido pela seção
docs: []
---

# Mensagens i18n

Textos da UI em português e inglês (`pt` e `en`), incluindo títulos e descrições das seções.

## Responsabilidades

- Manter as strings de interface por locale.
- Expor o objeto `messages` consumido pelos componentes de seção.

## Entradas e saídas

- Entrada: locale escolhido na UI.
- Saída: strings tipadas por seção (`projects`, `about`, etc.).

## Dependências

- Consumido por `src/components/sections/projects.tsx` e demais seções.

## Decisões e cuidados

- Quebras de linha no título PT de `projects.title` usam `\n` e dependem de `whitespace-pre-line` no `h2` que as renderiza.
- A versão EN de `projects.title` permanece em uma linha só.

## Histórico

- 2026-11-21 — Texto de direitos do rodapé PT encurtado — [mudança](../changes/2026-11-21-texto-direitos-rodape-pt.md)
- 2026-11-21 — Título PT de Trabalhos com quebras em 3 linhas — [mudança](../changes/2026-11-21-titulo-trabalhos-quebras.md)
