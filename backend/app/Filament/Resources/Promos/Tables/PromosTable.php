<?php

namespace App\Filament\Resources\Promos\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
// Removed incorrect imports
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Table;

class PromosTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image_url')
                    ->label('Banner'),
                TextColumn::make('name')
                    ->label('Nama Promo')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                TextColumn::make('game.name')
                    ->label('Khusus Game')
                    ->placeholder('Semua Game')
                    ->badge(),
                TextColumn::make('code')
                    ->label('Kode')
                    ->fontFamily('mono')
                    ->copyable(),
                TextColumn::make('type')
                    ->badge()
                    ->color(fn (?string $state): string => match ($state) {
                        'fixed' => 'success',
                        'percentage' => 'warning',
                        default => 'gray',
                    }),
                TextColumn::make('quota')
                    ->label('Kuota')
                    ->description(fn ($record) => "Terpakai: " . ($record->used ?? 0)),
                IconColumn::make('is_active')
                    ->label('Status')
                    ->boolean(),
                TextColumn::make('end_at')
                    ->label('Berakhir')
                    ->dateTime()
                    ->color('danger')
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                \Filament\Actions\EditAction::make(),
                \Filament\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                \Filament\Actions\BulkActionGroup::make([
                    \Filament\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
