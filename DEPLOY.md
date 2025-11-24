# 🚀 Guia de Deploy - VPS Hostinger (Porta 80)

## 📋 Preparação no Computador Local

### 1. Fazer commit das alterações
```bash
git add .
git commit -m "Preparado para deploy em produção"
git push origin main
```

### 2. Testar build localmente (opcional)
```bash
npm run build
```

---

## 🖥️ Deploy na VPS

### Método 1: Via Git (Recomendado)

#### 1. Conectar na VPS via SSH
```bash
ssh usuario@seu-ip-vps
```

#### 2. Parar serviços na porta 80
```bash
# Verificar o que está usando a porta 80
sudo lsof -i :80

# Parar Nginx (se estiver rodando)
sudo systemctl stop nginx
sudo systemctl disable nginx  # Para não iniciar automaticamente

# OU parar Apache (se estiver rodando)
sudo systemctl stop apache2
sudo systemctl disable apache2
```

#### 3. Fazer backup do site anterior
```bash
# Backup do diretório atual
sudo mkdir -p /var/www/backup
sudo cp -r /var/www/html /var/www/backup/html-$(date +%Y%m%d)

# OU backup de container Docker existente
docker ps -a  # Ver containers
docker stop nome-container-antigo
docker rename nome-container-antigo nome-container-antigo-backup
```

#### 4. Clonar o repositório
```bash
# Ir para o diretório web
cd /var/www/

# Clonar o repositório
sudo git clone https://github.com/guhesse/portfolio.git
cd portfolio

# OU se já existe, apenas atualizar
cd /var/www/portfolio
sudo git pull origin main
```

#### 5. Executar o script de deploy
```bash
# Dar permissão de execução ao script
sudo chmod +x deploy.sh

# Executar o deploy
sudo ./deploy.sh
```

O script vai:
- ✅ Verificar Docker e Docker Compose
- ✅ Fazer backup automático
- ✅ Parar serviços na porta 80
- ✅ Fazer build do container
- ✅ Iniciar o novo container
- ✅ Testar se está funcionando

---

### Método 2: Deploy Manual

#### 1. Conectar na VPS
```bash
ssh usuario@seu-ip-vps
```

#### 2. Parar serviços existentes
```bash
# Ver o que está na porta 80
sudo lsof -i :80

# Parar Nginx/Apache
sudo systemctl stop nginx
sudo systemctl stop apache2

# Parar container antigo (se houver)
docker stop portfolio-gustavo
docker rm portfolio-gustavo
```

#### 3. Clonar/Atualizar código
```bash
cd /var/www/
sudo git clone https://github.com/guhesse/portfolio.git
cd portfolio
```

#### 4. Build e start
```bash
# Build da imagem
sudo docker-compose build --no-cache

# Iniciar container
sudo docker-compose up -d

# Verificar se está rodando
docker ps
```

#### 5. Verificar
```bash
# Ver logs
docker logs portfolio-gustavo

# Testar localmente
curl http://localhost

# Ver IP público
curl ifconfig.me
```

---

## 🔒 Configurar SSL (HTTPS) - Opcional mas Recomendado

### Se você tiver um domínio:

#### 1. Instalar Certbot
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

#### 2. Obter certificado SSL
```bash
# Parar o container temporariamente
docker-compose down

# Instalar Nginx temporariamente para o Certbot
sudo apt install nginx -y

# Obter certificado
sudo certbot certonly --nginx -d seudominio.com -d www.seudominio.com

# Certificados serão salvos em:
# /etc/letsencrypt/live/seudominio.com/
```

#### 3. Configurar Nginx como Reverse Proxy
```bash
# Criar configuração
sudo nano /etc/nginx/sites-available/portfolio
```

Cole:
```nginx
server {
    listen 80;
    server_name seudominio.com www.seudominio.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name seudominio.com www.seudominio.com;

    ssl_certificate /etc/letsencrypt/live/seudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seudominio.com/privkey.pem;

    location / {
        proxy_pass http://localhost:8080;
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

#### 4. Alterar porta do Docker
```bash
# Editar docker-compose.yml
nano docker-compose.yml

# Alterar de:
ports:
  - "80:80"

# Para:
ports:
  - "8080:80"
```

#### 5. Ativar configuração
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl start nginx

# Reiniciar container
docker-compose down
docker-compose up -d
```

---

## 🔄 Atualizar o Site

```bash
# Conectar na VPS
ssh usuario@seu-ip-vps

# Ir para o diretório
cd /var/www/portfolio

# Atualizar código
sudo git pull origin main

# Executar deploy
sudo ./deploy.sh
```

---

## 🛠️ Comandos Úteis

### Ver logs em tempo real
```bash
docker logs -f portfolio-gustavo
```

### Parar o container
```bash
docker-compose down
```

### Reiniciar o container
```bash
docker-compose restart
```

### Ver status
```bash
docker ps
docker stats portfolio-gustavo
```

### Acessar o container
```bash
docker exec -it portfolio-gustavo sh
```

### Limpar Docker (cuidado!)
```bash
# Remover containers parados
docker container prune

# Remover imagens não usadas
docker image prune

# Limpar tudo
docker system prune -a
```

---

## 🐛 Troubleshooting

### Porta 80 já em uso
```bash
# Ver o que está usando
sudo lsof -i :80

# Matar processo
sudo kill -9 [PID]

# Ou parar serviço
sudo systemctl stop nginx
sudo systemctl stop apache2
```

### Container não inicia
```bash
# Ver logs completos
docker logs portfolio-gustavo

# Ver eventos do Docker
docker events

# Verificar configuração
docker-compose config
```

### Site não carrega
```bash
# Testar localmente
curl -I http://localhost

# Verificar firewall
sudo ufw status
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Verificar se o container está rodando
docker ps | grep portfolio
```

### Build falha
```bash
# Limpar cache do Docker
docker-compose build --no-cache

# Verificar espaço em disco
df -h

# Limpar espaço
docker system prune -a
```

---

## 📊 Monitoramento

### Portainer (Interface gráfica para Docker)
```bash
docker volume create portainer_data

docker run -d \
  -p 9000:9000 \
  --name=portainer \
  --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:latest
```

Acesse: `http://seu-ip:9000`

---

## ✅ Checklist de Deploy

- [ ] Código commitado e pushed no GitHub
- [ ] SSH configurado na VPS
- [ ] Docker e Docker Compose instalados
- [ ] Porta 80 liberada (Nginx/Apache parados)
- [ ] Backup do site anterior feito
- [ ] Repositório clonado na VPS
- [ ] Deploy executado com sucesso
- [ ] Container rodando (docker ps)
- [ ] Site acessível via IP
- [ ] SSL configurado (se tiver domínio)
- [ ] Firewall configurado
- [ ] Monitoramento configurado (opcional)

---

## 📞 Informações do Projeto

- **Container**: portfolio-gustavo
- **Porta**: 80 (pode mudar para 8080 se usar SSL)
- **Diretório**: /var/www/portfolio
- **Repositório**: https://github.com/guhesse/portfolio
- **Docker Image**: nginx:alpine
- **Build**: npm run build → Vite
