---
name: grafo-integracoes
description: Convenção do grafo para serviços externos e integrações. Use ao adicionar, trocar ou alterar integração com serviço de terceiros (pagamento, e-mail, storage, IA, webhook) ou variável de ambiente e quando pedirem documentação das integrações; complementa a skill grafo-docs.
---

# Grafo de integrações (`ext:`)

Só nomes de variáveis; nunca valores. Nada de chaves, tokens, senhas nem URLs com credencial, em nenhum arquivo do grafo.

Complementa `.claude/skills/grafo-docs/SKILL.md`, que define o formato dos nós, a pasta `docs/grafo` e o passo "ao terminar a tarefa". Aqui só vale a convenção do tema integrações. Não duplique um nó que outro tema já cobre.

## O que entra em `ext:`

**Só o que tem rede, conta ou chave**: APIs de terceiros, CDN, analytics, provedores de login, CLIs de terceiros que o app executa, o próprio banco como serviço.

**Não entram:**
- Bibliotecas (GSAP, LangChain, Three.js, React…) → vão em `stack` do README.
- Apps irmãs do workspace → vão em `apps` do README (`proxy` | `serve` | `embed` | `http` | `deploy` | `shares`).

## Nó

- Um nó por serviço externo: `id: ext:<nome>`, `kind: external`, `group: infra` (ou `infra/<subgrupo>`). Use o mesmo `<nome>` do grafo geral (`/opt/patio/memoria/grafo-geral.md`) para serviços compartilhados; leia-o antes de inventar um nome.
- Inclua `status` e `summary` (frase ≤160 chars).
- Já existe o nó? Refine o corpo e os links; não crie um segundo.

```markdown
---
id: ext:stripe
label: Stripe
kind: external
group: infra
status: ativo
summary: Cobrança e assinaturas dos clientes via API Stripe.
updated: 2026-11-23
---

# Stripe

Cobrança e assinaturas dos clientes.

## Variáveis de ambiente
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## Quem chama
- `server/billing.ts` cria a cobrança; `server/webhooks.ts` recebe os eventos.

## Limites e custo
- Taxa por transação; webhooks repetem em caso de falha.

## Histórico
```

## Links

- `uses` ou `http`, do módulo que chama para o `ext:`. Só com chamada vista no código (Grep em `fetch|axios|SDK|process.env|import.meta.env`).
- `ext:postgresql` e o banco não duplicam o `db:`: o externo fica na infraestrutura e o `db:` linka para ele com `uses` (veja `grafo-dados`).

## Cuidados

- `## Variáveis de ambiente`: só os nomes, conferidos em `.env.example` ou no código. Nunca abra nem copie `.env` com valores.
- Registre limites, custo e comportamento de falha quando o código ou a documentação disserem; não invente.
- Trocou ou removeu a integração: atualize ou apague o nó e os `links` que apontavam para ele.
