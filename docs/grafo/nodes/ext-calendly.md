---
id: ext:calendly
label: Calendly
kind: external
group: external
path: ""
updated: 2026-11-21
links: []
docs:
  - nginx.conf
  - quick-deploy.md
---

# Calendly

Agendamento de call; o subdomínio `meet.gustavohesse.com.br` redireciona para a página de 30 minutos.

## Responsabilidades

- Oferecer booking sem UI própria no React.

## Entradas e saídas

- Entrada: HTTP(S) no host meet.
- Saída: 301 para Calendly.

## Dependências

- Blocos `server` no nginx.

## Decisões e cuidados

- Redirect existe em 80 e 443.

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-03-16 — Link Calendly / GA4 — [mudança](../changes/2026-03-16-ga4-calendly.md)
- 2025-11-24 — Redirect meet — [mudança](../changes/2025-11-24-deploy-producao.md)
