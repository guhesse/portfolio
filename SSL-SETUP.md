# 🔒 Configuração SSL/HTTPS

## Passo 1: Instalar Certbot no servidor

```bash
ssh root@147.93.68.250
cd /var/www/portfolio

# Instalar certbot
sudo apt-get update
sudo apt-get install -y certbot

# Parar container temporariamente
docker-compose down
```

## Passo 2: Obter certificado SSL

```bash
sudo certbot certonly --standalone \
  -d gustavohesse.com.br \
  -d www.gustavohesse.com.br \
  -d meet.gustavohesse.com.br \
  --non-interactive \
  --agree-tos \
  --email hesse.gustavo@gmail.com
```

## Passo 3: Copiar certificados para o projeto

```bash
# Criar diretório
mkdir -p /var/www/portfolio/ssl

# Copiar certificados
sudo cp /etc/letsencrypt/live/gustavohesse.com.br/fullchain.pem /var/www/portfolio/ssl/
sudo cp /etc/letsencrypt/live/gustavohesse.com.br/privkey.pem /var/www/portfolio/ssl/
sudo chmod 644 /var/www/portfolio/ssl/*.pem
```

## Passo 4: Atualizar código e rebuildar

```bash
cd /var/www/portfolio
git pull origin main
docker-compose build --no-cache
docker-compose up -d
```

## Passo 5: Configurar renovação automática

```bash
# Testar renovação
sudo certbot renew --dry-run

# Criar script de renovação
sudo nano /etc/cron.monthly/renew-ssl.sh
```

Adicione no arquivo:
```bash
#!/bin/bash
certbot renew --quiet
cp /etc/letsencrypt/live/gustavohesse.com.br/fullchain.pem /var/www/portfolio/ssl/
cp /etc/letsencrypt/live/gustavohesse.com.br/privkey.pem /var/www/portfolio/ssl/
cd /var/www/portfolio && docker-compose restart
```

Tornar executável:
```bash
sudo chmod +x /etc/cron.monthly/renew-ssl.sh
```

## Verificar

- ✅ https://gustavohesse.com.br
- ✅ https://www.gustavohesse.com.br  
- ✅ https://meet.gustavohesse.com.br → Calendly

**Nota:** O certificado expira a cada 90 dias e será renovado automaticamente.
