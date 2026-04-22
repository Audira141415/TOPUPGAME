<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\Request;

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
}
