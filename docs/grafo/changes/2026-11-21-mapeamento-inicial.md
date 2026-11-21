---
date: 2026-11-21
title: Mapeamento inicial da arquitetura
agent: grafista
nodes:
  - src/main.tsx
  - src/App.tsx
  - src/pages/ProjectPage.tsx
  - src/pages/ExperiencePage.tsx
  - src/pages/OpsPage.tsx
  - src/components/layout/site-header.tsx
  - src/components/layout/site-footer.tsx
  - src/components/sections/hero.tsx
  - src/components/sections/projects.tsx
  - src/components/sections/operations.tsx
  - src/i18n/messages.ts
  - src/data/content.ts
  - nginx.conf
  - .github/workflows/deploy.yml
  - public/adgile
  - public/coliseu
  - public/porsche
  - ext:patio
files:
  - docs/grafo/README.md
  - docs/grafo/nodes
  - docs/grafo/changes
refs:
  - .claude/skills/grafo-docs/SKILL.md
---

Mapeamento completo do portfólio no formato grafo-docs: visão geral, nós das partes (SPA React, seções, i18n, dados, apps estáticos, nginx/Docker/deploy e externos) e histórico consolidado a partir do git. Preserva as mudanças pontuais de copy já registradas no mesmo dia. Conferir a pasta `docs/grafo` no Pátio.
