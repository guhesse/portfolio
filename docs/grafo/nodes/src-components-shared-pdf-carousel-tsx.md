---
id: src/components/shared/pdf-carousel.tsx
label: Carrossel PDF
kind: component
group: frontend/shared
path: src/components/shared/pdf-carousel.tsx
status: ativo
summary: Renderiza PDF página a página com pdf.js para cases com deck ou manual.
updated: 2026-11-26
links:
  - to: src/i18n/use-locale.ts
    kind: imports
  - to: src/lib/analytics.ts
    kind: calls
docs: []
---

# Carrossel PDF

Renderiza um PDF página a página com pdf.js (canvas + miniaturas), usado em cases com deck/manual.

## Responsabilidades

- Carregar o documento, gerar thumbs e navegar por swipe/setas/teclado.
- Emitir eventos de visualização de página.

## Entradas e saídas

- Entrada: `src` do PDF, título, slug opcional.
- Saída: UI de carrossel; fallback se falhar o load.

## Dependências

- pdfjs-dist (worker via URL Vite), analytics, i18n.

## Decisões e cuidados

- Worker configurado com `?url` do Vite para o build estático.

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-13 — Manual All Ways / decks — [mudança](../changes/2026-11-13-floume-allways-petcare.md)
