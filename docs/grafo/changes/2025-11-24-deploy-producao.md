---
date: 2025-11-24
title: Deploy em produção e meet→Calendly
agent: historico
nodes:
  - Dockerfile
  - docker-compose.yml
  - nginx.conf
  - ext:calendly
files:
  - Dockerfile
  - docker-compose.yml
  - deploy.sh
  - nginx.conf
refs:
  - commit:a117e60
  - commit:928b40c
  - commit:652e79c
  - commit:edf363d
---

Configura o projeto para deploy em produção com Docker/nginx, scripts de deploy/rebuild e redirecionamento de `meet.gustavohesse.com.br` para o Calendly.
