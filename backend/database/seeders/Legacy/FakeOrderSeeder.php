<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Game;
use App\Models\Product;
use App\Models\PaymentMethod;
use App\Models\User;
use Carbon\Carbon;

class FakeOrderSeeder extends Seeder
{
    public function run(): void
    {
        $games = Game::all();
        $products = Product::all();
        $paymentMethods = PaymentMethod::all();
        $users = User::all();

        if ($users->isEmpty()) {
            User::create([
                'name' => 'Admin Audira',
                'email' => 'admin@audira.com',
                'password' => bcrypt('password'),
                'role' => 'admin'
            ]);
            User::create([
                'name' => 'Demo User',
                'email' => 'user@example.com',
                'password' => bcrypt('password'),
                'role' => 'user'
            ]);
            $users = User::all();
        }

        if ($games->isEmpty() || $products->isEmpty() || $paymentMethods->isEmpty()) {
            return;
        }

        // Create 100 fake orders over the last 6 months
        for ($i = 0; $i < 100; $i++) {
            $game = $games->random();
            $productPool = $products->where('game_id', $game->id);
            $product = $productPool->isEmpty() ? $products->random() : $productPool->random();
            $user = $users->random();
            $paymentMethod = $paymentMethods->random();
            
            $createdAt = Carbon::now()->subDays(rand(0, 180));
            $totalAmount = $product->price_basic;
            $profit = $totalAmount - $product->price_cost;

            Order::create([
                'user_id' => $user->id,
                'order_id' => 'ORD-' . strtoupper(bin2hex(random_bytes(4))),
                'game_id' => $game->id,
                'product_id' => $product->id,
                'target_user_id' => 'USER-' . rand(1000, 9999),
                'target_server_id' => rand(100, 999),
                'amount' => 1,
                'cost_price' => $product->price_cost,
                'profit' => $profit,
                'fee' => rand(500, 2500),
                'total_amount' => $totalAmount,
                'payment_method_id' => $paymentMethod->id,
                'status' => 'success',
                'payment_status' => 'paid',
                'whatsapp_number' => '08' . rand(100000000, 999999999),
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);
        }
    }
}
