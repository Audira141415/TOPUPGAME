<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\HeroWidget;
use Filament\Pages\Dashboard as BaseDashboard;

use Filament\Pages\Dashboard\Concerns\HasFilters;

class Dashboard extends BaseDashboard
{
    use HasFilters;

    protected function getHeaderWidgets(): array
    {
        return [
            \App\Filament\Widgets\StatsOverview::class,
        ];
    }

    public function filtersForm(\Filament\Forms\Form $form): \Filament\Forms\Form
    {
        return $form
            ->schema([
                \Filament\Forms\Components\Section::make()
                    ->schema([
                        \Filament\Forms\Components\DatePicker::make('startDate')
                            ->label('Dari Tanggal'),
                        \Filament\Forms\Components\DatePicker::make('endDate')
                            ->label('Sampai Tanggal'),
                    ])
                    ->columns(2),
            ]);
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
