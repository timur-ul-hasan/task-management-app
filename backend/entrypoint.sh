#!/bin/sh

# Start PHP-FPM
php-fpm &

php artisan migrate --force --quiet --no-interaction --graceful

# Start Nginx
nginx -g "daemon off;"

# Run the migration

