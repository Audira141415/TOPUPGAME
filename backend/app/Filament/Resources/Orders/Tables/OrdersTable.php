<?php

namespace App\Filament\Resources\Orders\Tables;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use App\Models\Order;
use Illuminate\Support\Facades\Response;
// Removed incorrect imports

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
                    ->weight('bold')
                    ->color('primary'),
                TextColumn::make('user.name')
                    ->label('User')
                    ->description(fn ($record) => $record->user?->email)
                    ->searchable(),
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
                    ->color(fn (?string $state): string => match ($state) {
                        'paid' => 'success',
                        'unpaid' => 'danger',
                        'expired' => 'gray',
                        default => 'warning',
                    }),
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'success' => 'SUKSES',
                        'failed' => 'GAGAL',
                        'pending' => 'PENDING',
                        'processing' => 'PROSES',
                        default => strtoupper($state),
                    })
                    ->color(fn (?string $state): string => match ($state) {
                        'success' => 'success',
                        'failed' => 'danger',
                        'pending' => 'warning',
                        'processing' => 'info',
                        default => 'gray',
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
                \Filament\Actions\EditAction::make(),
            ])
            ->toolbarActions([
                \Filament\Actions\Action::make('export_excel')
                    ->label('Export Excel (NEW)')
                    ->icon('heroicon-o-document-chart-bar')
                    ->color('success')
                    ->action(function () {
                        return \Maatwebsite\Excel\Facades\Excel::download(
                            new \App\Exports\OrdersExport, 
                            'laporan_transaksi_' . date('Y-m-d') . '.xlsx'
                        );
                    }),
            ])
            ->bulkActions([
                \Filament\Actions\BulkActionGroup::make([
                    \Filament\Actions\DeleteBulkAction::make(),
                    \Filament\Actions\BulkAction::make('export_selected')
                        ->label('Export Selected')
                        ->icon('heroicon-o-document-chart-bar')
                        ->action(fn (\Illuminate\Support\Collection $records) => \Maatwebsite\Excel\Facades\Excel::download(
                            new \App\Exports\OrdersExport($records), 
                            'laporan_pilihan_' . date('Y-m-d') . '.xlsx'
                        )),
                ]),
            ]);
    }
}
