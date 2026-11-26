---
id: ext:calendly
label: Calendly
kind: external
group: infra
path: ""
status: ativo
summary: Agendamento externo; meet.gustavohesse.com.br e a seção Contato apontam para cá.
updated: 2026-11-26
links: []
docs:
  - nginx.conf
  - quick-deploy.md
---

# Calendly

Agendamento de call de 30 minutos. O subdomínio `meet.gustavohesse.com.br` redireciona para a página pública; a seção Contato também linka direto.

## Responsabilidades

- Oferecer booking sem UI própria no React.

## Variáveis de ambiente

- Nenhuma; a URL pública do evento está hardcoded em `nginx.conf` e em `src/components/sections/contact.tsx`.

## Quem chama

- `nginx.conf` (301 em HTTP e HTTPS no host meet).
- `src/components/sections/contact.tsx` (CTA "marcar um papo").

## Limites e custo

- Conta Calendly do autor; disponibilidade definida no calendário externo.

## Decisões e cuidados

- Redirect existe em 80 e 443.

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-03-16 — Link Calendly / GA4 — [mudança](../changes/2026-03-16-ga4-calendly.md)
- 2025-11-24 — Redirect meet — [mudança](../changes/2025-11-24-deploy-producao.md)
