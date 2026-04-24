<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class LeaderboardController extends Controller
{
    public function index()
    {
        // Get top 10 spenders (only successful orders)
        $topSpenders = Order::select('user_id', DB::raw('SUM(total_amount) as total_spent'))
            ->where('status', 'success')
            ->whereNotNull('user_id')
            ->groupBy('user_id')
            ->with(['user' => function($query) {
                $query->select('id', 'name', 'is_prime');
            }])
            ->orderBy('total_spent', 'desc')
            ->limit(10)
            ->get();

        return response()->json($topSpenders);
    }

    public function primeStatus()
    {
        $user = auth('sanctum')->user();
        if (!$user) return response()->json(['error' => 'Unauthorized'], 401);

        return response()->json([
            'is_prime' => (bool)$user->is_prime,
            'prime_until' => $user->prime_until ?? null,
            'benefits' => [
                'Extra 2% Discount on all products',
                'Exclusive VIP Mystery Boxes',
                'Priority 24/7 VIP Support',
                'Prime Badge in Dashboard'
            ]
        ]);
    }
}
