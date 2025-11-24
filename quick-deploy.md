# 🚀 Deploy Rápido - Cola e Executa

## Comandos para executar na VPS (em ordem):

### 1. Verificar se a porta 80 está livre
```bash
sudo lsof -i :80
```

### 2. Clonar o repositório
```bash
cd /var/www/
sudo git clone https://github.com/guhesse/portfolio.git
cd portfolio
```

### 3. Executar deploy
```bash
sudo chmod +x deploy.sh
sudo ./deploy.sh
```

---

## Se já existe o diretório portfolio:

```bash
cd /var/www/portfolio
sudo git pull origin main
sudo ./deploy.sh
```

---

## Verificar depois:

```bash
# Ver se container está rodando
docker ps

# Ver IP público
curl ifconfig.me

# Testar site
curl http://localhost
```
