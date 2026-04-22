<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id', 'order_id', 'game_id', 'product_id', 
        'target_user_id', 'target_server_id', 'amount', 
        'cost_price', 'profit',
        'fee', 'total_amount', 'payment_method_id', 
        'status', 'payment_status', 'whatsapp_number'
    ];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }
}
