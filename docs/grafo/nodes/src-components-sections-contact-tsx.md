---
id: src/components/sections/contact.tsx
label: Seção Contato
kind: component
group: frontend
path: src/components/sections/contact.tsx
updated: 2026-11-21
links:
  - to: src/i18n/use-locale.ts
    kind: imports
  - to: src/i18n/locale.ts
    kind: imports
  - to: src/lib/analytics.ts
    kind: calls
  - to: ext:whatsapp
    kind: http
docs: []
---

# Seção Contato

Fechamento da home com CTA de conversa (WhatsApp) e e-mail.

## Responsabilidades

- Converter visitantes em contato.
- Rastrear clique de WhatsApp.

## Entradas e saídas

- Entrada: `messages.contact`, locale.
- Saída: seção `#contato` invertida (fundo escuro).

## Dependências

- i18n, WhatsApp, analytics.

## Decisões e cuidados

- Mensagem pré-preenchida do WhatsApp muda com o locale (`whatsappUrl`).

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
