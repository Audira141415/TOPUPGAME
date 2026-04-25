<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class LatestOrders extends BaseWidget
{
    use \Filament\Widgets\Concerns\InteractsWithPageFilters;

    protected static ?int $sort = 2;
    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(function () {
                $startDate = $this->filters['startDate'] ?? null;
                $endDate = $this->filters['endDate'] ?? null;

                $query = Order::query();

                if ($startDate) {
                    $query->whereDate('created_at', '>=', $startDate);
                }
                if ($endDate) {
                    $query->whereDate('created_at', '<=', $endDate);
                }

                return $query->latest()->limit(10);
            })
            ->columns([
                Tables\Columns\TextColumn::make('order_id')
                    ->label('ID Pesanan')
                    ->searchable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('game.name')
                    ->label('Game'),
                Tables\Columns\TextColumn::make('product.name')
                    ->label('Produk'),
                Tables\Columns\TextColumn::make('total_amount')
                    ->label('Total')
                    ->money('IDR'),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (?string $state): string => match ($state) {
                        'pending' => 'warning',
                        'processing' => 'info',
                        'success' => 'success',
                        'failed' => 'danger',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Waktu')
                    ->dateTime()
                    ->sortable(),
            ])
            ->actions([
                \Filament\Actions\Action::make('view')
                    ->label('Detail')
                    ->icon('heroicon-m-eye')
                    ->color('info')
                    ->url(fn (Order $record): string => \App\Filament\Resources\Orders\OrderResource::getUrl('edit', ['record' => $record])),
            ]);
    }
}
