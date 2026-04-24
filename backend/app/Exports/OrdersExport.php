<?php

namespace App\Exports;

use App\Models\Order;
use Maatwebsite\Excel\Concerns\FromCollection;

use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class OrdersExport implements FromCollection, WithHeadings, WithMapping
{
    protected $records;

    public function __construct($records = null)
    {
        $this->records = $records;
    }

    public function collection()
    {
        return $this->records ?: Order::with(['game', 'product'])->get();
    }

    public function headings(): array
    {
        return [
            'ID Pesanan',
            'Game',
            'Produk',
            'Target ID',
            'Server',
            'Total',
            'Profit',
            'Status Bayar',
            'Status Proses',
            'Waktu',
        ];
    }

    public function map($order): array
    {
        return [
            $order->order_id,
            $order->game?->name,
            $order->product?->name,
            $order->target_user_id,
            $order->target_server_id,
            $order->total_amount,
            $order->profit,
            $order->payment_status,
            $order->status,
            $order->created_at,
        ];
    }
}
