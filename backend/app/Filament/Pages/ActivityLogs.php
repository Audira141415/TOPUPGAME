<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;

class ActivityLogs extends Page
{
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-clipboard-document-list';
    protected static string|\UnitEnum|null $navigationGroup = 'PENGATURAN';
    protected static ?string $navigationLabel = 'Logs Aktivitas';
    protected static ?int $navigationSort = 110;
    protected string $view = 'filament.pages.activity-logs';
}
