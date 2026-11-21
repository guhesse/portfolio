---
id: vite.config.ts
label: Vite config
kind: config
group: infra
path: vite.config.ts
updated: 2026-11-21
links:
  - to: public/adgile
    kind: configures
    label: middleware /adgile no dev
  - to: public/coliseu
    kind: configures
  - to: public/porsche
    kind: configures
  - to: index.html
    kind: configures
    label: inject meta via vite-plugin-html
docs: []
---

# Vite config

Configuração do bundler: React plugin, alias `@` → `src`, porta 7070, inject de meta no HTML e middleware que serve os apps estáticos em dev.

## Responsabilidades

- Build e HMR do SPA.
- Emular as rotas `/adgile`, `/coliseu`, `/porsche` no servidor de desenvolvimento.

## Entradas e saídas

- Entrada: código-fonte e `public/`.
- Saída: `dist/` em produção; server em 7070 em dev.

## Dependências

- `@vitejs/plugin-react`, `vite-plugin-html`, rolldown-vite.

## Decisões e cuidados

- Sem o middleware, os apps estáticos quebrariam no `npm run dev` (só nginx os cobre em prod).

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-19 — Middleware Coliseu/Porsche — [mudança](../changes/2026-11-19-webgl-coliseu-porsche.md)
