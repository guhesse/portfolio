---
id: public/adgile
label: App Adgile embutido
kind: module
group: static-apps
path: public/adgile
updated: 2026-11-21
links:
  - to: ext:adgile
    kind: uses
    label: build estático do projeto adgile
docs: []
---

# App Adgile embutido

Build estático do editor Adgile servido em `/adgile/` pelo nginx (e pelo middleware Vite em dev). Aparece como case no portfólio.

## Responsabilidades

- Hospedar a demo/app Adgile no mesmo domínio.

## Entradas e saídas

- Entrada: arquivos em `public/adgile`.
- Saída: SPA própria com base `/adgile/`.

## Dependências

- Projeto irmão **adgile** (`/var/www/adgile`); nginx locations dedicadas.

## Decisões e cuidados

- Base path errada já quebrou o SPA; nginx usa alias + try_files para fallback.

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-03-09 — Rota nginx Adgile — [mudança](../changes/2026-03-09-nginx-adgile.md)
- 2026-11-05 — Reabre Adgile na galeria — [mudança](../changes/2026-11-05-adgile-galeria.md)
