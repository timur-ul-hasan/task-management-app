FROM php:8.3-fpm-alpine

RUN apk add nginx brotli nginx-mod-http-brotli \
    && mkdir -p /var/lib/nginx/tmp/client_body \
    && mkdir -p /var/lib/nginx/logs \
    && chmod -R 755 /var/lib/nginx/tmp /var/lib/nginx/logs \
    && mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled

COPY nginx/default.conf /etc/nginx/http.d/default.conf

RUN apk add  \
    bash \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    libxpm-dev \
    libzip-dev \
    libxml2-dev \
    oniguruma-dev \
    zip \
    unzip \
    git \
    build-base \
    shadow \
    mariadb-client \
    postgresql-dev \
    && docker-php-ext-configure gd --with-jpeg --with-webp \
    && docker-php-ext-install pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8888 9000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]