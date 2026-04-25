<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class OrderStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Transaksi', Order::count())
                ->description('Semua riwayat pesanan')
                ->descriptionIcon('heroicon-m-shopping-bag')
                ->color('info'),
            Stat::make('Transaksi Sukses', Order::where('status', 'success')->count())
                ->description('Pesanan selesai')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success'),
            Stat::make('Transaksi Pending', Order::where('status', 'pending')->count())
                ->description('Menunggu proses')
                ->descriptionIcon('heroicon-m-clock')
                ->color('warning'),
            Stat::make('Total Omzet', 'Rp ' . number_format(Order::where('payment_status', 'paid')->sum('total_amount'), 0, ',', '.'))
                ->description('Pendapatan kotor')
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('primary'),
        ];
    }
}
