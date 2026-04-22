<?php

namespace App\Filament\Resources\FlashSales;

use App\Filament\Resources\FlashSales\FlashSaleResource\Pages;
use App\Models\FlashSale;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;

class FlashSaleResource extends Resource
{
    protected static ?string $model = FlashSale::class;
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-bolt';
    protected static string|\UnitEnum|null $navigationGroup = 'Marketing';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Forms\Components\Select::make('product_id')
                    ->relationship('product', 'name')
                    ->searchable()
                    ->required(),
                Forms\Components\TextInput::make('flash_price')
                    ->numeric()
                    ->prefix('Rp')
                    ->required(),
                Forms\Components\TextInput::make('stock')
                    ->numeric()
                    ->required(),
                Forms\Components\DateTimePicker::make('start_time')
                    ->required(),
                Forms\Components\DateTimePicker::make('end_time')
                    ->required(),
                Forms\Components\Toggle::make('is_active')
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                \Filament\Tables\Columns\TextColumn::make('product.name')
                    ->searchable(),
                \Filament\Tables\Columns\TextColumn::make('flash_price')
                    ->money('IDR')
                    ->color('danger')
                    ->weight('bold'),
                \Filament\Tables\Columns\TextColumn::make('sold')
                    ->description(fn (FlashSale $record): string => "Dari " . $record->stock . " Stok"),
                \Filament\Tables\Columns\TextColumn::make('end_time')
                    ->label('Berakhir')
                    ->dateTime()
                    ->sortable()
                    ->color(fn (FlashSale $record): string => now()->gt($record->end_time) ? 'danger' : 'success'),
                \Filament\Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageFlashSales::route('/'),
        ];
    }
}
