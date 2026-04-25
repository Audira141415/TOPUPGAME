<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class UserBalanceWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Saldo User', 'Rp ' . number_format(User::sum('balance'), 0, ',', '.'))
                ->description('Total dana yang mengendap di sistem')
                ->descriptionIcon('heroicon-m-wallet')
                ->color('success'),
            
            Stat::make('User dengan Saldo', User::where('balance', '>', 0)->count())
                ->description('Jumlah user yang memiliki saldo aktif')
                ->descriptionIcon('heroicon-m-users')
                ->color('info'),

            Stat::make('Rata-rata Saldo', 'Rp ' . number_format(User::where('balance', '>', 0)->avg('balance') ?? 0, 0, ',', '.'))
                ->description('Rata-rata saldo per user aktif')
                ->descriptionIcon('heroicon-m-chart-bar')
                ->color('warning'),
        ];
    }
}
