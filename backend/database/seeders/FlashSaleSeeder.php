<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\FlashSale;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class FlashSaleSeeder extends Seeder
{
    public function run(): void
    {
        // Bersihkan data flash sale lama agar tidak berantakan
        FlashSale::truncate();

        // Ambil produk yang ada
        $products = Product::all();

        if ($products->count() > 0) {
            // Ambil maksimal 12 produk untuk dijadikan flash sale
            $selectedProducts = $products->shuffle()->take(12);

            foreach ($selectedProducts as $product) {
                // Berikan diskon 20% - 40%
                $discount = rand(20, 40) / 100;
                $flashPrice = $product->price_basic * (1 - $discount);

                FlashSale::create([
                    'product_id' => $product->id,
                    'flash_price' => round($flashPrice),
                    'start_time' => Carbon::now(),
                    'end_time' => Carbon::now()->addDays(2), // Aktif selama 2 hari
                    'is_active' => true,
                ]);
            }
        }
    }
}
