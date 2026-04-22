<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Select::make('game_id')
                    ->relationship('game', 'name')
                    ->required(),
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                TextInput::make('sku')
                    ->maxLength(255),
                TextInput::make('price_basic')
                    ->numeric()
                    ->required()
                    ->prefix('Rp'),
                TextInput::make('price_gold')
                    ->numeric()
                    ->prefix('Rp'),
                TextInput::make('price_platinum')
                    ->numeric()
                    ->prefix('Rp'),
                TextInput::make('price_cost')
                    ->numeric()
                    ->prefix('Rp')
                    ->helperText('Harga Modal'),
                TextInput::make('stock')
                    ->numeric()
                    ->default(999),
                TextInput::make('provider_product_id')
                    ->maxLength(255)
                    ->helperText('ID Produk dari Provider (Digiflazz/Tripay)'),
                Toggle::make('is_active')
                    ->default(true),
            ]);
    }
}
