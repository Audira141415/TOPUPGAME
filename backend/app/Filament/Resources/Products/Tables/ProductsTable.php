<?php

namespace App\Filament\Resources\Products\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
// Removed incorrect imports
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ProductsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('game.name')
                    ->label('Game')
                    ->description(fn ($record) => $record->name)
                    ->icon(fn ($record) => $record->game?->image ? 'url(' . asset('storage/' . $record->game->image) . ')' : null)
                    ->searchable()
                    ->sortable(),
                TextColumn::make('price_basic')
                    ->label('Basic')
                    ->money('IDR')
                    ->sortable(),
                TextColumn::make('price_gold')
                    ->label('Gold')
                    ->money('IDR')
                    ->sortable(),
                TextColumn::make('price_platinum')
                    ->label('Platinum')
                    ->money('IDR')
                    ->sortable(),
                \Filament\Tables\Columns\IconColumn::make('is_active')
                    ->label('Status')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-badge')
                    ->falseIcon('heroicon-o-x-circle')
                    ->trueColor('success')
                    ->falseColor('danger'),
                TextColumn::make('stock')
                    ->label('Stok')
                    ->sortable(),
                TextColumn::make('sku')
                    ->label('SKU')
                    ->fontFamily('mono')
                    ->copyable(),
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
