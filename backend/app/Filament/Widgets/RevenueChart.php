<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RevenueChart extends ChartWidget
{
    use \Filament\Widgets\Concerns\InteractsWithPageFilters;

    protected ?string $heading = 'Analisis Omzet & Profit';
    protected static ?int $sort = 3;
    protected int | string | array $columnSpan = 'full';

    protected function getData(): array
    {
        $startDate = $this->filters['startDate'] ?? now()->subDays(30);
        $endDate = $this->filters['endDate'] ?? now();

        $startDate = Carbon::parse($startDate);
        $endDate = Carbon::parse($endDate);

        // Get Revenue Data
        $revenueData = Order::where('payment_status', 'paid')
            ->whereBetween('created_at', [$startDate->startOfDay(), $endDate->endOfDay()])
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(total_amount) as total')
            )
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->pluck('total', 'date')
            ->toArray();

        // Get Profit Data
        $profitData = Order::where('payment_status', 'paid')
            ->whereBetween('created_at', [$startDate->startOfDay(), $endDate->endOfDay()])
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(profit) as total')
            )
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->pluck('total', 'date')
            ->toArray();

        // Generate date range labels
        $labels = [];
        $revenueValues = [];
        $profitValues = [];
        
        $currentDate = $startDate->copy();
        while ($currentDate <= $endDate) {
            $dateString = $currentDate->format('Y-m-d');
            $labels[] = $dateString;
            $revenueValues[] = $revenueData[$dateString] ?? 0;
            $profitValues[] = $profitData[$dateString] ?? 0;
            $currentDate->addDay();
        }

        return [
            'datasets' => [
                [
                    'label' => 'Total Omzet (IDR)',
                    'data' => $revenueValues,
                    'fill' => 'start',
                    'borderColor' => '#3b82f6',
                    'backgroundColor' => 'rgba(59, 130, 246, 0.1)',
                ],
                [
                    'label' => 'Profit Bersih (IDR)',
                    'data' => $profitValues,
                    'fill' => 'start',
                    'borderColor' => '#10b981',
                    'backgroundColor' => 'rgba(16, 185, 129, 0.1)',
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
