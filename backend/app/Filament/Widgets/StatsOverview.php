<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use App\Models\User;
use App\Models\SupportTicket;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Carbon\Carbon;

class StatsOverview extends BaseWidget
{
    use \Filament\Widgets\Concerns\InteractsWithPageFilters;

    protected static ?int $sort = 1;
    protected ?string $pollingInterval = '15s';

    protected function getStats(): array
    {
        $startDate = $this->filters['startDate'] ?? null;
        $endDate = $this->filters['endDate'] ?? null;

        // Current period calculations
        $query = Order::where('payment_status', 'paid');
        if ($startDate) $query->whereDate('created_at', '>=', $startDate);
        if ($endDate) $query->whereDate('created_at', '<=', $endDate);

        $totalRevenue = $query->sum('total_amount');
        $totalOrders = $query->count();
        $totalProfit = $query->sum('profit');

        // Growth calculations (Last 7 days vs previous 7 days)
        $last7Days = Order::where('payment_status', 'paid')
            ->where('created_at', '>=', now()->subDays(7))
            ->count();
        $prev7Days = Order::where('payment_status', 'paid')
            ->where('created_at', '>=', now()->subDays(14))
            ->where('created_at', '<', now()->subDays(7))
            ->count();
        
        $orderGrowth = $prev7Days > 0 ? (($last7Days - $prev7Days) / $prev7Days) * 100 : 0;
        $orderGrowthLabel = ($orderGrowth >= 0 ? '+' : '') . number_format($orderGrowth, 1) . '% dari minggu lalu';

        $last7Rev = Order::where('payment_status', 'paid')
            ->where('created_at', '>=', now()->subDays(7))
            ->sum('total_amount');
        $prev7Rev = Order::where('payment_status', 'paid')
            ->where('created_at', '>=', now()->subDays(14))
            ->where('created_at', '<', now()->subDays(7))
            ->sum('total_amount');
            
        $revGrowth = $prev7Rev > 0 ? (($last7Rev - $prev7Rev) / $prev7Rev) * 100 : 0;
        $revGrowthLabel = ($revGrowth >= 0 ? '+' : '') . number_format($revGrowth, 1) . '% dari minggu lalu';

        $pendingOrders = Order::where('status', 'pending')->count();
        $prevPending = Order::where('status', 'pending')
            ->where('created_at', '<', now()->subDays(1))
            ->count();
        $pendingChange = $prevPending > 0 ? (($pendingOrders - $prevPending) / $prevPending) * 100 : 0;

        return [
            Stat::make('Total Transaksi', number_format($totalOrders, 0, ',', '.'))
                ->description($orderGrowthLabel)
                ->descriptionIcon($orderGrowth >= 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                ->color($orderGrowth >= 0 ? 'success' : 'danger')
                ->chart([7, 2, 10, 3, 15, 4, 12]),

            Stat::make('Total Revenue', 'Rp ' . number_format($totalRevenue, 0, ',', '.'))
                ->description($revGrowthLabel)
                ->descriptionIcon($revGrowth >= 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                ->color($revGrowth >= 0 ? 'success' : 'danger')
                ->chart([10, 15, 8, 12, 19, 14, 22]),

            Stat::make('Order Pending', $pendingOrders)
                ->description($pendingChange >= 0 ? '+' . number_format($pendingChange, 1) . '% naik' : number_format($pendingChange, 1) . '% turun')
                ->descriptionIcon($pendingChange >= 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                ->color($pendingChange <= 0 ? 'success' : 'warning'),

            Stat::make('Total User', number_format(User::count(), 0, ',', '.'))
                ->description('Total akun terdaftar')
                ->descriptionIcon('heroicon-m-users')
                ->color('info'),

            Stat::make('Saldo Sistem', 'Rp ' . number_format(User::sum('balance'), 0, ',', '.'))
                ->description('Total kewajiban dana')
                ->descriptionIcon('heroicon-m-wallet')
                ->color('primary'),
        ];
    }
}
