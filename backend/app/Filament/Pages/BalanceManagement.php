<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;

class BalanceManagement extends Page
{
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-banknotes';
    protected static string|\UnitEnum|null $navigationGroup = 'MENU UTAMA';
    protected static ?string $navigationLabel = 'Saldo & Keuangan';
    protected static ?int $navigationSort = 8;
    protected string $view = 'filament.pages.balance-management';
}
