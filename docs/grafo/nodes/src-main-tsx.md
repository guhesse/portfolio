---
id: src/main.tsx
label: Entrada React
kind: entry
group: frontend
path: src/main.tsx
updated: 2026-11-21
links:
  - to: src/App.tsx
    kind: renders
    label: monta App no #root
  - to: ext:react-router
    kind: uses
    label: BrowserRouter
docs: []
---

# Entrada React

Ponto de entrada do SPA. Monta `App` em `#root` dentro de `StrictMode` e envolve tudo com `BrowserRouter`.

## Responsabilidades

- Inicializar React DOM.
- Garantir roteamento no cliente para as rotas PT/EN.

## Entradas e saídas

- Entrada: `index.html` com `#root` e o bundle Vite.
- Saída: árvore React roteada.

## Dependências

- `src/App.tsx`, `react-dom`, `react-router-dom`, `src/index.css`.

## Decisões e cuidados

- O idioma não é um provider separado: o locale é derivado do pathname nas rotas.

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
