#!/bin/bash

# ==============================================================================
# AUDIRA ZENITH - AUTOMATED DEPLOYMENT SCRIPT
# ==============================================================================
# Purpose: Sync production server with local development state.
# Usage: ./deploy.sh
# ==============================================================================

echo "🚀 Starting Deployment for Audira Zenith..."

# 1. Pull the latest code from GitHub
echo "📥 Pulling latest changes from Git..."
git pull origin main

# 2. Update Backend Dependencies
echo "🐘 Updating Composer dependencies..."
composer install --no-interaction --prefer-dist --optimize-autoloader

# 3. Database Updates
echo "🗄️ Running database migrations and seeders..."
php artisan migrate --force

# Seeders for New Games (Strategy, RPG, Anime, PC)
echo "🎮 Seeding new game data..."
php artisan db:seed --class=StrategyGamesSeeder --force
php artisan db:seed --class=AdditionalStrategyGamesSeeder --force
php artisan db:seed --class=RPGGamesSeeder --force
php artisan db:seed --class=AnimeGamesSeeder --force
php artisan db:seed --class=PCGamesSeeder --force

# 4. Clear and Optimize Caches
echo "🧹 Clearing Laravel caches..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 5. Frontend Build
echo "🌐 Building Frontend..."
if [ -d "frontend" ]; then
    cd frontend
    npm install
    npm run build
    cd ..
else
    echo "⚠️ Frontend directory not found!"
fi

# 6. Storage Link
echo "🔗 Ensuring storage link exists..."
php artisan storage:link

echo "✅ DEPLOYMENT COMPLETE! Audira Zenith is now synced with Local."
echo "🌐 URL: http://192.168.100.156"
