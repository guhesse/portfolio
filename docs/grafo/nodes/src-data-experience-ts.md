---
id: src/data/experience.ts
label: Dados de experiência
kind: module
group: frontend/data
path: src/data/experience.ts
status: ativo
summary: Copy PT/EN da trajetória profissional, meta SEO e itens expansíveis.
updated: 2026-11-26
links: []
docs: []
---

# Dados de experiência

Copy PT/EN da página de trajetória: meta SEO, títulos e itens (cargo, org, período, resumo, corpo).

## Responsabilidades

- Alimentar `ExperienceSection` e o `DocumentLocale` do App para meta tags.

## Entradas e saídas

- Entrada: locale.
- Saída: `experienceCopy[locale]`.

## Dependências

- Nenhuma; PDFs do CV ficam em `src/assets` e são importados na seção.

## Decisões e cuidados

- Textos longos com `\n\n` para parágrafos na UI.

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-12 — Experiência e currículo — [mudança](../changes/2026-11-12-experiencia-curriculo.md)
