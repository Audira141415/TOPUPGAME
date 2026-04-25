<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\Widget;
use Illuminate\Support\Facades\DB;

class TopSellingGamesWidget extends Widget
{
    protected static ?int $sort = 4;
    protected int | string | array $columnSpan = '1';
    protected string $view = 'filament.widgets.top-selling-games-widget';

    public function getTopGames(): \Illuminate\Support\Collection
    {
        return Order::where('payment_status', 'paid')
            ->join('games', 'orders.game_id', '=', 'games.id')
            ->select('games.name', 'games.image', DB::raw('count(*) as total_sales'))
            ->groupBy('games.id', 'games.name', 'games.image')
            ->orderBy('total_sales', 'desc')
            ->limit(5)
            ->get();
    }
}
