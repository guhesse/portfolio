---
stack:
  - React 19
  - TypeScript
  - Vite (rolldown-vite)
  - React Router 7
  - Tailwind CSS
  - shadcn/ui
  - anime.js
  - matter-js
  - pdfjs-dist
  - Docker
  - nginx
status: ativo
url: https://gustavohesse.com.br
repo: github.com/guhesse/portfolio
branch: main
run: npm run dev
build: npm run build
deploy: GitHub Actions → VPS (rsync + docker compose)
ports:
  - 7070 frontend Vite (dev)
  - 80/443 nginx (Docker)
updated: 2026-11-26
commit: 96460fc
apps:
  - to: adgile
    kind: embed
    label: build estático em /adgile/
  - to: coliseu-3d
    kind: embed
    label: build estático em /coliseu/
  - to: porsche-911
    kind: serve
    label: bind mount dist → /porsche/
  - to: patio
    kind: proxy
    label: nginx /patio/, /ws e /terminal/
---

# Portfolio — Gustavo Hesse

Site pessoal de branding e direção criativa em [gustavohesse.com.br](https://gustavohesse.com.br). É um SPA React que apresenta trabalhos, operação criativa, processo, depoimentos e contato, com páginas internas de case e de experiência profissional. O conteúdo existe em português e inglês; o idioma vem do caminho (`/` vs `/en/...`).

Não há backend, banco nem API HTTP neste repositório: o conteúdo vive em módulos TypeScript (`src/data`, `src/i18n`) e os contatos saem por WhatsApp, Calendly e LinkedIn.

## Como roda

- Desenvolvimento: `npm run dev` (Vite na porta 7070, host aberto).
- Build: `npm run build` (`tsc -b` + Vite) gera `dist/`. Preview: `npm run preview`.
- Produção: Docker multi-stage (`Dockerfile`) — Node 20 compila e a imagem final serve com nginx (`nginx.conf`). `docker compose up -d --build` sobe o contentor `portfolio-gustavo` nas portas 80/443 com certificados em `ssl/` e o bind mount de `/var/www/porsche-911/dist` em `/porsche/`.
- CI: push em `main` dispara `.github/workflows/deploy.yml` (rsync + rebuild no VPS). Depois do rebuild, o workflow reconecta o contentor do Pátio à rede do compose se o alias `patio` sumiu.
- Não há script `test` no `package.json`.

## Estrutura

- `src/main.tsx` e `src/App.tsx` — entrada, rotas e home em seções.
- `src/pages/` — `ProjectPage`, `ExperiencePage`; `OpsPage` e `HeroTree` ficaram no código sem importadores (`status: morto`); `/ops` redireciona para `/#operacao`.
- `src/components/sections/` — hero, trabalhos, sobre, operação, processo, depoimentos, contato, experiência.
- `src/components/layout/` — header e footer (`top-marquee.tsx` existe sem uso).
- `src/components/shared/` — física do hero (`physics-tags`), carrossel PDF, scroll-to-top.
- `src/components/ui/` — primitives shadcn/Radix.
- `src/i18n/` — locale pelo path, `messages` (UI) e `site-content` (projetos/processo/depoimentos).
- `src/data/` — fonte PT de projetos e copy de experiência.
- `src/lib/` — analytics GA4 e motion de scroll (anime.js).
- `public/adgile`, `public/coliseu` — apps estáticas embutidas; nginx e o middleware de dev do Vite as servem em `/adgile` e `/coliseu`.
- `/porsche/` vem do bind mount do repo `porsche-911` (não há cópia em `public/`).
- Integrações reais (`ext:`): Google Analytics 4, Adobe Fonts (Typekit), Calendly, WhatsApp. Bibliotecas (anime.js, matter-js, pdfjs, React Router) ficam só no `stack`.

## Fluxo principal

1. O browser carrega `index.html` (meta OG, Typekit, fila gtag) e monta o React com `BrowserRouter`.
2. `App` escolhe home, experiência ou case; atualiza `document` (title, canonical, hreflang) e envia pageview/scroll_depth ao GA4.
3. A home empilha seções; trabalhos vêm de `content` + traduções e apontam para `/projetos/:slug`, PDF, URL externa ou app estática.
4. Cases internos usam galeria de imagens ou `PdfCarousel` (pdf.js). Experiência lista trajetória e oferece download do CV.
5. Em produção o nginx entrega o SPA, as apps embutidas, o mount do Porsche e o proxy do Pátio.

## Grupos do grafo

| Grupo | O que reúne |
|-------|-------------|
| `frontend` / `frontend/sections` / `frontend/pages` / … | SPA React, seções, páginas, i18n, dados estáticos |
| `frontend/static` | Builds embutidos em `public/adgile` e `public/coliseu` |
| `infra` | Docker, nginx, Vite, Actions e serviços `ext:` |
| `tooling` | Script de otimização de imagens |

## Pendências e riscos

- `src/pages/OpsPage.tsx` e `src/components/sections/hero-tree.tsx` estão `morto`: nenhum importador; `/ops` só redireciona para `/#operacao`.
- `src/components/layout/top-marquee.tsx` existe sem importadores e sem nó no grafo.
- Dependência `gsap` no `package.json` não é importada em lugar nenhum; `three` só entra via `HeroTree` morto.
- Sem script `test` no manifesto; não há suite automatizada do SPA.
- Bind mount `/var/www/porsche-911/dist`: se o path host não existir, o Docker cria pasta vazia e `/porsche/` responde 404 (`docker-compose.yml`).
- Proxy `/patio/` depende do alias Docker `patio` → contentor `patio-gustavo`; o deploy reconecta a rede após recreate (`.github/workflows/deploy.yml`).
- Tema claro travado (`color-scheme: only light`); já houve bug de blur no iPhone (`50977d9`).
- Não há `.env.example`: measurement id do GA4, kit Typekit, número WhatsApp e URL Calendly estão hardcoded no HTML/código público.
