<?php

namespace App\Filament\Resources\PaymentMethods\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Schema;

class PaymentMethodForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema([
                TextInput::make('name')
                    ->label('Nama Metode Pembayaran')
                    ->required(),
                TextInput::make('code')
                    ->label('Kode Payment (API Code)')
                    ->required(),
                Select::make('type')
                    ->options([
                        'manual' => 'Manual Transfer',
                        'automatic' => 'Automatic (Payment Gateway)',
                    ])
                    ->required(),
                FileUpload::make('image_url')
                    ->label('Logo Pembayaran')
                    ->image()
                    ->directory('payment-methods'),
                TextInput::make('fee')
                    ->label('Fee Flat (Rp)')
                    ->numeric()
                    ->default(0),
                TextInput::make('fee_percent')
                    ->label('Fee Persentase (%)')
                    ->numeric()
                    ->default(0),
                TextInput::make('min_amount')
                    ->label('Minimal Transaksi')
                    ->numeric()
                    ->default(0),
                TextInput::make('max_amount')
                    ->label('Maksimal Transaksi')
                    ->numeric()
                    ->default(10000000),
                RichEditor::make('instructions')
                    ->label('Panduan Pembayaran')
                    ->placeholder('Contoh: Silakan transfer ke rekening BCA...')
                    ->columnSpanFull(),
                Toggle::make('is_active')
                    ->label('Aktifkan Metode')
                    ->default(true),
            ]);
    }
}
