---
date: 2026-11-21
title: Texto de direitos do rodapé PT encurtado
agent: cursor
nodes:
  - src/i18n/messages.ts
files:
  - src/i18n/messages.ts
refs: []
---

No rodapé em português, `footer.rights` passa de "Todos os direitos reservados." para "Direitos reservados.". A string EN permanece "All rights reserved.". Conferir com `grep -n 'rights' src/i18n/messages.ts` e `npm run build`.
