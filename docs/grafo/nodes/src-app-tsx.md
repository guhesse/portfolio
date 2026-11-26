---
id: src/App.tsx
label: App e rotas
kind: entry
group: frontend
path: src/App.tsx
status: ativo
summary: Orquestra as rotas do site (/, /en, cases, experiência) e a home em seções.
updated: 2026-11-26
links:
  - to: src/components/layout/site-header.tsx
    kind: renders
  - to: src/components/layout/site-footer.tsx
    kind: renders
  - to: src/components/sections/hero.tsx
    kind: renders
  - to: src/components/sections/projects.tsx
    kind: renders
  - to: src/components/sections/about.tsx
    kind: renders
  - to: src/components/sections/operations.tsx
    kind: renders
  - to: src/components/sections/process.tsx
    kind: renders
  - to: src/components/sections/testimonials.tsx
    kind: renders
  - to: src/components/sections/contact.tsx
    kind: renders
  - to: src/pages/ProjectPage.tsx
    kind: renders
    label: lazy /projetos/:slug
  - to: src/pages/ExperiencePage.tsx
    kind: renders
    label: lazy /experiencia
  - to: src/components/shared/scroll-to-top.tsx
    kind: renders
  - to: src/i18n/use-locale.ts
    kind: imports
  - to: src/lib/analytics.ts
    kind: calls
    label: pageview e scroll_depth
  - to: src/lib/scroll-motion.ts
    kind: calls
  - to: src/data/experience.ts
    kind: reads
    label: meta da página de experiência
docs: []
---

# App e rotas

Orquestra as rotas do site (`/`, `/en`, cases, experiência) e a home em seções. Também sincroniza título/meta/canonical/hreflang e rastreia pageviews e profundidade de scroll.

## Responsabilidades

- Definir `Routes` com prefixo EN opcional.
- Montar a home (header → seções → footer).
- Redirecionar `/ops` para `/#operacao`.
- Carregar `ProjectPage` e `ExperiencePage` com `lazy`/`Suspense`.

## Entradas e saídas

- Entrada: pathname e locale.
- Saída: página renderizada; eventos GA4; meta tags no `document`.

## Dependências

- Layout, seções da home, páginas lazy, i18n, analytics, scroll-motion, `experienceCopy`.

## Decisões e cuidados

- `OpsPage` não entra mais nas rotas; a operação vive na home.
- `DocumentLocale` recalcula SEO ao mudar locale ou rota.

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-12 — Experiência em página própria — [mudança](../changes/2026-11-12-experiencia-curriculo.md)
- 2026-11-12 — Operação reunida na home — [mudança](../changes/2026-11-12-operacao-na-home.md)
