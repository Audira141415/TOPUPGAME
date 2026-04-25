<?php

namespace App\Filament\Resources\Vouchers;

use App\Filament\Resources\Vouchers\VoucherResource\Pages;
use App\Models\Voucher;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
// Deleted incorrect imports
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;

class VoucherResource extends Resource
{
    protected static ?string $model = Voucher::class;
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-ticket';
    protected static string|\UnitEnum|null $navigationGroup = 'Marketing';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Forms\Components\TextInput::make('code')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),
                Forms\Components\Select::make('type')
                    ->options([
                        'fixed' => 'Fixed Amount (Rp)',
                        'percentage' => 'Percentage (%)',
                    ])
                    ->required(),
                Forms\Components\TextInput::make('value')
                    ->numeric()
                    ->required(),
                Forms\Components\TextInput::make('min_purchase')
                    ->numeric()
                    ->default(0),
                Forms\Components\TextInput::make('max_discount')
                    ->numeric()
                    ->helperText('Hanya berlaku untuk tipe persentase'),
                Forms\Components\TextInput::make('quota')
                    ->numeric()
                    ->default(0)
                    ->helperText('0 berarti tidak terbatas'),
                Forms\Components\DateTimePicker::make('start_date'),
                Forms\Components\DateTimePicker::make('end_date'),
                Forms\Components\Toggle::make('is_active')
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                \Filament\Tables\Columns\TextColumn::make('code')
                    ->searchable()
                    ->fontFamily('mono')
                    ->weight('bold'),
                \Filament\Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->color(fn (?string $state): string => match ($state) {
                        'fixed' => 'success',
                        'percentage' => 'warning',
                        default => 'gray',
                    }),
                \Filament\Tables\Columns\TextColumn::make('value')
                    ->money('IDR'),
                \Filament\Tables\Columns\TextColumn::make('used')
                    ->label('Pemakaian')
                    ->description(fn (Voucher $record): string => "Kuota: " . ($record->quota ?: '∞')),
                \Filament\Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                \Filament\Tables\Columns\TextColumn::make('end_date')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                \Filament\Actions\EditAction::make(),
                \Filament\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                \Filament\Actions\BulkActionGroup::make([
                    \Filament\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageVouchers::route('/'),
        ];
    }
}
