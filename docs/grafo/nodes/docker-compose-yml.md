---
id: docker-compose.yml
label: Compose
kind: config
group: infra
path: docker-compose.yml
updated: 2026-11-22
links:
  - to: Dockerfile
    kind: uses
  - to: ext:porsche-911
    kind: uses
    label: bind mount dist → /porsche
docs: []
---

# Compose

Serviço único `portfolio` → contentor `portfolio-gustavo`, ports 80/443, volumes read-only de SSL e do dist do porsche-911 em `/usr/share/nginx/html/porsche`, restart unless-stopped.

## Responsabilidades

- Orquestrar o contentor de produção localmente e no VPS.
- Expor o build do porsche-911 em `/porsche/` sem embutir no image build.

## Entradas e saídas

- Entrada: build context `.`; path host `/var/www/porsche-911/dist`.
- Saída: contentor em execução.

## Dependências

- Dockerfile, certificados em `ssl/`, dist do repo porsche-911.

## Decisões e cuidados

- O Pátio **não** é serviço deste compose; só entra na rede depois via `docker network connect`.
- Se o path do dist não existir no host, o Docker cria pasta vazia e `/porsche/` fica 404.

## Histórico

- 2026-11-22 — Bind mount do porsche-911 — [mudança](../changes/2026-11-22-porsche-bind-mount.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-21 — Rede do Pátio no deploy — [mudança](../changes/2026-11-21-patio-proxy-deploy.md)
