---
id: src/pages/ExperiencePage.tsx
label: Página de experiência
kind: page
group: frontend
path: src/pages/ExperiencePage.tsx
updated: 2026-11-21
links:
  - to: src/components/layout/site-header.tsx
    kind: renders
  - to: src/components/layout/site-footer.tsx
    kind: renders
  - to: src/components/sections/experiences.tsx
    kind: renders
  - to: src/lib/scroll-motion.ts
    kind: calls
docs: []
---

# Página de experiência

Casca da rota `/experiencia` (e EN). Só monta header, a seção de trajetória e footer.

## Responsabilidades

- Isolar a experiência profissional fora da home.
- Aplicar motion de página via `usePageMotion`.

## Entradas e saídas

- Entrada: rota `/experiencia`.
- Saída: layout completo da página.

## Dependências

- `ExperienceSection`, layout, scroll-motion.

## Decisões e cuidados

- Conteúdo e CV ficam em `experiences.tsx` / `data/experience.ts`, não nesta casca.

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-12 — Experiência em página própria — [mudança](../changes/2026-11-12-experiencia-curriculo.md)
