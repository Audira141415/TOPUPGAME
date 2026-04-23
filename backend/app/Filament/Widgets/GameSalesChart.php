<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class GameSalesChart extends ChartWidget
{
    protected ?string $heading = 'Game Popularity';
    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $data = Order::where('payment_status', 'paid')
            ->join('games', 'orders.game_id', '=', 'games.id')
            ->select('games.name', DB::raw('count(*) as total'))
            ->groupBy('games.id', 'games.name')
            ->orderBy('total', 'desc')
            ->limit(5)
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Total Orders',
                    'data' => $data->pluck('total')->toArray(),
                    'backgroundColor' => [
                        '#FFDE00', // Yellow
                        '#00FFFF', // Cyan
                        '#FF00FF', // Magenta
                        '#4F46E5', // Indigo
                        '#10B981', // Emerald
                    ],
                ],
            ],
            'labels' => $data->pluck('name')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'pie';
    }
}
