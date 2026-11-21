---
id: src/components/shared/physics-tags.tsx
label: Tags físicas do hero
kind: component
group: frontend
path: src/components/shared/physics-tags.tsx
updated: 2026-11-21
links:
  - to: src/i18n/use-locale.ts
    kind: imports
  - to: ext:matter-js
    kind: uses
docs: []
---

# Tags físicas do hero

Simulação matter-js de tags de competências com ferramentas (criar, apagar, assoprar, ímã, pintar, gravidade).

## Responsabilidades

- Criar mundo físico e renderizar tags no hero.
- Respeitar obstáculos `data-physics-obstacle` e reduzir tags no mobile.
- Expor toolbar de interação.

## Entradas e saídas

- Entrada: locale (rótulos PT/EN), tamanho da área.
- Saída: canvas/DOM interativo sobre o hero.

## Dependências

- matter-js, i18n (labels das ferramentas).

## Decisões e cuidados

- Clique que solta tags foi restaurado em 2026-11-19.
- Evitar filtros CSS pesados (blur) que quebraram o iPhone.

## Histórico

- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-19 — Capas WebGL e clique das tags — [mudança](../changes/2026-11-19-webgl-coliseu-porsche.md)
- 2026-11-12 — Fix blur iPhone — [mudança](../changes/2026-11-12-fix-iphone-blur.md)
- 2026-11-03 — Ferramentas de física — [mudança](../changes/2026-11-03-physics-tools-motion.md)
