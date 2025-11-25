#!/bin/bash

echo "🔒 Configurando SSL com Let's Encrypt..."

# Instala certbot
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# Para o container temporariamente para liberar a porta 80
cd /var/www/portfolio
docker-compose down

# Obtém certificado SSL
sudo certbot certonly --standalone \
  -d gustavohesse.com.br \
  -d www.gustavohesse.com.br \
  -d meet.gustavohesse.com.br \
  --non-interactive \
  --agree-tos \
  --email hesse.gustavo@gmail.com

# Cria diretório para certificados no projeto
mkdir -p /var/www/portfolio/ssl

# Copia certificados
sudo cp /etc/letsencrypt/live/gustavohesse.com.br/fullchain.pem /var/www/portfolio/ssl/
sudo cp /etc/letsencrypt/live/gustavohesse.com.br/privkey.pem /var/www/portfolio/ssl/
sudo chmod 644 /var/www/portfolio/ssl/*.pem

echo "✅ Certificado SSL obtido!"
echo "⚠️  Agora você precisa atualizar o nginx.conf e docker-compose.yml"
echo "    Suba o container novamente: docker-compose up -d"
