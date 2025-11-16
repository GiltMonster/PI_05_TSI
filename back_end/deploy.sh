#!/bin/bash

echo "🧼 Limpando cache..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

echo "🔐 Gerando APP_KEY (se necessário)..."
php artisan key:generate || true

echo "📦 Instalando dependências (caso falte algo)..."
composer install --no-interaction --prefer-dist --optimize-autoloader

echo "🧬 Rodando migrations (modo --force)..."
php artisan migrate --force || echo "⚠️ Migrations já aplicadas ou com erro"

echo "🚀 Cacheando configuração..."
php artisan config:cache

echo "✅ Servidor Laravel iniciado via PHP embutido"
php -S 0.0.0.0:8080 -t public
