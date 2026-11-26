---
id: ext:whatsapp
label: WhatsApp
kind: external
group: infra
path: ""
status: ativo
summary: Deep links wa.me usados nos CTAs de conversa do header, contato e rodapé.
updated: 2026-11-26
links: []
docs: []
---

# WhatsApp

Canal principal de contato via `wa.me`, com mensagem pré-preenchida por idioma.

## Responsabilidades

- Receber leads do header, footer e seção contato.

## Variáveis de ambiente

- Nenhuma; número e textos estão em `src/i18n/locale.ts` (`whatsappUrl`).

## Quem chama

- `src/i18n/locale.ts` (monta a URL).
- `src/components/layout/site-header.tsx`, `site-footer.tsx`, `src/components/sections/contact.tsx`.

## Limites e custo

- Conta WhatsApp Business/pessoal do autor; sem API oficial neste repo.

## Decisões e cuidados

- Deep link público; não há SDK embutido.

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
