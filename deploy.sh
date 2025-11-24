#!/bin/bash

# Script de deploy automatizado para VPS
# Autor: Gustavo Hesse
# Data: 2025-11-24

set -e  # Parar em caso de erro

echo "🚀 Iniciando deploy do portfolio..."

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# 1. Verificar se Docker está instalado
echo "🔍 Verificando Docker..."
if ! command -v docker &> /dev/null; then
    print_error "Docker não está instalado!"
    exit 1
fi
print_success "Docker encontrado"

# 2. Verificar se Docker Compose está instalado
echo "🔍 Verificando Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose não está instalado!"
    exit 1
fi
print_success "Docker Compose encontrado"

# 3. Fazer backup do site anterior (se existir)
if [ -d "/var/www/html.backup" ]; then
    print_warning "Backup anterior encontrado, removendo..."
    sudo rm -rf /var/www/html.backup
fi

if [ -d "/var/www/html" ]; then
    echo "💾 Fazendo backup do site anterior..."
    sudo cp -r /var/www/html /var/www/html.backup
    print_success "Backup criado em /var/www/html.backup"
fi

# 4. Parar containers existentes na porta 80
echo "🛑 Parando serviços na porta 80..."
if docker ps | grep -q "portfolio-gustavo"; then
    docker-compose down
    print_success "Container anterior parado"
fi

# Verificar se há outros serviços na porta 80
if sudo lsof -i :80 &> /dev/null; then
    print_warning "Há um serviço rodando na porta 80"
    echo "Serviços na porta 80:"
    sudo lsof -i :80
    
    read -p "Deseja parar o serviço? (s/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        # Tentar parar Nginx se estiver rodando
        if systemctl is-active --quiet nginx; then
            sudo systemctl stop nginx
            print_success "Nginx parado"
        fi
        
        # Tentar parar Apache se estiver rodando
        if systemctl is-active --quiet apache2; then
            sudo systemctl stop apache2
            print_success "Apache parado"
        fi
    else
        print_error "Deploy cancelado. Libere a porta 80 manualmente."
        exit 1
    fi
fi

# 5. Build da aplicação
echo "🔨 Fazendo build do container..."
docker-compose build --no-cache
print_success "Build concluído"

# 6. Iniciar o container
echo "🚀 Iniciando container..."
docker-compose up -d
print_success "Container iniciado"

# 7. Aguardar o container iniciar
echo "⏳ Aguardando inicialização..."
sleep 5

# 8. Verificar se o container está rodando
if docker ps | grep -q "portfolio-gustavo"; then
    print_success "Container está rodando!"
    
    # Mostrar informações
    echo ""
    echo "📊 Informações do Deploy:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Container: portfolio-gustavo"
    echo "Porta: 80"
    echo "Status: $(docker inspect -f '{{.State.Status}}' portfolio-gustavo)"
    echo ""
    
    # Testar se o site está respondendo
    echo "🧪 Testando resposta do servidor..."
    if curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q "200"; then
        print_success "Site está respondendo corretamente!"
        echo ""
        echo "✨ Deploy concluído com sucesso!"
        echo "🌐 Acesse seu site em: http://$(curl -s ifconfig.me)"
    else
        print_warning "Site pode não estar respondendo. Verificando logs..."
        docker logs --tail 20 portfolio-gustavo
    fi
else
    print_error "Container não está rodando!"
    echo "Verificando logs de erro..."
    docker logs portfolio-gustavo
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 Comandos úteis:"
echo "  Ver logs: docker logs -f portfolio-gustavo"
echo "  Parar: docker-compose down"
echo "  Reiniciar: docker-compose restart"
echo "  Atualizar: git pull && ./deploy.sh"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
