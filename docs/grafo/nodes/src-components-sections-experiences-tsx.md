---
id: src/components/sections/experiences.tsx
label: Seção Experiência
kind: component
group: frontend/sections
path: src/components/sections/experiences.tsx
status: ativo
summary: Lista expansível de trajetória e download do currículo em PDF.
updated: 2026-11-26
links:
  - to: src/components/shared/section-heading.tsx
    kind: renders
  - to: src/data/experience.ts
    kind: reads
  - to: src/i18n/use-locale.ts
    kind: imports
  - to: src/lib/analytics.ts
    kind: calls
docs: []
---

# Seção Experiência

Lista expansível de cargos/trajetória e botão para baixar o currículo (PDF PT ou EN).

## Responsabilidades

- Renderizar itens de `experienceCopy[locale]`.
- Oferecer download dos assets `Gustavo_Hesse_CV_*.pdf`.

## Entradas e saídas

- Entrada: locale.
- Saída: conteúdo principal de `/experiencia`.

## Dependências

- experience data, section-heading, analytics.

## Decisões e cuidados

- Expansão suave espelha o padrão dos depoimentos (hover fino vs clique).

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-12 — Página e CV — [mudança](../changes/2026-11-12-experiencia-curriculo.md)
