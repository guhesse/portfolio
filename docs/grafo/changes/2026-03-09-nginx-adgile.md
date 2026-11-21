---
date: 2026-03-09
title: Rota nginx e build Adgile
agent: historico
nodes:
  - nginx.conf
  - public/adgile
  - src/components/sections/projects.tsx
files:
  - nginx.conf
  - public/adgile
refs:
  - commit:c8a981b
  - commit:18a2f95
  - commit:465c4a5
  - commit:ae43d1c
---

Adiciona a rota nginx para o app Adgile com fallback SPA correto e base `/adgile/`, expõe o botão no carrossel de projetos e refatora setas laterais do carrossel. Corrige regressões de rota que quebravam deep links.
