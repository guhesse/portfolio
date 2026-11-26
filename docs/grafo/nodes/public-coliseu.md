---
id: public/coliseu
label: Experiência Coliseu
kind: module
group: frontend/static
path: public/coliseu
status: ativo
summary: Estudo WebGL estático do Coliseu servido em /coliseu/ com GLB, áudio e bundle.
updated: 2026-11-26
links:
  - to: coliseu-3d
    kind: uses
    label: build estático do estudo
docs: []
---

# Experiência Coliseu

Estudo WebGL estático (modelo GLB, áudio, bundle JS) em `/coliseu/`.

## Responsabilidades

- Entregar a experiência 3D do Coliseu sem passar pelo React do portfólio.

## Entradas e saídas

- Entrada: visitante via link do case.
- Saída: app Three.js embutido.

## Dependências

- nginx/Vite static; capa em `/images/projects/coliseu-image.webp`.

## Decisões e cuidados

- Assets grandes (GLB) vivem em `public/`; não entram no bundle React.

## Histórico

- 2026-11-26 — Revisão de padrão do grafo — [mudança](../changes/2026-11-26-revisao-padrao.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-19 — Publicação Coliseu/Porsche — [mudança](../changes/2026-11-19-webgl-coliseu-porsche.md)
