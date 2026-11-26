---
name: grafo-dados
description: Convenção do grafo para banco de dados. Use ao criar ou alterar schema, migração, model, tabela ou acesso a dados (Prisma, SQL, Convex, Supabase) e quando pedirem documentação do banco; complementa a skill grafo-docs.
---

# Grafo de dados (`kind: db`)

Complementa `.claude/skills/grafo-docs/SKILL.md`, que define o formato dos nós, a pasta `docs/grafo` e o passo "ao terminar a tarefa". Aqui só vale a convenção do tema banco de dados. Não duplique um nó que outro tema já cobre (ex.: o banco como serviço externo fica em `ext:`, veja `grafo-integracoes`).

## Nó

- Um nó por tabela ou entidade (Prisma model, tabela SQL, tabela Convex, tabela Supabase), com `kind: db` e `group: dados`.
- `id`: `db:<Entidade>` (ex.: `db:User`) ou o caminho do schema quando o arquivo representa uma entidade só.
- Acima de ~25 entidades, agrupe por domínio: um nó por módulo do schema (ex.: `db:faturamento`), listando as entidades no corpo.
- Já existe um nó genérico "Banco de Dados"? Refine esse nó: ele vira índice com links `uses` para as entidades (ou é removido, se ficar vazio).
- Inclua `status` (`ativo` | `legado` | `morto`) e `summary` (frase ≤160 chars com ponto final).

```markdown
---
id: db:Pedido
label: Pedido
kind: db
group: dados
path: prisma/schema.prisma
status: ativo
summary: Compra do cliente com itens e status de pagamento.
updated: 2026-11-23
links:
  - to: db:Cliente
    kind: uses
    label: N:1
  - to: ext:postgresql
    kind: uses
---

# Pedido

Compra feita por um cliente, com itens e status de pagamento.

## Campos
| Campo | Tipo | Chave | Nulo |
| --- | --- | --- | --- |
| id | Int | PK | não |
| clienteId | Int | FK Cliente | não |
| pagoEm | DateTime | — | sim |

## Relações
- Cliente (N:1), Item (1:N).

## Migrações
- 2026-10-02 — `20261002_add_pago_em`: coluna `pagoEm`.

## Quem lê e escreve
- `server/pedidos.service.ts` lê e escreve; `server/relatorios.ts` só lê.

## Histórico
```

## Links

- `reads` e `writes` saem do módulo (service, rota, job) para a tabela. Só com chamada vista no código (ex.: Grep em `prisma.<modelo>`, `from("tabela")`, `db.query`). Sem prova, deixe o link de fora.
- Relação entre tabelas: `uses` com `label` como `1:N`, `N:1`, `N:N`.
- O servidor do banco (`ext:postgresql`, `ext:supabase`) fica na infraestrutura; o `db:` linka para ele com `uses`. Não crie outro nó para o mesmo banco.

## Cuidados

- Nunca copie dados de linhas, seeds com dados reais nem connection string.
- Reescreva o corpo quando o schema mudar; não empilhe versões. A migração nova entra em `## Migrações` e no `## Histórico`.
- Renomeou ou apagou a tabela: renomeie ou apague o nó e os `links` que apontavam para ele.
