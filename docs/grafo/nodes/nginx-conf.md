---
id: nginx.conf
label: nginx
kind: config
group: infra
path: nginx.conf
updated: 2026-11-22
links:
  - to: public/adgile
    kind: configures
  - to: public/coliseu
    kind: configures
  - to: ext:porsche-911
    kind: configures
    label: alias /porsche (bind mount)
  - to: ext:patio
    kind: http
    label: proxy /patio/ e /ws
  - to: ext:calendly
    kind: http
    label: meet.gustavohesse.com.br
docs:
  - SSL-SETUP.md
  - quick-deploy.md
---

# nginx

Configuração do servidor no contentor de produção: HTTPS, SPA fallback, apps estáticos, proxy do Pátio e redirect do subdomínio meet.

## Responsabilidades

- Redirecionar HTTP→HTTPS e servir `dist/`.
- Alias/try_files para `/adgile`, `/coliseu`, `/porsche` (Porsche vem do bind mount do porsche-911, não de `public/`).
- Proxy `/patio/`, `/ws` e `/terminal/` para o contentor patio na rede Docker.
- Redirect de `meet.gustavohesse.com.br` ao Calendly.

## Entradas e saídas

- Entrada: requests HTTP/HTTPS.
- Saída: arquivos estáticos ou upstream patio/calendly.

## Dependências

- Certificados em `/etc/nginx/ssl`; DNS Docker `patio`; volume compose do dist porsche-911.

## Decisões e cuidados

- Sem link no menu do portfólio para o Pátio; acesso só por URL.
- Após recreate do contentor, o alias `patio` pode sumir — o deploy reconecta a rede.
- Locations `/porsche` não mudaram de path; o conteúdo passou a ser o mount.

## Histórico

- 2026-11-22 — `/porsche` passa a servir o bind mount — [mudança](../changes/2026-11-22-porsche-bind-mount.md)
- 2026-11-21 — Mapeamento inicial da arquitetura — [mudança](../changes/2026-11-21-mapeamento-inicial.md)
- 2026-11-21 — Pátio no domínio e rede no deploy — [mudança](../changes/2026-11-21-patio-proxy-deploy.md)
- 2026-11-19 — Locais Coliseu/Porsche — [mudança](../changes/2026-11-19-webgl-coliseu-porsche.md)
- 2026-03-09 — Rota Adgile SPA — [mudança](../changes/2026-03-09-nginx-adgile.md)
- 2025-11-25 — HTTPS — [mudança](../changes/2025-11-25-ssl-ga.md)
