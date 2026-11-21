---
id: src/components/shared/scroll-to-top.tsx
label: ScrollToTop
kind: component
group: frontend
path: src/components/shared/scroll-to-top.tsx
updated: 2026-11-21
links:
  - to: src/i18n/locale.ts
    kind: imports
    label: stripLocale
docs: []
---

# ScrollToTop

Componente sem UI que rola a janela para o topo em mudanças de rota (exceto troca só de hash na home).

## Responsabilidades

- Evitar que o usuário caia no meio da página ao navegar entre rotas.

## Entradas e saídas

- Entrada: pathname/hash do React Router.
- Saída: `window.scrollTo(0, 0)` quando apropriado.

## Dependências

- react-router-dom, `stripLocale`.

## Decisões e cuidados

- Não resetar scroll em âncoras da mesma página.

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
