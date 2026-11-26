---
date: 2026-11-26
title: Revisão de padrão do grafo
agent: grafista
nodes:
  - index.html
  - src/main.tsx
  - src/App.tsx
  - src/pages/OpsPage.tsx
  - src/components/sections/hero-tree.tsx
  - public/adgile
  - public/coliseu
  - nginx.conf
  - docker-compose.yml
  - vite.config.ts
  - .github/workflows/deploy.yml
  - ext:calendly
  - ext:google-analytics
  - ext:typekit
  - ext:whatsapp
files:
  - docs/grafo/README.md
  - docs/grafo/nodes
  - docs/grafo/changes/2026-11-26-revisao-padrao.md
refs:
  - commit:96460fc
  - /opt/patio/memoria/grafo-geral.md
---

Atualização de padrão sem mudança de código desde `96460fc`. README ganhou frontmatter completo (`status`, `url`, `repo`, `run`, `build`, `deploy`, `ports`, `commit`, `apps`) e `## Pendências e riscos`. Bibliotecas e apps irmãs saíram de `ext:`; restam Calendly, GA4, Typekit e WhatsApp. Todos os nós receberam `summary`/`status`, grupos na taxonomia de camadas, e OpsPage/HeroTree foram marcados `morto`. Passadas de dados e API: não há banco nem controllers HTTP neste repo.
