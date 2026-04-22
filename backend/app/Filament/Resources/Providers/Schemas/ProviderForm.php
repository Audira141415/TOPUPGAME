<?php

namespace App\Filament\Resources\Providers\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;

class ProviderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema([
                TextInput::make('name')
                    ->label('Nama Provider')
                    ->required(),
                Select::make('environment')
                    ->options([
                        'sandbox' => 'Sandbox (Development)',
                        'production' => 'Production (Live)',
                    ])
                    ->default('sandbox')
                    ->required(),
                TextInput::make('api_url')
                    ->label('Base API URL')
                    ->required(),
                TextInput::make('api_key')
                    ->label('API Key / Username')
                    ->password()
                    ->required(),
                TextInput::make('api_secret')
                    ->label('Private Key / Production Key')
                    ->password(),
                TextInput::make('webhook_url')
                    ->label('Webhook Callback URL')
                    ->disabled()
                    ->placeholder(url('/api/callback/provider')),
                Toggle::make('is_active')
                    ->label('Provider Aktif')
                    ->default(true),
            ]);
    }
}
