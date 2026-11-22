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
---

# Portfolio — Gustavo Hesse

Site pessoal de branding e direção criativa em [gustavohesse.com.br](https://gustavohesse.com.br). É um SPA React que apresenta trabalhos, operação criativa, processo, depoimentos e contato, com páginas internas de case e de experiência profissional. O conteúdo existe em português e inglês; o idioma vem do caminho (`/` vs `/en/...`).

## Como roda

- Desenvolvimento: `npm run dev` (Vite na porta 7070, host aberto).
- Build: `npm run build` (`tsc -b` + Vite) gera `dist/`.
- Preview local: `npm run preview`.
- Produção: Docker multi-stage (`Dockerfile`) — Node 20 compila e a imagem final serve com nginx (`nginx.conf`). `docker compose up -d --build` sobe o contentor `portfolio-gustavo` nas portas 80/443 com certificados em `ssl/`.
- CI: push em `main` dispara `.github/workflows/deploy.yml` (rsync + rebuild no VPS). Depois do rebuild, o workflow reconecta o contentor do Pátio à rede do compose se o alias `patio` sumiu.

## Estrutura

- `src/main.tsx` e `src/App.tsx` — entrada, rotas e home em seções.
- `src/pages/` — `ProjectPage`, `ExperiencePage`; `OpsPage` ficou no código mas a rota `/ops` redireciona para `/#operacao`.
- `src/components/sections/` — hero, trabalhos, sobre, operação, processo, depoimentos, contato, experiência.
- `src/components/layout/` — header e footer.
- `src/components/shared/` — física do hero (`physics-tags`), carrossel PDF, scroll-to-top.
- `src/components/ui/` — primitives shadcn/Radix.
- `src/i18n/` — locale pelo path, `messages` (UI) e `site-content` (projetos/processo/depoimentos).
- `src/data/` — fonte PT de projetos e copy de experiência.
- `src/lib/` — analytics GA4 e motion de scroll (anime.js).
- `public/adgile`, `public/coliseu` — apps estáticos embutidos; nginx e o plugin de dev do Vite os servem em `/adgile` e `/coliseu`.
- `ext:porsche-911` — `/porsche/` vem do bind mount de `/var/www/porsche-911/dist` (deploy nas Actions do próprio repo).
- `nginx.conf` também faz proxy de `/patio/` (e WebSocket) para o contentor do Pátio na mesma rede Docker, e redireciona `meet.gustavohesse.com.br` para o Calendly.

## Fluxo principal

1. O browser carrega `index.html` (meta OG, Typekit, fila gtag) e monta o React com `BrowserRouter`.
2. `App` escolhe home, experiência ou case; atualiza `document` (title, canonical, hreflang) e envia pageview/scroll_depth ao GA4.
3. A home empilha seções; trabalhos vêm de `content` + traduções e apontam para `/projetos/:slug`, PDF, URL externa ou app estático.
4. Cases internos usam galeria de imagens ou `PdfCarousel` (pdf.js). Experiência lista trajetória e oferece download do CV.
5. Em produção o nginx entrega o SPA, os apps estáticos e o proxy do Pátio.

## Pontos de atenção

- Tema claro travado (`color-scheme: only light`); já houve bug de blur no iPhone.
- Física do hero (matter-js) carrega com idle callback para não atrasar a primeira pintura; texto do hero fica acima das tags sem bloquear scroll.
- Proxy `/patio/` depende do alias Docker `patio` → contentor `patio-gustavo`; o deploy reconecta a rede após recreate.
- Não há backend próprio neste repositório: conteúdo é estático no código; contatos vão para WhatsApp/LinkedIn/Calendly.
