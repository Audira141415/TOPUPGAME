<?php

namespace App\Console\Commands;

use App\Models\Game;
use App\Models\Product;
use App\Models\Provider;
use App\Services\DigiflazzService;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class SyncDigiflazzProducts extends Command
{
    protected $signature = 'sync:digiflazz';
    protected $description = 'Sync products from Digiflazz API';

    public function handle(DigiflazzService $digiflazz)
    {
        $this->info('Starting Sync with Digiflazz...');

        $provider = Provider::where('name', 'Digiflazz')->first();
        if (!$provider) {
            $this->error('Provider Digiflazz not found in database.');
            return;
        }

        $result = $digiflazz->getPriceList();

        if (!isset($result['data'])) {
            $this->error('Failed to fetch data from Digiflazz: ' . ($result['message'] ?? 'Unknown error'));
            return;
        }

        $count = 0;
        foreach ($result['data'] as $item) {
            // We only care about Game top-ups
            if ($item['category'] !== 'Games') continue;

            // Find or Create Game based on 'brand' (e.g., MOBILE LEGENDS)
            $gameName = ucwords(strtolower($item['brand']));
            $game = Game::where('name', 'LIKE', '%' . $gameName . '%')->first();

            if ($game) {
                // Create or Update Product
                Product::updateOrCreate(
                    [
                        'game_id' => $game->id,
                        'provider_product_id' => $item['buyer_sku_code'],
                    ],
                    [
                        'name' => $item['product_name'],
                        'price_basic' => $item['price'] + 1000, // Example: Add margin of 1000
                        'provider_id' => $provider->id,
                        'is_active' => $item['seller_product_status'] && $item['unlimited_stock'],
                    ]
                );
                $count++;
            }
        }

        $this->info("Successfully synced $count products.");
    }
}
