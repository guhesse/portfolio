---
id: src/i18n/locale.ts
label: Helpers de locale
kind: module
group: frontend/i18n
path: src/i18n/locale.ts
status: ativo
summary: Funções puras de locale pelo path, hrefs de navegação e URL do WhatsApp.
updated: 2026-11-26
links:
  - to: ext:whatsapp
    kind: http
    label: whatsappUrl
docs: []
---

# Helpers de locale

Funções puras: detectar locale pelo path, prefixar `/en`, montar hrefs de nav e URL do WhatsApp.

## Responsabilidades

- `localeFromPath`, `stripLocale`, `withLocale`, `navHref`, `whatsappUrl`.

## Entradas e saídas

- Entrada: pathname/path/locale.
- Saída: strings de rota ou URL externa.

## Dependências

- Nenhuma; consumido por App, layout e seções.

## Decisões e cuidados

- PT é o default sem prefixo; EN usa `/en` ou `/en/...`.

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-03 — Site bilíngue — [mudança](../changes/2026-11-03-i18n-deploy-vps.md)
