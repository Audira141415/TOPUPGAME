<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function overview()
    {
        // Total Sales (Revenue)
        $totalRevenue = Order::where('payment_status', 'paid')->sum('total_amount');
        
        // Total Profit
        $totalProfit = Order::where('payment_status', 'paid')->sum('profit');
        
        // Total Orders
        $totalOrders = Order::count();
        
        // Successful Orders
        $successOrders = Order::where('status', 'completed')->count();
        
        // Pending Orders
        $pendingOrders = Order::where('status', 'pending')->count();
        
        // Total Users
        $totalUsers = User::count();

        return response()->json([
            'success' => true,
            'data' => [
                'total_revenue' => $totalRevenue,
                'total_profit' => $totalProfit,
                'total_orders' => $totalOrders,
                'success_orders' => $successOrders,
                'pending_orders' => $pendingOrders,
                'total_users' => $totalUsers,
                'revenue_formatted' => 'Rp ' . number_format($totalRevenue, 0, ',', '.'),
                'profit_formatted' => 'Rp ' . number_format($totalProfit, 0, ',', '.'),
            ]
        ]);
    }

    public function chartData()
    {
        // Daily revenue for the last 7 days
        $revenueData = Order::where('payment_status', 'paid')
            ->where('created_at', '>=', now()->subDays(7))
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(total_amount) as revenue'),
                DB::raw('SUM(profit) as profit')
            )
            ->groupBy('date')
            ->orderBy('date', 'ASC')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $revenueData
        ]);
    }

    public function topProducts()
    {
        $topGames = Order::where('payment_status', 'paid')
            ->select('game_id', DB::raw('count(*) as total_orders'), DB::raw('sum(total_amount) as total_revenue'))
            ->with('game:id,name')
            ->groupBy('game_id')
            ->orderBy('total_orders', 'DESC')
            ->limit(5)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $topGames
        ]);
    }

    public function getStats()
    {
        $user = auth('sanctum')->user();
        if (!$user) return response()->json(['error' => 'Unauthorized'], 401);
        
        return response()->json([
            'balance' => $user->balance,
            'affiliate_balance' => $user->affiliate_balance,
            'total_orders' => $user->orders()->count(),
            'is_prime' => (bool)$user->is_prime
        ]);
    }

    public function processGachaWin(Request $request)
    {
        $user = auth('sanctum')->user();
        if (!$user) return response()->json(['error' => 'Unauthorized'], 401);

        $request->validate([
            'box_type' => 'required|string',
            'reward_name' => 'required|string',
            'reward_value' => 'nullable|numeric',
            'cost' => 'required|numeric'
        ]);

        if ($user->balance < $request->cost) {
            return response()->json(['error' => 'Saldo tidak cukup'], 400);
        }

        DB::beginTransaction();
        try {
            $user->decrement('balance', $request->cost);

            if ($request->reward_value > 0) {
                $user->increment('balance', $request->reward_value);
            }

            DB::table('gacha_logs')->insert([
                'user_id' => $user->id,
                'box_type' => $request->box_type,
                'reward_name' => $request->reward_name,
                'reward_value' => $request->reward_value ?? 0,
                'created_at' => now()
            ]);

            DB::commit();
            
            // Refresh user to get new balance
            $user->refresh();

            return response()->json([
                'success' => true,
                'new_balance' => $user->balance,
                'message' => 'Hadiah berhasil diproses!'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Gagal memproses hadiah: ' . $e->getMessage()], 500);
        }
    }
}
