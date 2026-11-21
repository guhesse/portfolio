---
date: 2026-11-03
title: Site bilíngue, imagens leves e deploy no VPS
agent: historico
nodes:
  - src/i18n/messages.ts
  - src/i18n/locale.ts
  - src/i18n/site-content.ts
  - .github/workflows/deploy.yml
  - scripts/optimize-images.mjs
  - index.html
files:
  - src/i18n
  - .github/workflows/deploy.yml
  - public/images
refs:
  - commit:b3f7aa7
---

Publica o site em português e inglês, converte imagens para webp e adiciona deploy automático no VPS via GitHub Actions. Define o padrão de locale pelo path ainda usado hoje.
