---
id: src/components/sections/hero-dots.tsx
label: Fundo de pontos
kind: component
group: frontend/sections
path: src/components/sections/hero-dots.tsx
status: ativo
summary: Canvas 2D com grade de pontos usado atrás do hero e de algumas páginas.
updated: 2026-11-26
links: []
docs: []
---

# Fundo de pontos

Canvas 2D com grade de pontos discretos usado atrás do hero e de algumas páginas.

## Responsabilidades

- Desenhar a trama de pontos redimensionável.
- Respeitar `devicePixelRatio` (limitado a 2).

## Entradas e saídas

- Entrada: tamanho do elemento pai.
- Saída: canvas visual sem interação.

## Dependências

- Nenhuma dependência de negócio.

## Decisões e cuidados

- Versões anteriores tinham crescimento/escurecimento sob o mouse; a implementação atual é estática e leve (clareada em 2026-11-05).

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-04 — Bolinhas do hero e tema claro — [mudança](../changes/2026-11-04-hero-bolinhas-tema.md)
