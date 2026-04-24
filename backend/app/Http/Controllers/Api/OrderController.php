<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'game_id' => 'required|exists:games,id',
            'product_id' => 'required|exists:products,id',
            'user_id_game' => 'required|string',
            'server_id_game' => 'nullable|string',
            'payment_method_id' => 'required|exists:payment_methods,id',
            'whatsapp_number' => 'required|string',
        ]);

        $product = Product::findOrFail($request->product_id);
        
        $user = auth('sanctum')->user();
        $amount = $product->getPriceForUser($user);

        // Feature: Zenith Prime Discount (Extra 2% off)
        if ($user && $user->is_prime) {
            $amount = $amount * 0.98;
        }

        $fee = 1000; 
        $total_amount = $amount + $fee;

        $order = Order::create([
            'order_id' => 'TUP-' . strtoupper(Str::random(10)),
            'user_id' => $user?->id,
            'game_id' => $request->game_id,
            'product_id' => $request->product_id,
            'target_user_id' => $request->user_id_game,
            'target_server_id' => $request->server_id_game,
            'amount' => $amount,
            'cost_price' => $product->price_cost ?? 0,
            'profit' => $amount - ($product->price_cost ?? 0),
            'fee' => $fee,
            'total_amount' => $total_amount,
            'payment_method_id' => $request->payment_method_id,
            'whatsapp_number' => $request->whatsapp_number,
            'referral_code' => $request->referral_code, // Tambahkan kolom ini di DB jika belum
            'status' => 'pending',
            'payment_status' => 'unpaid',
        ]);

        // Feature: Affiliate Commission (1% to the referral code owner)
        if ($request->referral_code) {
            $referrer = \App\Models\User::where('affiliate_code', $request->referral_code)->first();
            if ($referrer) {
                $commission = $total_amount * 0.01;
                $referrer->increment('affiliate_balance', $commission);
            }
        }

        // Integrate Tripay
        $tripay = new \App\Services\TripayService();
        $paymentMethod = \App\Models\PaymentMethod::find($request->payment_method_id);
        $tripayResult = $tripay->createTransaction($order, $paymentMethod->code);

        if (isset($tripayResult['success']) && $tripayResult['success']) {
            $order->update([
                'reference' => $tripayResult['data']['reference'],
                'payment_url' => $tripayResult['data']['checkout_url']
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Pesanan berhasil dibuat',
            'data' => $order->load(['game', 'product', 'paymentMethod'])
        ], 201);
    }

    public function userOrders()
    {
        $user = auth('sanctum')->user();
        $orders = Order::where('user_id', $user->id)
            ->with(['game', 'product'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return response()->json($orders);
    }

    public function latest()
    {
        $orders = Order::with(['game', 'product'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return response()->json($orders);
    }

    public function show($order_id)
    {
        $order = Order::where('order_id', $order_id)
            ->with(['game', 'product', 'paymentMethod'])
            ->firstOrFail();

        return response()->json($order);
    }
}
