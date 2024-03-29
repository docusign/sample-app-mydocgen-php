FROM php:8.1-fpm as app

RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        libzip-dev \
    && docker-php-ext-install pdo_mysql mysqli zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd \
    && rm -rf /var/cache/apt/*

COPY --from=composer:2.6 /usr/bin/composer /usr/local/bin/composer

WORKDIR /var/www/html

FROM app as app_prod

COPY --chown=www-data:www-data . /var/www/html

RUN composer install --no-dev --no-cache

RUN chmod -R 755 storage
RUN chmod -R 755 public/temp

RUN php artisan cache:clear

FROM app as app_dev

