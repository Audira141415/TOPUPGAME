<?php

namespace App\Filament\Resources\Orders\Tables;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use App\Models\Order;
use Illuminate\Support\Facades\Response;
use Filament\Actions\EditAction;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;

class OrdersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('order_id')
                    ->label('ID Pesanan')
                    ->searchable()
                    ->fontFamily('mono')
                    ->weight('bold'),
                TextColumn::make('game.name')
                    ->label('Game')
                    ->sortable(),
                TextColumn::make('product.name')
                    ->label('Produk'),
                TextColumn::make('total_amount')
                    ->label('Total')
                    ->money('IDR')
                    ->sortable(),
                TextColumn::make('profit')
                    ->label('Keuntungan')
                    ->money('IDR')
                    ->color('success')
                    ->weight('bold'),
                TextColumn::make('payment_status')
                    ->label('Bayar')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'paid' => 'success',
                        'unpaid' => 'danger',
                        'expired' => 'gray',
                        default => 'warning',
                    }),
                TextColumn::make('status')
                    ->label('Proses')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'success' => 'success',
                        'failed' => 'danger',
                        'pending' => 'warning',
                        'processing' => 'info',
                    }),
                TextColumn::make('created_at')
                    ->label('Waktu')
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
                Action::make('export_csv')
                    ->label('Export CSV')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->color('success')
                    ->action(function () {
                        $orders = Order::all();
                        $csvData = "ID Pesanan,Game,Produk,Total,Profit,Status Bayar,Status Proses,Waktu\n";
                        
                        foreach ($orders as $order) {
                            $csvData .= "{$order->order_id},{$order->game?->name},{$order->product?->name},{$order->total_amount},{$order->profit},{$order->payment_status},{$order->status},{$order->created_at}\n";
                        }

                        return Response::streamDownload(function () use ($csvData) {
                            echo $csvData;
                        }, 'laporan_transaksi_' . date('Y-m-d') . '.csv');
                    }),
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
