<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\HeroWidget;
use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    protected function getHeaderWidgets(): array
    {
        return [
            HeroWidget::class,
        ];
    }

    protected function getHeaderWidgetsData(): array
    {
        return [
            HeroWidget::class => [
                'title' => 'ADMIN DASHBOARD',
                'description' => 'MANAGE YOUR TOP-UP EMPIRE WITH PRECISION AND STYLE.',
                'color' => 'bg-[#FFDE00]',
            ],
        ];
    }

    public function getWidgets(): array
    {
        return [
            \App\Filament\Widgets\StatsOverview::class,
            \App\Filament\Widgets\GameSalesChart::class,
            \App\Filament\Widgets\RevenueChart::class,
            \App\Filament\Widgets\LatestOrders::class,
        ];
    }
}
