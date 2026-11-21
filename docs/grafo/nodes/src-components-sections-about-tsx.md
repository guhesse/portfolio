---
id: src/components/sections/about.tsx
label: Seção Sobre
kind: component
group: frontend
path: src/components/sections/about.tsx
updated: 2026-11-21
links:
  - to: src/i18n/use-locale.ts
    kind: imports
  - to: src/lib/analytics.ts
    kind: calls
    label: section_view via useSectionTracking
docs: []
---

# Seção Sobre

Bloco biográfico com foto, título, texto, citação e tags de competências.

## Responsabilidades

- Apresentar o autor na home.
- Disparar `section_view` para `sobre`.

## Entradas e saídas

- Entrada: `messages.about`.
- Saída: seção `#sobre`.

## Dependências

- i18n; imagem em `/images/about/foto-gus.webp`.

## Decisões e cuidados

- Foto em webp leve; citação em duas linhas com `whitespace-nowrap`.

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
