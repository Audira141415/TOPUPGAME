<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\Request;

/**
 * Purpose: Controller for managing Game, Category, and Flash Sale API requests.
 * Caller: api.php routes (/games, /categories, /flash-sales).
 * Dependencies: App\Models\Game, App\Models\Category, App\Models\FlashSale.
 * Main Functions: index, show, categories, flashSales.
 * Side Effects: Database read operations.
 */
class GameController extends Controller
{
    public function index()
    {
        return Game::where('is_active', true)->with('category')->get();
    }

    public function show($slug)
    {
        return Game::where('slug', $slug)
            ->where('is_active', true)
            ->with(['category', 'products' => function($query) {
                $query->where('is_active', true);
            }])
            ->firstOrFail();
    }

    public function categories()
    {
        return \App\Models\Category::all();
    }

    public function flashSales()
    {
        return \App\Models\FlashSale::where('is_active', true)
            ->where('end_time', '>', now())
            ->with(['product.game'])
            ->get();
    }
}
