<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Purpose: Model for managing Flash Sale promotions.
 * Caller: GameController, Admin Panel.
 * Dependencies: App\Models\Product.
 * Main Functions: product relationship.
 * Side Effects: Accesses flash_sales table.
 */
class FlashSale extends Model
{
    protected $fillable = [
        'product_id',
        'flash_price',
        'stock',
        'sold',
        'start_time',
        'end_time',
        'is_active'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
