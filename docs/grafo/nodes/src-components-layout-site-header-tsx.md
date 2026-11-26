---
id: src/components/layout/site-header.tsx
label: Cabeçalho
kind: component
group: frontend/layout
path: src/components/layout/site-header.tsx
status: ativo
summary: Barra fixa com marca, navegação, troca PT/EN e CTA WhatsApp.
updated: 2026-11-26
links:
  - to: src/components/ui
    kind: imports
    label: Sheet do menu mobile
  - to: src/i18n/use-locale.ts
    kind: imports
  - to: src/i18n/locale.ts
    kind: imports
    label: navHref e whatsappUrl
  - to: src/lib/analytics.ts
    kind: calls
    label: via useAnalytics
  - to: ext:whatsapp
    kind: http
    label: CTA de conversa
docs: []
---

# Cabeçalho

Barra fixa com marca, navegação (âncoras e Experiência), troca PT/EN e CTA WhatsApp. No mobile abre menu em Sheet.

## Responsabilidades

- Navegar entre seções da home e páginas.
- Alternar locale preservando path e hash.
- Registrar cliques de navegação no GA4.

## Entradas e saídas

- Entrada: locale, navigation de `site-content`, pathname.
- Saída: links e scroll suave nas âncoras quando já está na home.

## Dependências

- Sheet (ui), i18n, analytics, WhatsApp.

## Decisões e cuidados

- Âncoras fora da home navegam para `homePath#...`.

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
