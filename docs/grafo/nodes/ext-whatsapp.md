---
id: ext:whatsapp
label: WhatsApp
kind: external
group: external
path: ""
updated: 2026-11-21
links: []
docs: []
---

# WhatsApp

Canal principal de contato (`wa.me`) com mensagem pré-preenchida por idioma.

## Responsabilidades

- Receber leads do header, footer e seção contato.

## Entradas e saídas

- Entrada: clique com texto localizado.
- Saída: conversa no WhatsApp.

## Dependências

- `whatsappUrl` em `src/i18n/locale.ts`.

## Decisões e cuidados

- Número e texto estão no código-fonte do site público.

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
