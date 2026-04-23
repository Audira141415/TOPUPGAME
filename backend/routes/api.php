<?php

use App\Http\Controllers\Api\GameController;
use App\Http\Controllers\Api\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/**
 * Purpose: API Route definitions for Audira Zenith Backend.
 * Caller: Used by Frontend Axios (api.ts).
 * Dependencies: Laravel Models (Game, Banner, Setting, Category, FlashSale), Controllers.
 * Main Functions: Auth, Games, Checkout, CMS (Banners, Settings, Categories, FlashSales).
 * Side Effects: Database read/write operations.
 */
Route::post('/register', [\App\Http\Controllers\Api\AuthController::class, 'register']);
Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [\App\Http\Controllers\Api\AuthController::class, 'me']);
    Route::post('/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);
    Route::patch('/profile/update', [\App\Http\Controllers\Api\AuthController::class, 'updateProfile']);
    Route::post('/password/update', [\App\Http\Controllers\Api\AuthController::class, 'updatePassword']);
    Route::post('/profile/avatar', [\App\Http\Controllers\Api\AuthController::class, 'updateAvatar']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::get('/games', [GameController::class, 'index']);
Route::get('/games/{slug}', [GameController::class, 'show']);

Route::post('/checkout', [OrderController::class, 'store']);
Route::get('/orders/{order_id}', [OrderController::class, 'show']);

Route::post('/callback/tripay', [\App\Http\Controllers\Api\CallbackController::class, 'handleTripay']);

// CMS API
Route::get('/banners', function() {
    return \App\Models\Banner::where('is_active', true)->orderBy('order')->get();
});

Route::get('/settings', function() {
    return \App\Models\Setting::all()->pluck('value', 'key');
});

Route::get('/categories', [GameController::class, 'categories']);
Route::get('/flash-sales', [GameController::class, 'flashSales']);
Route::get('/news', [\App\Http\Controllers\NewsController::class, 'index']);
Route::get('/news/{slug}', [\App\Http\Controllers\NewsController::class, 'show']);
