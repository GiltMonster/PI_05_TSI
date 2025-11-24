# Usa imagem base com PHP 8.3 FPM
FROM php:8.3-cli

# Instala dependências do sistema e extensões do PHP
RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    zip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    libcurl4-openssl-dev \
    pkg-config \
    libssl-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl bcmath

# Instala o Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Cria diretório da aplicação
WORKDIR /var/www

# Copia os arquivos da aplicação Laravel
COPY . .

# Instala dependências (sem as de dev)
RUN composer install --no-dev --optimize-autoloader

# Corrige permissões (importante pro storage e cache)
RUN chmod -R 755 /var/www/storage /var/www/bootstrap/cache \
    && chown -R www-data:www-data /var/www

# Copia o script de deploy
COPY deploy.sh /var/www/deploy.sh
RUN chmod +x /var/www/deploy.sh

# Expõe a porta esperada pelo Railway
EXPOSE 8080

# Comando que será executado quando o container iniciar
CMD ["./deploy.sh"]
