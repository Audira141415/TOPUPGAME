<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\Request;

/**
 * Purpose: Controller for managing Game and Category API requests.
 * Caller: api.php routes (/games, /categories).
 * Dependencies: App\Models\Game, App\Models\Category.
 * Main Functions: index (all games), show (single game), categories (all categories).
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
}
