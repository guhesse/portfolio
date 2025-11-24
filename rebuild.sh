#!/bin/bash

echo "🔄 Rebuilding portfolio container..."

# Para e remove o container atual
docker-compose down

# Rebuilda a imagem
docker-compose build --no-cache

# Sobe o container novamente
docker-compose up -d

echo "✅ Container rebuilt and running!"
echo "🌐 Site: http://gustavohesse.com.br"
echo "📅 Meet: http://meet.gustavohesse.com.br"
