<?php

namespace App\Services;

use App\Models\Provider;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DigiflazzService
{
    protected $baseUrl;
    protected $username;
    protected $apiKey;

    public function __construct()
    {
        $provider = Provider::where('name', 'Digiflazz')->where('is_active', true)->first();
        
        if ($provider) {
            $this->baseUrl = $provider->api_url ?? 'https://api.digiflazz.com/v1';
            $this->username = $provider->api_username;
            $this->apiKey = $provider->api_key;
        }
    }

    /**
     * Get balance from Digiflazz
     */
    public function getBalance()
    {
        $sign = md5($this->username . $this->apiKey . 'depo');
        
        $response = Http::post($this->baseUrl . '/cek-saldo', [
            'username' => $this->username,
            'sign' => $sign
        ]);

        return $response->json();
    }

    /**
     * Fetch all products from Digiflazz
     */
    public function getPriceList()
    {
        $sign = md5($this->username . $this->apiKey . 'pricelist');

        $response = Http::post($this->baseUrl . '/price-list', [
            'username' => $this->username,
            'sign' => $sign,
            'cmd' => 'prepaid' // We focus on prepaid for game top-ups
        ]);

        return $response->json();
    }

    /**
     * Create a transaction
     */
    public function createTransaction($sku, $customerNo, $refId)
    {
        $sign = md5($this->username . $this->apiKey . $refId);

        $response = Http::post($this->baseUrl . '/transaction', [
            'username' => $this->username,
            'buyer_sku_code' => $sku,
            'customer_no' => $customerNo,
            'ref_id' => $refId,
            'sign' => $sign
        ]);

        return $response->json();
    }
}
