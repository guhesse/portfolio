---
id: ext:patio
label: Pátio
kind: external
group: external
path: ""
updated: 2026-11-21
links: []
docs:
  - nginx.conf
  - .github/workflows/deploy.yml
---

# Pátio

Aplicação irmã no VPS (contentor `patio-gustavo`). O nginx do portfolio faz proxy de `/patio/` (app) e de `/ws` + `/terminal/` (pixel/terminal) para as portas internas do Pátio.

## Responsabilidades

- Expor o Pátio no mesmo domínio sem aparecer no menu do portfólio.

## Entradas e saídas

- Entrada: requests em `/patio/`, `/ws`, `/terminal/`.
- Saída: upstream `patio:5217` / `patio:3100` na rede Docker.

## Dependências

- Alias DNS Docker `patio`; rede `portfolio_default`.

## Decisões e cuidados

- Depois de recreate do contentor portfolio, o alias some — o workflow reconecta com `docker network connect --alias patio`.

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-21 — Proxy e rede do Pátio — [mudança](../changes/2026-11-21-patio-proxy-deploy.md)
