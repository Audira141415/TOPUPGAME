<?php

namespace App\Filament\Widgets;

use App\Models\Product;
use App\Models\Game;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class ProductStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Game', Game::count())
                ->description('Koleksi game aktif')
                ->descriptionIcon('heroicon-m-device-phone-mobile')
                ->color('info'),
            Stat::make('Total Produk', Product::count())
                ->description('Varian item/diamond')
                ->descriptionIcon('heroicon-m-cube')
                ->color('primary'),
            Stat::make('Produk Aktif', Product::where('is_active', true)->count())
                ->description('Tersedia di toko')
                ->descriptionIcon('heroicon-m-check-badge')
                ->color('success'),
            Stat::make('Produk Non-Aktif', Product::where('is_active', false)->count())
                ->description('Disembunyikan')
                ->descriptionIcon('heroicon-m-x-circle')
                ->color('danger'),
        ];
    }
}
