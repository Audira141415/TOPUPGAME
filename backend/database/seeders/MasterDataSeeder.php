<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Game;
use App\Models\Product;

class MasterDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Categories
        $mobile = Category::updateOrCreate(['slug' => 'mobile-game'], ['name' => 'Mobile Game']);
        $pc = Category::updateOrCreate(['slug' => 'pc-game'], ['name' => 'PC Game']);

        // 2. Games Data
        $games = [
            [
                'category_id' => $mobile->id,
                'name' => 'Mobile Legends',
                'slug' => 'mobile-legends',
                'image' => 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Mobile_Legends_Logo.png/250px-Mobile_Legends_Logo.png',
                'products' => [
                    ['name' => '86 Diamonds', 'price_basic' => 20000, 'price_gold' => 19500, 'price_platinum' => 19000, 'price_cost' => 18000, 'sku' => 'MLBB-86'],
                    ['name' => '172 Diamonds', 'price_basic' => 40000, 'price_gold' => 39000, 'price_platinum' => 38000, 'price_cost' => 36000, 'sku' => 'MLBB-172'],
                    ['name' => 'Weekly Diamond Pass', 'price_basic' => 30000, 'price_gold' => 28000, 'price_platinum' => 27000, 'price_cost' => 25000, 'sku' => 'MLBB-WDP'],
                ]
            ],
            [
                'category_id' => $mobile->id,
                'name' => 'Free Fire',
                'slug' => 'free-fire',
                'image' => 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Free_Fire_Logo.png/250px-Free_Fire_Logo.png',
                'products' => [
                    ['name' => '70 Diamonds', 'price_basic' => 10000, 'price_gold' => 9500, 'price_platinum' => 9000, 'price_cost' => 8000, 'sku' => 'FF-70'],
                    ['name' => '140 Diamonds', 'price_basic' => 20000, 'price_gold' => 19000, 'price_platinum' => 18000, 'price_cost' => 16000, 'sku' => 'FF-140'],
                ]
            ],
            [
                'category_id' => $pc->id,
                'name' => 'Valorant',
                'slug' => 'valorant',
                'image' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/250px-Valorant_logo_-_pink_color_version.svg.png',
                'products' => [
                    ['name' => '625 Points', 'price_basic' => 65000, 'price_gold' => 63000, 'price_platinum' => 61000, 'price_cost' => 58000, 'sku' => 'VAL-625'],
                    ['name' => '1125 Points', 'price_basic' => 115000, 'price_gold' => 112000, 'price_platinum' => 109000, 'price_cost' => 105000, 'sku' => 'VAL-1125'],
                ]
            ],
            [
                'category_id' => $mobile->id,
                'name' => 'Roblox',
                'slug' => 'roblox',
                'image' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Roblox_player_icon_black.svg/250px-Roblox_player_icon_black.svg.png',
                'products' => [
                    ['name' => '400 Robux', 'price_basic' => 75000, 'price_gold' => 72000, 'price_platinum' => 70000, 'price_cost' => 65000, 'sku' => 'RBX-400'],
                    ['name' => '800 Robux', 'price_basic' => 150000, 'price_gold' => 145000, 'price_platinum' => 140000, 'price_cost' => 130000, 'sku' => 'RBX-800'],
                ]
            ],
            [
                'category_id' => $mobile->id,
                'name' => 'CODM',
                'slug' => 'codm',
                'image' => 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Call_of_Duty_Mobile_logo.png/250px-Call_of_Duty_Mobile_logo.png',
                'products' => [
                    ['name' => '31 CP', 'price_basic' => 5000, 'price_gold' => 4800, 'price_platinum' => 4500, 'price_cost' => 4000, 'sku' => 'CODM-31'],
                    ['name' => '128 CP', 'price_basic' => 20000, 'price_gold' => 19000, 'price_platinum' => 18000, 'price_cost' => 16000, 'sku' => 'CODM-128'],
                ]
            ],
            [
                'category_id' => $pc->id,
                'name' => 'Steam Wallet',
                'slug' => 'steam-wallet',
                'image' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/250px-Steam_icon_logo.svg.png',
                'products' => [
                    ['name' => 'IDR 12.000', 'price_basic' => 15000, 'price_gold' => 14000, 'price_platinum' => 13500, 'price_cost' => 12500, 'sku' => 'STEAM-12'],
                    ['name' => 'IDR 45.000', 'price_basic' => 55000, 'price_gold' => 53000, 'price_platinum' => 50000, 'price_cost' => 47000, 'sku' => 'STEAM-45'],
                ]
            ]
        ];

        // 3. Loop and Insert
        foreach ($games as $gameData) {
            $game = Game::updateOrCreate(
                ['slug' => $gameData['slug']],
                [
                    'category_id' => $gameData['category_id'],
                    'name' => $gameData['name'],
                    'image' => $gameData['image']
                ]
            );

            foreach ($gameData['products'] as $productData) {
                Product::updateOrCreate(
                    ['sku' => $productData['sku']],
                    array_merge($productData, [
                        'game_id' => $game->id,
                        'stock' => 999,
                        'is_active' => true,
                        'provider_product_id' => $productData['sku']
                    ])
                );
            }
        }
    }
}
