---
id: .github/workflows/deploy.yml
label: Deploy CI
kind: config
group: infra
path: .github/workflows/deploy.yml
status: ativo
summary: Actions em push main: rsync ao VPS, rebuild do compose e alias Docker do Pátio.
updated: 2026-11-26
links:
  - to: docker-compose.yml
    kind: configures
  - to: nginx.conf
    kind: configures
    label: indireto via rebuild
  - to: patio
    kind: configures
    label: docker network connect --alias patio
docs: []
---

# Deploy CI

Workflow GitHub Actions em push `main` / `workflow_dispatch`: rsync do repo para o VPS e `docker compose up -d --build`, depois garante alias `patio` na rede.

## Responsabilidades

- Publicar o portfólio sem commit manual no servidor.
- Recolocar o Pátio na rede Docker do portfolio após recreate.

## Entradas e saídas

- Entrada: código em `main`, secret SSH.
- Saída: contentor atualizado em `/var/www/portfolio`.

## Dependências

- Host VPS, Docker no servidor, contentor `patio-gustavo` vizinho.

## Decisões e cuidados

- Exclui `.git`, `node_modules`, `dist`, `ssl`, `.env` no rsync.
- Só a pasta do portfolio; outros projetos e o Pátio ficam ao lado.

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-21 — Reconexão do Pátio na rede — [mudança](../changes/2026-11-21-patio-proxy-deploy.md)
- 2026-11-03 — Deploy automático no VPS — [mudança](../changes/2026-11-03-i18n-deploy-vps.md)
