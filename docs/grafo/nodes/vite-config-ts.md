---
id: vite.config.ts
label: Vite config
kind: config
group: infra
path: vite.config.ts
status: ativo
summary: Vite com React, alias @, porta 7070, meta HTML e middleware /adgile e /coliseu.
updated: 2026-11-26
links:
  - to: public/adgile
    kind: configures
    label: middleware /adgile no dev
  - to: public/coliseu
    kind: configures
  - to: index.html
    kind: configures
    label: inject meta via vite-plugin-html
docs: []
---

# Vite config

Configuração do bundler: React plugin, alias `@` → `src`, porta 7070, inject de meta no HTML e middleware que serve Adgile e Coliseu em dev.

## Responsabilidades

- Build e HMR do SPA.
- Emular as rotas `/adgile` e `/coliseu` no servidor de desenvolvimento.

## Entradas e saídas

- Entrada: código-fonte e `public/`.
- Saída: `dist/` em produção; server em 7070 em dev.

## Dependências

- `@vitejs/plugin-react`, `vite-plugin-html`, rolldown-vite.

## Decisões e cuidados

- Sem o middleware, Adgile/Coliseu quebrariam no `npm run dev` (só nginx os cobre em prod).
- `/porsche` não é mais emulado aqui — vem do bind mount em prod; em local use o preview do porsche-911.

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-22 — Remove middleware `/porsche` (bind mount) — [mudança](../changes/2026-11-22-porsche-bind-mount.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-19 — Middleware Coliseu/Porsche — [mudança](../changes/2026-11-19-webgl-coliseu-porsche.md)
