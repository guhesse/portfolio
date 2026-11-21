---
date: 2026-11-21
title: Título PT de Trabalhos em 3 linhas
agent: cursor
nodes:
  - src/i18n/messages.ts
  - src/components/sections/projects.tsx
files:
  - src/i18n/messages.ts
  - src/components/sections/projects.tsx
refs: []
---

O título da seção Trabalhos em português passa a quebrar em três linhas ("Identidades visuais" / "que viraram pontos" / "de conexão reais.") via `\n` em `projects.title` (objeto `pt`) e `whitespace-pre-line` no `h2`. A string EN permanece igual. Conferir com `npm run build` e visualmente em PT vs EN.
