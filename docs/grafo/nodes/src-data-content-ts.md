---
id: src/data/content.ts
label: Dados dos projetos
kind: module
group: frontend/data
path: src/data/content.ts
status: ativo
summary: Fonte canônica em português de navegação, projetos, processo e depoimentos.
updated: 2026-11-26
links:
  - to: public/adgile
    kind: uses
    label: link /adgile/
  - to: public/coliseu
    kind: uses
    label: link /coliseu/
  - to: porsche-911
    kind: uses
    label: link /porsche/
docs: []
---

# Dados dos projetos

Fonte canônica (PT) de navegação, projetos, processo, depoimentos e stats. Inclui slugs, galerias, PDFs e links externos.

## Responsabilidades

- Definir o modelo `Project` e a lista publicada no portfólio.
- Apontar assets em `/images/projects/...` e PDFs em `src/assets`.

## Entradas e saídas

- Entrada: edição manual no código.
- Saída: arrays consumidos por `site-content` e, indiretamente, pelas UIs.

## Dependências

- Lucide icons para serviços; PDF All Ways importado como asset.

## Decisões e cuidados

- Floume e Coral podem ser só link externo; estudos WebGL apontam para apps estáticos.
- PetCare: pitch deck; Angélica/Orçamenta/Beehelp/Charlie têm páginas internas ricas.

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-22 — Link `/porsche/` aponta ao bind mount — [mudança](../changes/2026-11-22-porsche-bind-mount.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-15 — Cases e PetCare deck — [mudança](../changes/2026-11-15-cases-angelica-orcamenta.md)
- 2026-11-13 — Floume, All Ways, Charlie, Petcare — [mudança](../changes/2026-11-13-floume-allways-petcare.md)
- 2026-11-19 — Coliseu e Porsche — [mudança](../changes/2026-11-19-webgl-coliseu-porsche.md)
