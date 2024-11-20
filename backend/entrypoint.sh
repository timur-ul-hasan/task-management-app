#!/bin/sh

# Start PHP-FPM
php-fpm &

# Start Nginx
nginx -g "daemon off;"

# Run the migration

php artisan migrate --force --quiet --no-interaction --graceful