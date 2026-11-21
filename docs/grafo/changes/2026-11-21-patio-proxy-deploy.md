---
date: 2026-11-21
title: Pátio no domínio e rede no deploy
agent: historico
nodes:
  - nginx.conf
  - .github/workflows/deploy.yml
  - docker-compose.yml
  - ext:patio
files:
  - nginx.conf
  - .github/workflows/deploy.yml
refs:
  - commit:5bbe8e6
  - commit:2546c09
---

O nginx passa a fazer proxy de `/patio/`, `/ws` e `/terminal/` para o contentor do Pátio, sem link no menu do site. O workflow de deploy, após `docker compose up --build`, reconecta o contentor `patio-gustavo` à rede com alias `patio` para o DNS interno não quebrar.
