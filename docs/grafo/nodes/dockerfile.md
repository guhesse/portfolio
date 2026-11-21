---
id: Dockerfile
label: Imagem Docker
kind: config
group: infra
path: Dockerfile
updated: 2026-11-21
links:
  - to: nginx.conf
    kind: configures
  - to: docker-compose.yml
    kind: uses
docs:
  - quick-deploy.md
  - deploy.sh
---

# Imagem Docker

Build multi-stage: `node:20-alpine` instala deps, roda `npm run build`; `nginx:alpine` copia `dist/` e `nginx.conf`.

## Responsabilidades

- Produzir a imagem servida como `portfolio-gustavo`.

## Entradas e saídas

- Entrada: código do repo.
- Saída: imagem nginx na porta 80 (443 mapeada no compose com volume SSL).

## Dependências

- `docker-compose.yml` monta `./ssl` e publica 80/443.

## Decisões e cuidados

- `NODE_ENV=production` no compose; rebuild via compose no CI.

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2025-11-24 — Deploy em produção — [mudança](../changes/2025-11-24-deploy-producao.md)
