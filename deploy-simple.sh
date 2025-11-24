#!/bin/bash

# Script de deploy SIMPLIFICADO (sem Docker Compose)
# Autor: Gustavo Hesse

set -e

echo "🚀 Iniciando deploy do portfolio..."

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Verificar Docker
echo "🔍 Verificando Docker..."
if ! command -v docker &> /dev/null; then
    print_error "Docker não está instalado!"
    exit 1
fi
print_success "Docker encontrado"

# Parar e remover container antigo se existir
echo "🛑 Parando container antigo..."
if docker ps -a | grep -q "portfolio-gustavo"; then
    docker stop portfolio-gustavo 2>/dev/null || true
    docker rm portfolio-gustavo 2>/dev/null || true
    print_success "Container antigo removido"
fi

# Remover imagem antiga se existir
if docker images | grep -q "portfolio-novo"; then
    docker rmi portfolio-novo-portfolio 2>/dev/null || true
fi

# Build da imagem
echo "🔨 Fazendo build da imagem Docker..."
docker build -t portfolio-gustavo:latest .
print_success "Build concluído"

# Iniciar novo container
echo "🚀 Iniciando novo container..."
docker run -d \
    --name portfolio-gustavo \
    --restart unless-stopped \
    -p 80:80 \
    -e NODE_ENV=production \
    portfolio-gustavo:latest

print_success "Container iniciado"

# Aguardar inicialização
echo "⏳ Aguardando inicialização..."
sleep 5

# Verificar se está rodando
if docker ps | grep -q "portfolio-gustavo"; then
    print_success "Container está rodando!"
    
    echo ""
    echo "📊 Informações do Deploy:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Container: portfolio-gustavo"
    echo "Porta: 80"
    echo "Status: $(docker inspect -f '{{.State.Status}}' portfolio-gustavo)"
    echo ""
    
    # Testar resposta
    echo "🧪 Testando resposta do servidor..."
    sleep 2
    if curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q "200\|301\|302"; then
        print_success "Site está respondendo!"
        echo ""
        echo "✨ Deploy concluído com sucesso!"
        echo "🌐 Acesse: http://$(curl -s ifconfig.me 2>/dev/null || echo 'seu-ip')"
    else
        print_warning "Verificando logs..."
        docker logs --tail 20 portfolio-gustavo
    fi
else
    print_error "Container não está rodando!"
    echo "Logs de erro:"
    docker logs portfolio-gustavo
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 Comandos úteis:"
echo "  Ver logs: docker logs -f portfolio-gustavo"
echo "  Parar: docker stop portfolio-gustavo"
echo "  Reiniciar: docker restart portfolio-gustavo"
echo "  Remover: docker stop portfolio-gustavo && docker rm portfolio-gustavo"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
