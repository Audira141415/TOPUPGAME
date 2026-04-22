<?php

namespace App\Filament\Resources\Orders\Schemas;

use Filament\Schemas\Schema;

class OrderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Schemas\Components\TextInput::make('order_id')
                    ->disabled()
                    ->required(),
                \Filament\Schemas\Components\Select::make('game_id')
                    ->relationship('game', 'name')
                    ->disabled(),
                \Filament\Schemas\Components\Select::make('product_id')
                    ->relationship('product', 'name')
                    ->disabled(),
                \Filament\Schemas\Components\TextInput::make('target_user_id')
                    ->disabled(),
                \Filament\Schemas\Components\TextInput::make('total_amount')
                    ->numeric()
                    ->disabled(),
                \Filament\Schemas\Components\Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'processing' => 'Processing',
                        'completed' => 'Completed',
                        'failed' => 'Failed',
                    ])
                    ->required(),
                \Filament\Schemas\Components\Select::make('payment_status')
                    ->options([
                        'unpaid' => 'Unpaid',
                        'paid' => 'Paid',
                        'expired' => 'Expired',
                    ])
                    ->required(),
            ]);
    }
}
