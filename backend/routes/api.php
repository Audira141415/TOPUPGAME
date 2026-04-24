<?php

use App\Http\Controllers\Api\GameController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\LeaderboardController;
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
Route::post('/auth/otp/send', [\App\Http\Controllers\Api\AuthController::class, 'sendOtp']);
Route::post('/auth/otp/verify', [\App\Http\Controllers\Api\AuthController::class, 'verifyOtp']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [\App\Http\Controllers\Api\AuthController::class, 'me']);
    Route::get('/me/orders', [OrderController::class, 'userOrders']);
    Route::post('/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);
    Route::patch('/profile/update', [\App\Http\Controllers\Api\AuthController::class, 'updateProfile']);
    Route::post('/password/update', [\App\Http\Controllers\Api\AuthController::class, 'updatePassword']);
    Route::post('/profile/avatar', [\App\Http\Controllers\Api\AuthController::class, 'updateAvatar']);
    Route::get('/prime/status', [LeaderboardController::class, 'primeStatus']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::get('/games', [GameController::class, 'index']);
Route::get('/games/{slug}', [GameController::class, 'show']);
Route::get('/leaderboard', [LeaderboardController::class, 'index']);
Route::get('/orders/latest', [OrderController::class, 'latest']);
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
Route::get('/upcoming-flash-sales', [GameController::class, 'upcomingFlashSales']);
Route::get('/vouchers', [GameController::class, 'vouchers']);
Route::get('/news', [\App\Http\Controllers\NewsController::class, 'index']);
Route::get('/news/{slug}', [\App\Http\Controllers\NewsController::class, 'show']);

// Admin Dashboard Stats
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/stats/overview', [DashboardController::class, 'overview']);
    Route::get('/stats/charts', [DashboardController::class, 'chartData']);
    Route::get('/stats/top-products', [DashboardController::class, 'topProducts']);

    // Management
    Route::get('/users', [\App\Http\Controllers\Api\AdminManagementController::class, 'usersIndex']);
    Route::patch('/users/{user}', [\App\Http\Controllers\Api\AdminManagementController::class, 'updateUser']);
    Route::delete('/users/{user}', [\App\Http\Controllers\Api\AdminManagementController::class, 'deleteUser']);

    Route::get('/orders', [\App\Http\Controllers\Api\AdminManagementController::class, 'ordersIndex']);
    Route::patch('/orders/{order}/status', [\App\Http\Controllers\Api\AdminManagementController::class, 'updateOrderStatus']);

    Route::get('/games', [\App\Http\Controllers\Api\AdminManagementController::class, 'gamesIndex']);
    Route::post('/games', [\App\Http\Controllers\Api\AdminManagementController::class, 'storeGame']);
    Route::patch('/games/{game}', [\App\Http\Controllers\Api\AdminManagementController::class, 'updateGame']);
    Route::delete('/games/{game}', [\App\Http\Controllers\Api\AdminManagementController::class, 'deleteGame']);

    Route::get('/games/{gameId}/products', [\App\Http\Controllers\Api\AdminManagementController::class, 'productsIndex']);
    Route::post('/products', [\App\Http\Controllers\Api\AdminManagementController::class, 'storeProduct']);
    Route::patch('/products/{product}', [\App\Http\Controllers\Api\AdminManagementController::class, 'updateProduct']);
    Route::delete('/products/{product}', [\App\Http\Controllers\Api\AdminManagementController::class, 'deleteProduct']);
});
