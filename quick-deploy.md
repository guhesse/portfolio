# 🚀 Deploy Rápido - Cola e Executa

## Comandos para executar na VPS (em ordem):

### 1. Ir para o diretório do projeto
```bash
cd /www
```

### 2. Atualizar código e rebuildar
```bash
git pull origin main
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### 3. Verificar se está rodando
```bash
docker-compose ps
docker-compose logs -f
```

---

## Testar redirecionamentos:

- Site principal: http://gustavohesse.com.br
- Calendly: http://meet.gustavohesse.com.br

---

## Comandos úteis:

```bash
# Ver logs em tempo real
cd /www && docker-compose logs -f

# Reiniciar container
cd /www && docker-compose restart

# Parar tudo
cd /www && docker-compose down

# Ver status
cd /www && docker-compose ps
```
