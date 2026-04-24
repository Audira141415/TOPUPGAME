<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promo extends Model
{
    protected $fillable = [
        'code',
        'discount_amount',
        'discount_percent',
        'max_discount',
        'valid_until',
        'quota',
        'is_active'
    ];
}
