<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\DigiflazzService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CallbackController extends Controller
{
    public function handleTripay(Request $request)
    {
        $callbackSignature = $request->header('X-Callback-Signature');
        $json = $request->getContent();
        $signature = hash_hmac('sha256', $json, config('services.tripay.private_key'));

        if ($signature !== $callbackSignature) {
            return response()->json(['success' => false, 'message' => 'Invalid signature'], 403);
        }

        $data = json_decode($json);
        $order = Order::where('order_id', $data->merchant_ref)->first();

        if (!$order) {
            return response()->json(['success' => false, 'message' => 'Order not found'], 404);
        }

        if ($data->status === 'PAID') {
            $order->update([
                'status' => 'processing',
                'payment_status' => 'paid'
            ]);

            // AUTOMATION: Top-up to Digiflazz
            $this->processTopup($order);
        }

        return response()->json(['success' => true]);
    }

    protected function processTopup(Order $order)
    {
        $digiflazz = new DigiflazzService();
        $target = $order->target_user_id;
        if ($order->target_server_id) {
            $target .= $order->target_server_id;
        }

        $result = $digiflazz->createTransaction(
            $order->product->provider_product_id,
            $target,
            $order->order_id
        );

        if (isset($result['data']) && ($result['data']['status'] === 'Success' || $result['data']['status'] === 'Pending')) {
            $order->update(['status' => 'success']);
            Log::info("Topup Success for Order " . $order->order_id);
        } else {
            $order->update(['status' => 'failed']);
            Log::error("Topup Failed for Order " . $order->order_id . ": " . ($result['message'] ?? 'Unknown Error'));
        }
    }
}
