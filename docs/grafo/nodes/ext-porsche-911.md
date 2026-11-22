---
id: ext:porsche-911
label: Porsche 911 (bind mount)
kind: external
group: external
path: ""
updated: 2026-11-22
links: []
docs: []
---

# Porsche 911 (bind mount)

Estudo WebGL Carrera 4S do repo `/var/www/porsche-911`. Em produção o `docker-compose.yml` monta `porsche-911/dist` em `/usr/share/nginx/html/porsche` (read-only); o nginx já aliasa `/porsche/`. Deploy do app fica nas Actions do próprio repo porsche-911 — push lá atualiza `/porsche/` sem rebuild do portfólio.

## Responsabilidades

- Origem do conteúdo servido em `/porsche/`.
- Publicar `dist/` no VPS via workflow do porsche-911.

## Entradas e saídas

- Entrada: build Vite do porsche-911 com `base: '/porsche/'`.
- Saída: `index.html`, assets, stills e modelos em `/porsche/`.

## Dependências

- Volume bind no compose; locations `/porsche` no `nginx.conf`.
- Se `/var/www/porsche-911/dist` não existir no host, o Docker cria pasta vazia e `/porsche/` fica 404.

## Decisões e cuidados

- Não há mais cópia em `public/porsche/`.
- Em `npm run dev` do portfólio, `/porsche` não é emulado — validar com `preview` no porsche-911.
- Capa do case no portfólio continua em `public/images/.../porsche-image.webp`.

## Histórico

- 2026-11-22 — Bind mount no lugar da cópia estática — [mudança](../changes/2026-11-22-porsche-bind-mount.md)
