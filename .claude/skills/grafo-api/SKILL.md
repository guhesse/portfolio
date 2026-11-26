---
name: grafo-api
description: Convenção do grafo para API HTTP. Use ao criar ou alterar controller, rota, endpoint, guard ou middleware e quando pedirem documentação da API; complementa a skill grafo-docs.
---

# Grafo de API (`kind: api` e `route`)

Complementa `.claude/skills/grafo-docs/SKILL.md`, que define o formato dos nós, a pasta `docs/grafo` e o passo "ao terminar a tarefa". Aqui só vale a convenção do tema API. Não duplique um nó que outro tema já cobre (tabelas ficam em `db:`, veja `grafo-dados`).

## Nó

- Granularidade padrão: um nó `kind: api` por controller (ou arquivo de rotas). Não crie um nó por endpoint, para o grafo não explodir.
- `kind: route` por endpoint só quando o arquivo é de rota única (ex.: `app/api/pedidos/route.ts`).
- `id`: o caminho do arquivo. `group`: `backend` ou `backend/<subgrupo>` (taxonomia fechada de camadas).
- Inclua `status` e `summary` (frase ≤160 chars).
- Já existe nó para esse controller? Refine o corpo e os links dele.

```markdown
---
id: src/pedidos/pedidos.controller.ts
label: Pedidos (controller)
kind: api
group: backend
path: src/pedidos/pedidos.controller.ts
status: ativo
summary: Expõe criação e consulta de pedidos via HTTP.
updated: 2026-11-23
links:
  - to: src/pedidos/pedidos.service.ts
    kind: calls
  - to: db:Pedido
    kind: reads
---

# Pedidos (controller)

Expõe a criação e a consulta de pedidos.

## Endpoints
| Método | Rota | Entrada | Saída | Autenticação |
| --- | --- | --- | --- | --- |
| GET | /pedidos/:id | id na rota | Pedido | guard JWT |
| POST | /pedidos | CriarPedidoDto | Pedido criado | guard JWT |
| GET | /health | — | status | pública |

## Histórico
```

## Links

- `http`: do front (página, componente, `api.ts`) para o controller, quando há chamada vista (`fetch`, `axios`, cliente gerado).
- `calls`: do controller para o service.
- `reads` e `writes`: do controller ou service para o `db:`, só com acesso visto no código.
- Sem prova no código (Grep em `@Get|@Post|app.get|router.|fetch|axios`), deixe o link de fora.

## Cuidados

- Autenticação por endpoint: nome do guard ou middleware, ou "pública". Se não achar, escreva "não verificado".
- Nada de tokens, chaves ou payloads reais de clientes; descreva só o formato.
- Endpoint novo, removido ou com contrato alterado: atualize a tabela `## Endpoints` (reescreva a linha, não empilhe) e o `## Histórico`.
