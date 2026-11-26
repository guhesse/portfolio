---
name: grafo-docs
description: Mantém o grafo de arquitetura e a documentação de cada componente em docs/grafo. Use sempre que criar, alterar, renomear ou apagar código neste projeto (antes de dar a tarefa por terminada), e quando pedirem documentação, arquitetura, grafo, dependências ou histórico de um componente.
---

# Grafo e documentação (`docs/grafo`)

Este repositório documenta a arquitetura como um grafo em Markdown. O Pátio lê essa pasta para desenhar o grafo, mostrar a documentação de cada parte e o histórico de cada alteração. Quem coda (Claude Code ou Cursor) mantém a pasta em dia; o Grafista do Pátio faz o mapeamento inicial.

Se a skill e o prompt do Grafista (`agents/grafista.md`) divergirem, o prompt do agente vale.

## Memória entre aplicações

Antes de mexer numa parte que conversa com outra aplicação (API, banco, fila, serviço externo compartilhado), leia o grafo geral: `/opt/patio/memoria/grafo-geral.md`. Ele resume todas as aplicações, as partes principais de cada uma, os serviços que elas dividem e quem fala com quem. É gerado sozinho pelo Pátio a partir do `docs/grafo` de cada projeto — não edite; mantenha o `docs/grafo` deste projeto em dia e ele acompanha. Detalhe por app: ao lado, em `memoria/grafo/<app>.md`.

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

## Taxonomia (fechada — não invente valores)

**`kind` do nó:** entry, page, component, module, service, api, route, store, db, queue, external, config, script, test.

- CSS/estilos globais → `module`.
- Build, CI, Docker, nginx, `.env.example`, definições de agente → `config`.
- Workflow de deploy → `config`, grupo `infra`.
- Controllers com várias rotas → `api`; arquivo de rota única → `route`.
- Hooks/contextos com estado → `store`; só buscam dados → `module`.

**`kind` da ligação:** imports, renders, calls, http, reads, writes, publishes, subscribes, configures, uses.

**`group`:** `<camada>` ou `<camada>/<subgrupo>`. Camadas: `frontend`, `backend`, `mobile`, `desktop`, `dados`, `infra`, `agents`, `tooling`. Não use `legado` como grupo — isso vai em `status`.

**`status` do nó:** `ativo` (padrão) | `legado` | `morto`. `legado` = existe e compila, mas não está ligado a rotas/fluxos; `morto` = não é importado. Confirme com Grep.

**`id`:** caminho relativo com `/`; externos `ext:<nome>`; entidades `db:<Entidade>`.

## README: `docs/grafo/README.md`

```markdown
---
stack:
  - React 18
  - NestJS
status: ativo            # ativo | pausado | legado
url: https://...
repo: github.com/dono/projeto
branch: main
run: npm run dev
test: npm test
build: npm run build
deploy: GitHub Actions → VPS (rsync)
ports:
  - 3333 backend
  - 5173 frontend
updated: AAAA-MM-DD
commit: <hash curto>
apps:
  - to: portfolio
    kind: proxy           # proxy | serve | embed | http | deploy | shares
    label: nginx /patio/ e /ws
---
```

- `stack`: linguagens, frameworks e bibliotecas relevantes. Biblioteca não vira `ext:`.
- Comandos reais (manifesto/CI); se não achar, omita o campo.
- `apps`: só ligação vista no código ou na config (proxy, compose, HTTP, deploy). Menção em documentação **não** é ligação.
- Corpo (200–700 palavras) com `## Pendências e riscos` obrigatório.

## Nó: `nodes/<slug>.md`

```markdown
---
id: server/runner.ts
label: Runner
kind: service
group: backend
path: server/runner.ts
status: ativo
summary: Orquestra as corridas dos agentes e marca a sessão no roster.
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

- **`summary`**: uma frase completa, com ponto final, até 160 caracteres. É o que vai para o grafo geral.
- **`status`**: `ativo` | `legado` | `morto`.
- `links` só com ligações vistas no código.

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
- Uma mudança por tarefa. Se a tarefa continua no mesmo dia, edite a mesma mudança.

## Passo a passo ao terminar uma tarefa

1. Liste as partes afetadas pelos arquivos que você mexeu (compare com o `path` dos nós).
2. Parte nova: crie o nó. Parte apagada: apague o nó e tire os `links` que apontavam para ela. Renomeou: atualize `id`, `path`, o nome do arquivo e os `links` que apontam para ela.
3. Atualize `links`, `docs`, `summary`, `status` e `updated` dos nós afetados. Reescreva no corpo o trecho que ficou desatualizado; não empilhe versões.
4. Crie (ou edite) a mudança em `changes/`.
5. Acrescente uma linha no `## Histórico` de cada nó afetado apontando para a mudança.
6. Se `docs/grafo` ainda não existe, crie o `README.md` mínimo e só os nós que esta tarefa tocou. O mapeamento completo é trabalho do Grafista do Pátio.

## Temas (opcional)

Três skills complementares detalham nós de um tema. Ative só quando a tarefa tocar nele:

- `grafo-dados`: schema, migração, tabelas (`kind: db`, `id: db:<Entidade>`).
- `grafo-api`: controllers, rotas e endpoints (`kind: api`).
- `grafo-integracoes`: serviços externos (`ext:<nome>` só com rede, conta ou chave; só nomes de variáveis).

Regra de ouro: não duplique um nó que outro tema já cobre; refine o existente. Apps irmãs vão em `apps` do README, não em `ext:`.

## Cuidados

- Escreva em português, com nomes reais do código.
- Nada de segredo, token, credencial, payload de cliente ou saída bruta de ferramenta.
- `docs/grafo` complementa as convenções de documentação do projeto, não as substitui. Siga as duas.
- A documentação acompanha o código no mesmo commit, mas só faça commit quando a pessoa pedir.
