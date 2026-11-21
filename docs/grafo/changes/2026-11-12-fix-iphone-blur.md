---
date: 2026-11-12
title: Remove blur que quebrava o iPhone
agent: historico
nodes:
  - src/components/shared/physics-tags.tsx
  - src/components/sections/hero.tsx
  - src/components/sections/projects.tsx
  - index.html
files:
  - src/components/shared/physics-tags.tsx
  - src/components/layout/site-header.tsx
  - index.html
refs:
  - commit:50977d9
---

Remove o desfoque/filtros que impediam o site de abrir no iPhone. Ajusta hero, tags, header e meta de color-scheme para manter o tema claro sem efeitos pesados.
