---
id: src/components/sections/projects.tsx
label: Seção Trabalhos
kind: component
group: frontend
path: src/components/sections/projects.tsx
updated: 2026-11-21
links:
  - to: src/i18n/messages.ts
    kind: imports
    label: copy = messages[locale].projects
docs: []
---

# Seção Trabalhos

Seção de portfólio/projetos: índice, título, filtros e carrossel de cases.

## Responsabilidades

- Renderizar o cabeçalho da seção (índice, título, descrição) e a lista filtrável de projetos.

## Entradas e saídas

- Entrada: `locale` e `messages[locale].projects`.
- Saída: markup da seção `#projetos`.

## Dependências

- `src/i18n/messages.ts` para os textos.

## Decisões e cuidados

- O `h2` do título usa `whitespace-pre-line` para respeitar `\n` no título PT sem afetar o EN (sem quebras).

## Histórico

- 2026-11-21 — `whitespace-pre-line` no h2 do título para quebras do PT — [mudança](../changes/2026-11-21-titulo-trabalhos-quebras.md)
