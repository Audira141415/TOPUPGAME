<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use App\Models\SupportTicket;
use Filament\Widgets\Widget;

class SystemActivityWidget extends Widget
{
    protected static ?int $sort = 5;
    protected int | string | array $columnSpan = '1';
    protected string $view = 'filament.widgets.system-activity-widget';

    public function getActivities(): array
    {
        $orders = Order::latest()->limit(3)->get()->map(function ($order) {
            return [
                'title' => "Top up #{$order->order_id} " . ($order->payment_status === 'paid' ? 'berhasil' : 'masuk'),
                'description' => "User: {$order->target_user_id} - " . ($order->game->name ?? 'Game'),
                'time' => $order->created_at->diffForHumans(),
                'type' => $order->payment_status === 'paid' ? 'success' : 'warning',
                'icon' => $order->payment_status === 'paid' ? 'heroicon-m-check-circle' : 'heroicon-m-clock',
            ];
        });

        $tickets = SupportTicket::latest()->limit(2)->get()->map(function ($ticket) {
            return [
                'title' => "Tiket Baru: {$ticket->subject}",
                'description' => "Dari: {$ticket->name}",
                'time' => $ticket->created_at->diffForHumans(),
                'type' => 'info',
                'icon' => 'heroicon-m-chat-bubble-left',
            ];
        });

        return $orders->concat($tickets)->sortByDesc(function ($item) {
            return $item['time'];
        })->values()->toArray();
    }
}
