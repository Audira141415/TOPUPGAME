<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'game_id', 'name', 'price_basic', 'price_gold', 
        'price_platinum', 'price_cost', 'provider_product_id', 'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'price_basic' => 'decimal:2',
        'price_gold' => 'decimal:2',
        'price_platinum' => 'decimal:2',
        'price_cost' => 'decimal:2',
    ];

    public function getPriceForUser(?User $user)
    {
        if (!$user) return $this->price_basic;

        return match ($user->role) {
            'gold' => $this->price_gold ?? $this->price_basic,
            'platinum' => $this->price_platinum ?? $this->price_basic,
            default => $this->price_basic,
        };
    }

    public function game()
    {
        return $this->belongsTo(Game::class);
    }
}
