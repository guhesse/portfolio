---
date: 2026-11-22
title: Porsche servido por bind mount do repo porsche-911
agent: artesao
nodes:
  - ext:porsche-911
  - docker-compose.yml
  - vite.config.ts
  - nginx.conf
  - src/data/content.ts
  - src/components/sections/projects.tsx
files:
  - docker-compose.yml
  - vite.config.ts
  - public/porsche
  - docs/grafo/nodes/ext-porsche-911.md
  - docs/grafo/nodes/public-porsche.md
  - docs/grafo/nodes/docker-compose-yml.md
  - docs/grafo/nodes/vite-config-ts.md
  - docs/grafo/nodes/nginx-conf.md
  - docs/grafo/nodes/src-data-content-ts.md
  - docs/grafo/nodes/src-components-sections-projects-tsx.md
  - docs/grafo/README.md
refs: []
---

Remove a cópia versionada em `public/porsche/` e passa a servir `/porsche/` do build do repo porsche-911 via volume bind read-only no compose. O middleware de dev do Vite deixa de emular `/porsche`; nginx continua com as mesmas locations (agora sobre o mount). Push no porsche-911 atualiza a página sem rebuild do portfólio. Conferir: `npm run build` sem pasta `dist/porsche`; se o path host do dist não existir, o Docker cria diretório vazio e `/porsche/` dá 404.
