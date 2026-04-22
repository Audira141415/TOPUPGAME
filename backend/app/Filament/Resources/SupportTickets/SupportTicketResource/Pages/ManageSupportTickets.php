<?php

namespace App\Filament\Resources\SupportTickets\SupportTicketResource\Pages;

use App\Filament\Resources\SupportTickets\SupportTicketResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageSupportTickets extends ManageRecords
{
    protected static string $resource = SupportTicketResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
