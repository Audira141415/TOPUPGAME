<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Game;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class UltimateGameSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Ensure Categories exist
        $categories = [
            ['name' => 'Mobile Game', 'slug' => 'mobile-game'],
            ['name' => 'PC Game', 'slug' => 'pc-game'],
            ['name' => 'Voucher', 'slug' => 'voucher'],
            ['name' => 'Top Up Apps', 'slug' => 'top-up-apps'],
        ];
        foreach ($categories as $cat) {
            Category::updateOrCreate(['slug' => $cat['slug']], $cat);
        }

        $cats = Category::all()->pluck('id', 'slug');

        // 3. Define the Clean List of Games
        $games = [
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'The Seven Deadly Sins: Grand Cross',
                'slug' => '7ds-grand-cross',
                'description' => 'Top up The Seven Deadly Sins: Grand Cross termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/7ds-grand-cross.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'The Seven Deadly Sins: Origin',
                'slug' => '7ds-origin',
                'description' => 'Top up The Seven Deadly Sins: Origin termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/7ds-origin.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Age of Origins',
                'slug' => 'age-of-origins',
                'description' => 'Top up Age of Origins termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/age-of-origins.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Arknights',
                'slug' => 'arknights',
                'description' => 'Top up Arknights termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/arknights.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Black Clover Mobile',
                'slug' => 'black-clover',
                'description' => 'Top up Black Clover Mobile termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/black-clover.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Blue Archive',
                'slug' => 'blue-archive',
                'description' => 'Top up Blue Archive termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/blue-archive.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Call of Dragons',
                'slug' => 'call-of-dragons',
                'description' => 'Top up Call of Dragons termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/call-of-dragons.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Clash of Clans',
                'slug' => 'clash-of-clans',
                'description' => 'Top up Clash of Clans termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/clash-of-clans.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Clash Royale',
                'slug' => 'clash-royale',
                'description' => 'Top up Clash Royale termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/clash-royale.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'CODM',
                'slug' => 'codm',
                'description' => 'Top up CODM termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/codm.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['pc-game'],
                'name' => 'Counter-Strike 2',
                'slug' => 'cs2',
                'description' => 'Top up Counter-Strike 2 termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/cs2.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Diablo Immortal',
                'slug' => 'diablo-immortal',
                'description' => 'Top up Diablo Immortal termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/diablo-immortal.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['pc-game'],
                'name' => 'Dota 2',
                'slug' => 'dota-2',
                'description' => 'Top up Dota 2 termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/dota-2.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Dragon Nest 2',
                'slug' => 'dragon-nest-2',
                'description' => 'Top up Dragon Nest 2 termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/dragon-nest-2.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Epic Seven',
                'slug' => 'epic-seven',
                'description' => 'Top up Epic Seven termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/epic-seven.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Fate/Grand Order',
                'slug' => 'fate-grand-order',
                'description' => 'Top up Fate/Grand Order termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/fate-grand-order.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Free Fire',
                'slug' => 'free-fire',
                'description' => 'Top up Free Fire termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/free-fire.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Genshin Impact',
                'slug' => 'genshin-impact',
                'description' => 'Top up Genshin Impact termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/genshin-impact.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Harry Potter: Magic Awakened',
                'slug' => 'harry-potter',
                'description' => 'Top up Harry Potter: Magic Awakened termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/harry-potter.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Honkai: Star Rail',
                'slug' => 'honkai-star-rail',
                'description' => 'Top up Honkai: Star Rail termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/honkai-star-rail.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Honor of Kings',
                'slug' => 'honor-of-kings',
                'description' => 'Top up Honor of Kings termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/honor-of-kings.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Last Shelter: Survival',
                'slug' => 'last-shelter-survival',
                'description' => 'Top up Last Shelter: Survival termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/last-shelter-survival.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['pc-game'],
                'name' => 'League of Legends',
                'slug' => 'league-of-legends',
                'description' => 'Top up League of Legends termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/league-of-legends.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Lords Mobile',
                'slug' => 'lords-mobile',
                'description' => 'Top up Lords Mobile termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/lords-mobile.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Mafia City',
                'slug' => 'mafia-city',
                'description' => 'Top up Mafia City termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/mafia-city.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'MIR M',
                'slug' => 'mir-m',
                'description' => 'Top up MIR M termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/mir-m.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],

            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Mobile Legends',
                'slug' => 'mobile-legends',
                'description' => 'Top up Mobile Legends termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/mobile-legends.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Ni no Kuni: Cross Worlds',
                'slug' => 'ni-no-kuni',
                'description' => 'Top up Ni no Kuni: Cross Worlds termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/ni-no-kuni.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Nikke: Goddess of Victory',
                'slug' => 'nikke',
                'description' => 'Top up Nikke: Goddess of Victory termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/nikke-goddess-of-victory.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],

            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Perfect World Mobile',
                'slug' => 'perfect-world-mobile',
                'description' => 'Top up Perfect World Mobile termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/perfect-world-mobile.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['pc-game'],
                'name' => 'Point Blank',
                'slug' => 'point-blank',
                'description' => 'Top up Point Blank termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/point-blank.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'PUBG Mobile',
                'slug' => 'pubg-mobile',
                'description' => 'Top up PUBG Mobile termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/pubg-mobile.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Punishing: Gray Raven',
                'slug' => 'punishing-gray-raven',
                'description' => 'Top up Punishing: Gray Raven termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/punishing-gray-raven.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Puzzles & Survival',
                'slug' => 'puzzles-survival',
                'description' => 'Top up Puzzles & Survival termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/puzzles-survival.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Ragnarok Origin',
                'slug' => 'ragnarok-origin',
                'description' => 'Top up Ragnarok Origin termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/ragnarok-origin.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Ragnarok X: Next Gen',
                'slug' => 'ragnarok-x',
                'description' => 'Top up Ragnarok X: Next Gen termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/ragnarok-x.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Raid: Shadow Legends',
                'slug' => 'raid-shadow-legends',
                'description' => 'Top up Raid: Shadow Legends termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/raid-shadow-legends.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Rise of Kingdoms',
                'slug' => 'rise-of-kingdoms',
                'description' => 'Top up Rise of Kingdoms termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/rise-of-kingdoms.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Roblox',
                'slug' => 'roblox',
                'description' => 'Top up Roblox termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/roblox.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Seal M',
                'slug' => 'seal-m',
                'description' => 'Top up Seal M termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/seal-m.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Seven Knights 2',
                'slug' => 'seven-knights-2',
                'description' => 'Top up Seven Knights 2 termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/seven-knights-2.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Seven Knights Idle Adventure',
                'slug' => 'seven-knights-idle',
                'description' => 'Top up Seven Knights Idle Adventure termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/seven-knights-idle.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Solo Leveling: Arise',
                'slug' => 'solo-leveling',
                'description' => 'Top up Solo Leveling: Arise termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/solo-leveling.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'State of Survival',
                'slug' => 'state-of-survival',
                'description' => 'Top up State of Survival termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/state-of-survival.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Steam Wallet',
                'slug' => 'steam-wallet',
                'description' => 'Top up Steam Wallet termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/steam-wallet.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Summoners War: Chronicles',
                'slug' => 'summoners-war-chronicles',
                'description' => 'Top up Summoners War: Chronicles termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/summoners-war-chronicles.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Summoners War: Sky Arena',
                'slug' => 'summoners-war-sky-arena',
                'description' => 'Top up Summoners War: Sky Arena termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/summoners-war-sky-arena.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],

            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Tower of Fantasy',
                'slug' => 'tower-of-fantasy',
                'description' => 'Top up Tower of Fantasy termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/tower-of-fantasy.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Undawn',
                'slug' => 'undawn',
                'description' => 'Top up Undawn termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/undawn.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Valorant',
                'slug' => 'valorant',
                'description' => 'Top up Valorant termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/valorant.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],

            [
                'category_id' => $cats['mobile-game'],
                'name' => 'War and Order',
                'slug' => 'war-and-order',
                'description' => 'Top up War and Order termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/war-and-order.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Wuthering Waves',
                'slug' => 'wuthering-waves',
                'description' => 'Top up Wuthering Waves termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/wuthering-waves.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
            [
                'category_id' => $cats['mobile-game'],
                'name' => 'Zenless Zone Zero',
                'slug' => 'zenless-zone-zero',
                'description' => 'Top up Zenless Zone Zero termurah dan tercepat hanya di Audira Zenith.',
                'image' => 'games/zenless-zone-zero.png',
                'is_active' => true,
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ],
        ];

        foreach ($games as $gameData) {
            $game = Game::updateOrCreate(['slug' => $gameData['slug']], $gameData);

            // Add sample products
            $products = [
                ['name' => 'Starter Pack', 'price_basic' => 15000, 'price_gold' => 14000, 'price_platinum' => 13500, 'price_cost' => 12000, 'sku' => strtoupper($game->slug) . '-STARTER'],
                ['name' => 'Medium Pack', 'price_basic' => 50000, 'price_gold' => 48000, 'price_platinum' => 45000, 'price_cost' => 40000, 'sku' => strtoupper($game->slug) . '-MEDIUM'],
                ['name' => 'Premium Pack', 'price_basic' => 100000, 'price_gold' => 95000, 'price_platinum' => 90000, 'price_cost' => 80000, 'sku' => strtoupper($game->slug) . '-PREMIUM'],
            ];

            foreach ($products as $p) {
                Product::updateOrCreate(
                    ['game_id' => $game->id, 'sku' => $p['sku']],
                    array_merge($p, [
                        'stock' => 999,
                        'is_active' => true,
                        'provider_product_id' => $p['sku']
                    ])
                );
            }
        }
    }
}
