<?php

namespace App\Filament\Resources\Users;

use App\Filament\Resources\Users\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
// Removed incorrect imports
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;

class UserResource extends Resource
{
    protected static ?string $model = User::class;
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-users';
    protected static string|\UnitEnum|null $navigationGroup = 'User Management';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Forms\Components\Section::make('Identitas User')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                        Forms\Components\TextInput::make('password')
                            ->password()
                            ->dehydrated(fn ($state) => filled($state))
                            ->required(fn (string $context): bool => $context === 'create'),
                    ])->columns(2),
                
                Forms\Components\Section::make('Keanggotaan & Keuangan')
                    ->schema([
                        Forms\Components\Select::make('role')
                            ->options([
                                'admin' => 'Admin',
                                'member' => 'Member (Regular)',
                                'gold' => 'Gold Member',
                                'platinum' => 'Platinum Member',
                            ])
                            ->required(),
                        Forms\Components\TextInput::make('balance')
                            ->label('Saldo Saat Ini')
                            ->numeric()
                            ->prefix('Rp')
                            ->default(0)
                            ->required(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                \Filament\Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                \Filament\Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->copyable(),
                \Filament\Tables\Columns\TextColumn::make('role')
                    ->badge()
                    ->color(fn (?string $state): string => match ($state) {
                        'admin' => 'danger',
                        'platinum' => 'info',
                        'gold' => 'warning',
                        'member' => 'gray',
                        default => 'gray',
                    }),
                \Filament\Tables\Columns\TextColumn::make('balance')
                    ->label('Saldo')
                    ->money('IDR')
                    ->sortable()
                    ->weight('bold')
                    ->color('success'),
                \Filament\Tables\Columns\TextColumn::make('created_at')
                    ->label('Terdaftar')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                \Filament\Tables\Filters\SelectFilter::make('role')
                    ->options([
                        'admin' => 'Admin',
                        'member' => 'Member',
                        'gold' => 'Gold',
                        'platinum' => 'Platinum',
                    ]),
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

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
