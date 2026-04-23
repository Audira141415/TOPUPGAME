<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RevenueChart extends ChartWidget
{
    protected ?string $heading = 'Monthly Revenue Growth';
    protected static ?int $sort = 3;
    protected int | string | array $columnSpan = 'full';

    protected function getData(): array
    {
        $data = Order::where('payment_status', 'paid')
            ->select(
                DB::raw('SUM(total_amount) as revenue'),
                DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month')
            )
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->limit(12)
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Revenue (IDR)',
                    'data' => $data->pluck('revenue')->toArray(),
                    'fill' => 'start',
                    'borderColor' => '#FF00FF', // Magenta
                    'backgroundColor' => 'rgba(255, 0, 255, 0.1)',
                ],
            ],
            'labels' => $data->pluck('month')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
