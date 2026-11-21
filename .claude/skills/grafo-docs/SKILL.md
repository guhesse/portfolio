---
name: grafo-docs
description: Mantém o grafo de arquitetura e a documentação de cada componente em docs/grafo. Use sempre que criar, alterar, renomear ou apagar código neste projeto (antes de dar a tarefa por terminada), e quando pedirem documentação, arquitetura, grafo, dependências ou histórico de um componente.
---

# Grafo e documentação (`docs/grafo`)

Este repositório documenta a arquitetura como um grafo em Markdown. O Pátio lê essa pasta para desenhar o grafo, mostrar a documentação de cada parte e o histórico de cada alteração. Quem coda (Claude Code ou Cursor) mantém a pasta em dia; o Grafista do Pátio faz o mapeamento inicial.

## Memória entre aplicações

Antes de mexer numa parte que conversa com outra aplicação (API, banco, fila, serviço externo compartilhado), leia o grafo geral: `/opt/patio/memoria/grafo-geral.md`. Ele resume todas as aplicações, as partes principais de cada uma, os serviços que elas dividem e quem fala com quem. É gerado sozinho pelo Pátio a partir do `docs/grafo` de cada projeto — não edite; mantenha o `docs/grafo` deste projeto em dia e ele acompanha.

## Quando usar

- Toda tarefa que muda código termina atualizando `docs/grafo`, antes de dizer que terminou.
- Pule só quando a mudança não altera comportamento nem estrutura (formatação, typo em comentário, só testes).
- Pedido de "documentar", "explicar a arquitetura" ou "o que esse componente faz": leia `docs/grafo` primeiro.

## Estrutura

```
docs/grafo/
  README.md                         visão geral do projeto
  nodes/<slug>.md                   um arquivo por parte da arquitetura
  changes/<AAAA-MM-DD>-<slug>.md    um arquivo por tarefa que mudou código
```

`slug` é o `id` em minúsculas com `/`, `.`, `:` e espaços trocados por `-` (ex.: `server/runner.ts` → `server-runner-ts`).

## Nó: `nodes/<slug>.md`

Uma parte é algo com responsabilidade própria: página, componente principal, serviço, rota de API, store, banco, fila, script, config relevante ou serviço externo. Não crie nó para cada arquivo pequeno; agrupe por pasta quando fizer sentido.

```markdown
---
id: server/runner.ts
label: Runner
kind: service
group: backend
path: server/runner.ts
updated: 2026-11-21
links:
  - to: server/agents.ts
    kind: calls
    label: marca a sessão do agente
  - to: ext:claude-code
    kind: uses
docs:
  - docs/tecnicos/agentes.md
---

# Runner

Uma ou duas frases: o que esta parte faz e por que existe.

## Responsabilidades
## Entradas e saídas
## Dependências
## Decisões e cuidados

## Histórico
- 2026-11-21 — Execuções sobrevivem à recarga do servidor — [mudança](../changes/2026-11-21-runner-recarga.md)
```

Regras do frontmatter (o Pátio lê exatamente este formato):
- Um campo por linha, `chave: valor`, sem aspas desnecessárias.
- `kind`: entry, page, component, module, service, api, route, store, db, queue, external, config, script, test.
- `id`: caminho relativo do arquivo ou pasta com `/`; serviço externo usa `ext:<nome>` (ex.: `ext:stripe`).
- `links`: só ligações que existem no código. `kind` da ligação: imports, renders, calls, http, reads, writes, publishes, subscribes, configures, uses. `label` é opcional.
- `docs`: caminhos de documentos que já existem no repositório e falam desta parte (técnicos, guias, ADRs, logs). Não copie o conteúdo deles; aponte.
- `updated`: data da última alteração deste nó.

## Mudança: `changes/<AAAA-MM-DD>-<slug>.md`

```markdown
---
date: 2026-11-21
title: Execuções sobrevivem à recarga do servidor
agent: claude-code
nodes:
  - server/runner.ts
  - server/agents.ts
files:
  - server/runner.ts
  - server/agents.ts
refs:
  - docs/2026/11/semana-47/21112026_correcao_runner.md
---

O que mudou, por quê, o impacto em quem usa e como conferir. Curto.
```

- `agent`: `claude-code`, `cursor` ou o nome de quem fez.
- `refs`: documentos da própria convenção do projeto ligados a esta tarefa (log, técnico, issue). Pode ficar vazio.
- Uma mudança por tarefa. Se a tarefa continua no mesmo dia, edite a mesma mudança.

## Passo a passo ao terminar uma tarefa

1. Liste as partes afetadas pelos arquivos que você mexeu (compare com o `path` dos nós).
2. Parte nova: crie o nó. Parte apagada: apague o nó e tire os `links` que apontavam para ela. Renomeou: atualize `id`, `path`, o nome do arquivo e os `links` que apontam para ela.
3. Atualize `links`, `docs` e `updated` dos nós afetados. Reescreva no corpo o trecho que ficou desatualizado; não empilhe versões.
4. Crie (ou edite) a mudança em `changes/`.
5. Acrescente uma linha no `## Histórico` de cada nó afetado apontando para a mudança.
6. Se `docs/grafo` ainda não existe, crie o `README.md` mínimo e só os nós que esta tarefa tocou. O mapeamento completo é trabalho do Grafista do Pátio.

## Cuidados

- Escreva em português, com nomes reais do código.
- Nada de segredo, token, credencial, payload de cliente ou saída bruta de ferramenta.
- `docs/grafo` complementa as convenções de documentação do projeto, não as substitui. Siga as duas.
- A documentação acompanha o código no mesmo commit, mas só faça commit quando a pessoa pedir.
