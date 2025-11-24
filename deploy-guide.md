# Guia de Deploy na VPS Hostinger

## 📋 Pré-requisitos
- Acesso SSH à VPS
- Docker e Docker Compose instalados na VPS
- Domínio configurado

---

## 🚀 Opção 1: Deploy com Subdomínio (Recomendado)

### 1️⃣ Configurar DNS no Hostinger
No painel do Hostinger:
```
Tipo: A
Nome: portfolio (ou nome desejado)
Valor: [IP da sua VPS]
TTL: 3600
```

Aguarde 5-30 minutos para propagação do DNS.

### 2️⃣ Preparar arquivos para build
No seu computador local, execute:
```bash
npm run build
```

### 3️⃣ Enviar arquivos para a VPS

**Opção A - Via Git (Recomendado):**
```bash
# Na VPS
cd /var/www/
git clone https://github.com/guhesse/portfolio.git
cd portfolio
```

**Opção B - Via SCP/SFTP:**
```bash
# No seu computador (PowerShell)
scp -r . usuario@IP_DA_VPS:/var/www/portfolio/
```

### 4️⃣ Na VPS, fazer o build e iniciar

```bash
# Conectar via SSH
ssh usuario@IP_DA_VPS

# Ir para o diretório do projeto
cd /var/www/portfolio

# Build e iniciar o container
docker-compose up -d --build

# Verificar se está rodando
docker ps
```

### 5️⃣ Configurar Nginx Reverse Proxy na VPS

Criar arquivo de configuração do Nginx:
```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Cole o seguinte conteúdo (substitua `portfolio.seudominio.com`):
```nginx
server {
    listen 80;
    server_name portfolio.seudominio.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Ativar o site:
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6️⃣ Configurar SSL (HTTPS) com Let's Encrypt

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d portfolio.seudominio.com
```

✅ **Pronto!** Acesse: `https://portfolio.seudominio.com`

---

## 🔄 Opção 2: Substituir Site Existente

Se quiser usar o domínio principal:

1. Backup do site atual:
```bash
sudo cp -r /var/www/html /var/www/html.backup
```

2. Parar o serviço existente na porta 80

3. Alterar `docker-compose.yml` para usar porta 80:
```yaml
ports:
  - "80:80"
```

4. Seguir passos 3-6 acima, mas sem o reverse proxy

---

## 🔧 Comandos Úteis

### Ver logs do container:
```bash
docker logs portfolio-gustavo
```

### Parar o container:
```bash
docker-compose down
```

### Reiniciar o container:
```bash
docker-compose restart
```

### Atualizar o site:
```bash
git pull origin main
docker-compose up -d --build
```

### Verificar portas em uso:
```bash
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :3001
```

---

## 🐛 Troubleshooting

### Container não inicia:
```bash
docker logs portfolio-gustavo
```

### Porta já em uso:
```bash
# Ver o que está usando a porta
sudo lsof -i :3001

# Matar processo se necessário
sudo kill -9 [PID]
```

### Site não carrega:
```bash
# Verificar Nginx
sudo nginx -t
sudo systemctl status nginx

# Verificar container
docker ps
curl http://localhost:3001
```

### DNS não propaga:
```bash
# Verificar DNS
nslookup portfolio.seudominio.com
dig portfolio.seudominio.com
```

---

## 📝 Informações Importantes

- **Porta Docker**: 3001 (pode alterar no `docker-compose.yml`)
- **Container Name**: `portfolio-gustavo`
- **Build Command**: `npm run build`
- **Nginx Config**: Inclui gzip, cache e SPA fallback

---

## 🎯 Próximos Passos Opcionais

1. **CI/CD**: Configurar GitHub Actions para deploy automático
2. **Monitoramento**: Instalar Portainer para gerenciar containers
3. **Performance**: Configurar CDN (Cloudflare)
4. **Analytics**: Adicionar Google Analytics ou similar
