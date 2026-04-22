<?php

namespace App\Filament\Resources\Providers\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Table;

class ProvidersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Provider')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                TextColumn::make('environment')
                    ->label('Environment')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'sandbox' => 'warning',
                        'production' => 'success',
                    }),
                TextColumn::make('api_url')
                    ->label('Endpoint')
                    ->color('gray')
                    ->limit(30),
                IconColumn::make('is_active')
                    ->label('Status')
                    ->boolean(),
                TextColumn::make('created_at')
                    ->label('Terdaftar')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
