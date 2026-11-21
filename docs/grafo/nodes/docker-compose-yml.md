---
id: docker-compose.yml
label: Compose
kind: config
group: infra
path: docker-compose.yml
updated: 2026-11-21
links:
  - to: Dockerfile
    kind: uses
docs: []
---

# Compose

Serviço único `portfolio` → contentor `portfolio-gustavo`, ports 80/443, volume read-only de SSL, restart unless-stopped.

## Responsabilidades

- Orquestrar o contentor de produção localmente e no VPS.

## Entradas e saídas

- Entrada: build context `.`
- Saída: contentor em execução.

## Dependências

- Dockerfile, certificados em `ssl/`.

## Decisões e cuidados

- O Pátio **não** é serviço deste compose; só entra na rede depois via `docker network connect`.

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-21 — Rede do Pátio no deploy — [mudança](../changes/2026-11-21-patio-proxy-deploy.md)
