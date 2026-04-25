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
                \Filament\Tables\Columns\ImageColumn::make('image')
                    ->label('Ikon')
                    ->disk('public')
                    ->size(40)
                    ->square(),
                TextColumn::make('name')
                    ->label('Produk')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('game.name')
                    ->label('Game')
                    ->sortable(),
                TextColumn::make('price_basic')
                    ->label('Harga Member')
                    ->money('IDR')
                    ->sortable(),
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
