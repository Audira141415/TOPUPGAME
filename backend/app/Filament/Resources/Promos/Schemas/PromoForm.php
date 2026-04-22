<?php

namespace App\Filament\Resources\Promos\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\DateTimePicker;
use Filament\Schemas\Schema;

class PromoForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema([
                TextInput::make('name')
                    ->label('Nama Promo')
                    ->required(),
                TextInput::make('code')
                    ->label('Kode Promo (Voucher)')
                    ->unique(ignoreRecord: true)
                    ->required(),
                FileUpload::make('image_url')
                    ->label('Banner Promo')
                    ->image()
                    ->directory('promos'),
                Select::make('type')
                    ->options([
                        'fixed' => 'Fixed Amount (Rp)',
                        'percentage' => 'Percentage (%)',
                    ])
                    ->required(),
                TextInput::make('value')
                    ->label('Nilai Diskon')
                    ->numeric()
                    ->required(),
                TextInput::make('max_discount')
                    ->label('Maksimal Diskon (Rp)')
                    ->numeric(),
                TextInput::make('min_purchase')
                    ->label('Minimal Pembelian (Rp)')
                    ->numeric()
                    ->default(0),
                TextInput::make('quota')
                    ->label('Kuota Promo')
                    ->numeric()
                    ->default(0),
                DateTimePicker::make('start_at')
                    ->label('Mulai Berlaku'),
                DateTimePicker::make('end_at')
                    ->label('Berakhir Pada'),
                Select::make('game_id')
                    ->label('Khusus Game')
                    ->relationship('game', 'name')
                    ->searchable(),
                Toggle::make('is_active')
                    ->label('Promo Aktif')
                    ->default(true),
            ]);
    }
}
