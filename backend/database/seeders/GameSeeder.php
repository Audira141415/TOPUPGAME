<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Game;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class GameSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Categories
        $categories = [
            ['name' => 'Mobile Game', 'slug' => 'mobile-game'],
            ['name' => 'PC Game', 'slug' => 'pc-game'],
            ['name' => 'Voucher', 'slug' => 'voucher'],
            ['name' => 'Top Up Apps', 'slug' => 'top-up-apps'],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['slug' => $cat['slug']], $cat);
        }

        $mobileCat = Category::where('slug', 'mobile-game')->first();
        $pcCat = Category::where('slug', 'pc-game')->first();
        $voucherCat = Category::where('slug', 'voucher')->first();

        // 2. Create Games
        $games = [
            // Mobile Games
            [
                'category_id' => $mobileCat->id,
                'name' => 'Mobile Legends',
                'slug' => 'mobile-legends',
                'description' => 'Top up Diamond Mobile Legends termurah dan tercepat.',
                'image' => 'games/mlbb.png',
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'number', 'placeholder' => '12345678'],
                        ['name' => 'Zone ID', 'key' => 'zone_id', 'type' => 'number', 'placeholder' => '1234'],
                    ]
                ],
            ],
            [
                'category_id' => $mobileCat->id,
                'name' => 'Free Fire',
                'slug' => 'free-fire',
                'description' => 'Top up Diamond Free Fire termurah dan tercepat.',
                'image' => 'games/ff.png',
                'validation_config' => [
                    'fields' => [
                        ['name' => 'Player ID', 'key' => 'user_id', 'type' => 'number', 'placeholder' => '123456789'],
                    ]
                ],
            ],
            [
                'category_id' => $mobileCat->id,
                'name' => 'PUBG Mobile',
                'slug' => 'pubg-mobile',
                'description' => 'Top up UC PUBG Mobile termurah.',
                'image' => 'games/pubg.png',
                'validation_config' => [
                    'fields' => [
                        ['name' => 'Character ID', 'key' => 'user_id', 'type' => 'number', 'placeholder' => '512345678'],
                    ]
                ],
            ],
            [
                'category_id' => $mobileCat->id,
                'name' => 'Genshin Impact',
                'slug' => 'genshin-impact',
                'description' => 'Top up Genesis Crystal Genshin Impact.',
                'image' => 'games/genshin.png',
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID (UID)', 'key' => 'user_id', 'type' => 'number', 'placeholder' => '801234567'],
                        ['name' => 'Server', 'key' => 'zone_id', 'type' => 'select', 'options' => [
                            ['label' => 'Asia', 'value' => 'os_asia'],
                            ['label' => 'America', 'value' => 'os_usa'],
                            ['label' => 'Europe', 'value' => 'os_euro'],
                            ['label' => 'TW_HK_MO', 'value' => 'os_cht'],
                        ]],
                    ]
                ],
            ],
            [
                'category_id' => $mobileCat->id,
                'name' => 'Honor of Kings',
                'slug' => 'honor-of-kings',
                'description' => 'Top up Token Honor of Kings.',
                'image' => 'games/hok.png',
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'number', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            // PC Games
            [
                'category_id' => $pcCat->id,
                'name' => 'Valorant',
                'slug' => 'valorant',
                'description' => 'Top up Valorant Points.',
                'image' => 'games/valorant.png',
                'validation_config' => [
                    'fields' => [
                        ['name' => 'Riot ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => 'Username#TAG'],
                    ]
                ],
            ],
            // Vouchers
            [
                'category_id' => $voucherCat->id,
                'name' => 'Roblox',
                'slug' => 'roblox',
                'description' => 'Top up Robux Roblox.',
                'image' => 'games/roblox.png',
                'validation_config' => [
                    'fields' => [
                        ['name' => 'Roblox ID / Username', 'key' => 'user_id', 'type' => 'text', 'placeholder' => 'Username'],
                    ]
                ],
            ],
        ];

        foreach ($games as $gameData) {
            $game = Game::updateOrCreate(['slug' => $gameData['slug']], $gameData);

            // 3. Sample Products for MLBB and FF
            if ($game->slug === 'mobile-legends') {
                $mlProducts = [
                    ['name' => '5 Diamonds', 'price_basic' => 1500, 'price_gold' => 1400, 'price_platinum' => 1350],
                    ['name' => '12 Diamonds', 'price_basic' => 3500, 'price_gold' => 3300, 'price_platinum' => 3200],
                    ['name' => '28 Diamonds', 'price_basic' => 8000, 'price_gold' => 7800, 'price_platinum' => 7600],
                    ['name' => '59 Diamonds', 'price_basic' => 16000, 'price_gold' => 15500, 'price_platinum' => 15000],
                    ['name' => '85 Diamonds', 'price_basic' => 23000, 'price_gold' => 22000, 'price_platinum' => 21000],
                    ['name' => '170 Diamonds', 'price_basic' => 45000, 'price_gold' => 43000, 'price_platinum' => 41000],
                    ['name' => 'Weekly Diamond Pass', 'price_basic' => 28000, 'price_gold' => 27000, 'price_platinum' => 26000],
                ];
                foreach ($mlProducts as $p) {
                    Product::updateOrCreate(
                        ['game_id' => $game->id, 'name' => $p['name']],
                        $p
                    );
                }
            }

            if ($game->slug === 'free-fire') {
                $ffProducts = [
                    ['name' => '5 Diamonds', 'price_basic' => 1000, 'price_gold' => 900, 'price_platinum' => 850],
                    ['name' => '12 Diamonds', 'price_basic' => 2000, 'price_gold' => 1900, 'price_platinum' => 1800],
                    ['name' => '50 Diamonds', 'price_basic' => 7000, 'price_gold' => 6800, 'price_platinum' => 6500],
                    ['name' => '70 Diamonds', 'price_basic' => 9500, 'price_gold' => 9000, 'price_platinum' => 8700],
                    ['name' => '140 Diamonds', 'price_basic' => 19000, 'price_gold' => 18000, 'price_platinum' => 17500],
                ];
                foreach ($ffProducts as $p) {
                    Product::updateOrCreate(
                        ['game_id' => $game->id, 'name' => $p['name']],
                        $p
                    );
                }
            }
        }
    }
}
