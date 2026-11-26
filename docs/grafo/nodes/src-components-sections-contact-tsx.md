---
id: src/components/sections/contact.tsx
label: Seção Contato
kind: component
group: frontend/sections
path: src/components/sections/contact.tsx
status: ativo
summary: Fechamento da home com CTAs de WhatsApp e Calendly.
updated: 2026-11-26
links:
  - to: src/i18n/use-locale.ts
    kind: imports
  - to: src/i18n/locale.ts
    kind: imports
  - to: src/lib/analytics.ts
    kind: calls
  - to: ext:whatsapp
    kind: http
  - to: ext:calendly
    kind: http
    label: CTA de call
docs: []
---

# Seção Contato

Fechamento da home com CTAs de conversa (WhatsApp) e agendamento (Calendly).

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

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
