---
id: src/pages/ProjectPage.tsx
label: Página de case
kind: page
group: frontend
path: src/pages/ProjectPage.tsx
updated: 2026-11-21
links:
  - to: src/components/layout/site-header.tsx
    kind: renders
  - to: src/components/layout/site-footer.tsx
    kind: renders
  - to: src/components/sections/hero-dots.tsx
    kind: renders
  - to: src/components/shared/pdf-carousel.tsx
    kind: renders
    label: lazy quando há PDF
  - to: src/i18n/use-locale.ts
    kind: imports
  - to: src/lib/analytics.ts
    kind: calls
  - to: src/lib/scroll-motion.ts
    kind: calls
docs: []
---

# Página de case

Rota `/projetos/:slug` (e `/en/projetos/:slug`). Mostra o detalhe de um projeto a partir do slug: desafio, solução, galeria, cores, PDF etc.

## Responsabilidades

- Resolver o projeto pelo slug em `useSiteContent().projects`.
- Renderizar galeria de imagens com swipe/setas ou `PdfCarousel`.
- Registrar eventos de galeria e links externos.

## Entradas e saídas

- Entrada: param `slug`, locale, dados do projeto.
- Saída: página de case; 404 amigável se o slug não existir.

## Dependências

- Header/footer, hero-dots, pdf-carousel, i18n, analytics, scroll-motion.

## Decisões e cuidados

- Layout em “grade de linhas” alinhado ao restante do site.
- PetCare ficou limitado ao pitch deck (PDF), sem galeria completa.

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-15 — Cases Angélica/Orçamenta e PetCare em deck — [mudança](../changes/2026-11-15-cases-angelica-orcamenta.md)
