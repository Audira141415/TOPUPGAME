<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = [
        'category_id', 'name', 'slug', 'description', 
        'image', 'banner', 'is_active', 'is_popular', 'validation_config'
    ];

    protected $casts = [
        'validation_config' => 'array',
        'is_active' => 'boolean',
        'is_popular' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
