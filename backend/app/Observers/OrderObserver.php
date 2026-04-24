<?php

namespace App\Observers;

use App\Models\Order;

class OrderObserver
{
    /**
     * Handle the Order "created" event.
     */
    public function created(Order $order): void
    {
        //
    }

    public function updated(Order $order): void
    {
        if ($order->isDirty('status') && $order->status === 'success') {
            $this->sendSuccessNotification($order);
        }

        if ($order->isDirty('payment_status') && $order->payment_status === 'paid') {
            $this->sendPaidNotification($order);
        }
    }

    private function sendSuccessNotification($order)
    {
        $message = "🔥 *TOP UP BERHASIL!* 🔥\n\n"
                 . "Halo Sultan! Pesanan Anda telah sukses diproses.\n\n"
                 . "--------------------------------\n"
                 . "🆔 Order: *{$order->order_id}*\n"
                 . "🎮 Game: *{$order->game->name}*\n"
                 . "💰 Total: *Rp " . number_format($order->total_amount) . "*\n"
                 . "--------------------------------\n\n"
                 . "Terima kasih telah top up di *Audira Zenith*! Level Up Your Gaming!";
        
        \App\Services\WhatsAppService::sendMessage($order->whatsapp_number, $message);
    }

    private function sendPaidNotification($order)
    {
        $message = "✅ *PEMBAYARAN DITERIMA!* ✅\n\n"
                 . "Pesanan *{$order->order_id}* telah dibayar.\n"
                 . "Mohon tunggu sebentar, pesanan Anda sedang kami proses secara kilat! ⚡";
        
        \App\Services\WhatsAppService::sendMessage($order->whatsapp_number, $message);
    }

    /**
     * Handle the Order "deleted" event.
     */
    public function deleted(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "restored" event.
     */
    public function restored(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "force deleted" event.
     */
    public function forceDeleted(Order $order): void
    {
        //
    }
}
