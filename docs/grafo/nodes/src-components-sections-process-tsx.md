---
id: src/components/sections/process.tsx
label: Seção Processo
kind: component
group: frontend
path: src/components/sections/process.tsx
updated: 2026-11-21
links:
  - to: src/i18n/use-locale.ts
    kind: imports
  - to: src/lib/analytics.ts
    kind: calls
docs: []
---

# Seção Processo

Passos do método de trabalho em grade de colunas com linhas (bleed rules).

## Responsabilidades

- Listar etapas e entregáveis a partir de `site-content.process`.
- Manter o layout de “grade de linhas” do redesign.

## Entradas e saídas

- Entrada: process steps + copy de UI.
- Saída: seção `#processo`.

## Dependências

- i18n / site-content.

## Decisões e cuidados

- Cards com tilt/hover existiram; o layout atual prioriza colunas tipográficas.

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-12 — Grade de linhas no portfólio — [mudança](../changes/2026-11-12-operacao-na-home.md)
