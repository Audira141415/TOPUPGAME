<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class TripayService
{
    protected $apiKey;
    protected $privateKey;
    protected $merchantCode;
    protected $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.tripay.api_key');
        $this->privateKey = config('services.tripay.private_key');
        $this->merchantCode = config('services.tripay.merchant_code');
        $this->baseUrl = config('services.tripay.mode') === 'live' 
            ? 'https://tripay.co.id/api/' 
            : 'https://tripay.co.id/api-sandbox/';
    }

    public function getPaymentChannels()
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
        ])->get($this->baseUrl . 'merchant/payment-channel');

        return $response->json();
    }

    public function createTransaction($order, $method)
    {
        $signature = hash_hmac('sha256', $this->merchantCode . $order->order_id . $order->total_amount, $this->privateKey);

        $data = [
            'method'         => $method,
            'merchant_ref'   => $order->order_id,
            'amount'         => $order->total_amount,
            'customer_name'  => 'Customer ' . $order->whatsapp_number,
            'customer_email' => 'customer@topupgame.com',
            'customer_phone' => $order->whatsapp_number,
            'order_items'    => [
                [
                    'sku'      => $order->product->provider_product_id ?? 'TOPUP',
                    'name'     => $order->game->name . ' - ' . $order->product->name,
                    'price'    => $order->total_amount,
                    'quantity' => 1,
                ]
            ],
            'return_url'   => url('/order-status/' . $order->order_id),
            'callback_url' => url('/api/callback/tripay'),
            'expired_time' => (time() + (24 * 60 * 60)), // 24 hours
            'signature'    => $signature,
        ];

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
        ])->post($this->baseUrl . 'transaction/create', $data);

        return $response->json();
    }
}
