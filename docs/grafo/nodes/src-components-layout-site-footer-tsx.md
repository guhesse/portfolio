---
id: src/components/layout/site-footer.tsx
label: Rodapé
kind: component
group: frontend/layout
path: src/components/layout/site-footer.tsx
status: ativo
summary: Rodapé com marca, ano, navegação, WhatsApp e LinkedIn.
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
docs: []
---

# Rodapé

Rodapé minimalista com marca, ano, links de navegação, WhatsApp e LinkedIn.

## Responsabilidades

- Repetir a navegação principal.
- Oferecer atalhos sociais com tracking.

## Entradas e saídas

- Entrada: locale e navigation.
- Saída: links internos e externos.

## Dependências

- i18n, analytics, WhatsApp, LinkedIn.

## Decisões e cuidados

- Copy de direitos viveu em `messages.footer.rights` em versões anteriores; o rodapé atual mostra sobretudo o ano.

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-21 — Texto de direitos PT encurtado — [mudança](../changes/2026-11-21-texto-direitos-rodape-pt.md)
