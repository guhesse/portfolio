---
date: 2026-03-16
title: GA4, Calendly e scroll to top
agent: historico
nodes:
  - src/lib/analytics.ts
  - ext:google-analytics
  - ext:calendly
  - src/components/shared/scroll-to-top.tsx
files:
  - index.html
  - src/lib/analytics.ts
  - nginx.conf
refs:
  - commit:ad71c1b
  - commit:c96fa78
  - commit:0c8770e
  - commit:1586405
---

Atualiza a integração GA4, liga o fluxo Calendly e adiciona o reset de scroll ao trocar de rota. Consolida a instrumentação de página e o booking via meet.
