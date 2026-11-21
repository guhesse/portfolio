---
date: 2026-11-19
title: Experiências WebGL Coliseu e Porsche
agent: historico
nodes:
  - public/coliseu
  - public/porsche
  - src/data/content.ts
  - src/i18n/site-content.ts
  - vite.config.ts
  - nginx.conf
  - src/components/shared/physics-tags.tsx
files:
  - public/coliseu
  - public/porsche
  - src/data/content.ts
  - vite.config.ts
  - nginx.conf
  - src/components/shared/physics-tags.tsx
refs:
  - commit:023c9a2
  - commit:1775caa
---

Publica os estudos WebGL do Coliseu e do Carrera 4S como apps estáticos em `/coliseu` e `/porsche`, com locations no nginx, middleware no Vite e entradas no portfólio. Em seguida atualiza as capas e devolve o clique que solta tags no hero.
