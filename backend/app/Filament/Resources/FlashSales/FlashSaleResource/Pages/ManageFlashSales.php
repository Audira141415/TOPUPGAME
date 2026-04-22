<?php

namespace App\Filament\Resources\FlashSales\FlashSaleResource\Pages;

use App\Filament\Resources\FlashSales\FlashSaleResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageFlashSales extends ManageRecords
{
    protected static string $resource = FlashSaleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
