<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;

class Reports extends Page
{
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-document-chart-bar';
    protected static string|\UnitEnum|null $navigationGroup = 'MENU UTAMA';
    protected static ?string $navigationLabel = 'Laporan';
    protected static ?int $navigationSort = 14;
    protected string $view = 'filament.pages.reports';

    public function getHeaderWidgets(): array
    {
        return [
            \App\Filament\Widgets\RevenueChart::class,
            \App\Filament\Widgets\OrderStatsWidget::class,
        ];
    }
}
