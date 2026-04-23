<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use App\Models\Game;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Carbon\Carbon;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;
    protected ?string $pollingInterval = '15s';

    protected function getStats(): array
    {
        $now = Carbon::now();
        $todayOrders = Order::whereDate('created_at', Carbon::today())->count();
        $yesterdayOrders = Order::whereDate('created_at', Carbon::yesterday())->count();
        $orderChange = $yesterdayOrders > 0 ? (($todayOrders - $yesterdayOrders) / $yesterdayOrders) * 100 : 100;

        $todayRevenue = Order::where('payment_status', 'paid')->whereDate('created_at', Carbon::today())->sum('total_amount');
        $yesterdayRevenue = Order::where('payment_status', 'paid')->whereDate('created_at', Carbon::yesterday())->sum('total_amount');
        $revenueChange = $yesterdayRevenue > 0 ? (($todayRevenue - $yesterdayRevenue) / $yesterdayRevenue) * 100 : 100;

        $totalProfit = Order::where('payment_status', 'paid')->sum('profit');

        return [
            Stat::make('Order Hari Ini', $todayOrders)
                ->description($orderChange >= 0 ? number_format($orderChange, 1) . '% Naik' : number_format(abs($orderChange), 1) . '% Turun')
                ->descriptionIcon($orderChange >= 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                ->color($orderChange >= 0 ? 'success' : 'danger')
                ->chart([7, 2, 10, 3, 15, 4, $todayOrders]),

            Stat::make('Omzet Hari Ini', 'Rp ' . number_format($todayRevenue, 0, ',', '.'))
                ->description($revenueChange >= 0 ? number_format($revenueChange, 1) . '% Naik' : number_format(abs($revenueChange), 1) . '% Turun')
                ->descriptionIcon($revenueChange >= 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                ->color($revenueChange >= 0 ? 'success' : 'danger')
                ->chart([10, 15, 8, 12, 19, 14, $todayRevenue / 1000]),

            Stat::make('Total Profit Bersih', 'Rp ' . number_format($totalProfit, 0, ',', '.'))
                ->description('Akumulasi keuntungan semua transaksi')
                ->descriptionIcon('heroicon-m-chart-bar-square')
                ->color('primary'),

            Stat::make('Total Saldo User', 'Rp ' . number_format(User::sum('balance'), 0, ',', '.'))
                ->description('Total kewajiban dana mengendap')
                ->descriptionIcon('heroicon-m-wallet')
                ->color('warning'),

            Stat::make('Promo Aktif', \App\Models\Promo::count())
                ->description('Voucher & diskon yang sedang jalan')
                ->descriptionIcon('heroicon-m-gift')
                ->color('danger'),

            Stat::make('Support Tickets', \App\Models\SupportTicket::where('status', 'open')->count())
                ->description('Butuh respon segera')
                ->descriptionIcon('heroicon-m-chat-bubble-left-right')
                ->color('info'),
        ];
    }
}
