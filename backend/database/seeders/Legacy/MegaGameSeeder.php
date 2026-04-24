<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Game;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class MegaGameSeeder extends Seeder
{
    public function run(): void
    {
        $mobileCat = Category::where('slug', 'mobile-game')->first();
        if (!$mobileCat) return;

        $games = [
            ['name' => 'Seal M', 'slug' => 'seal-m', 'image' => 'games/cover_1.png'],
            ['name' => 'Ragnarok X: Next Gen', 'slug' => 'ragnarok-x', 'image' => 'games/cover_magic.png'],
            ['name' => 'MIR M', 'slug' => 'mir-m', 'image' => 'games/cover_3.png'],
            ['name' => 'Tower of Fantasy', 'slug' => 'tower-of-fantasy', 'image' => 'games/cover_mecha.png'],
            ['name' => 'Blue Archive', 'slug' => 'blue-archive', 'image' => 'games/cover_gacha.png'],
            ['name' => 'Nikke: Goddess of Victory', 'slug' => 'nikke', 'image' => 'games/cover_mecha.png'],
            ['name' => 'Honkai: Star Rail', 'slug' => 'honkai-star-rail', 'image' => 'games/cover_magic.png'],
            ['name' => 'Zenless Zone Zero', 'slug' => 'zenless-zone-zero', 'image' => 'games/cover_2.png'],
            ['name' => 'Solo Leveling: Arise', 'slug' => 'solo-leveling', 'image' => 'games/cover_3.png'],
            ['name' => 'Arknights', 'slug' => 'arknights', 'image' => 'games/cover_tactical.png'],
            ['name' => 'Fate/Grand Order', 'slug' => 'fate-grand-order', 'image' => 'games/cover_magic.png'],
            ['name' => 'Black Clover Mobile', 'slug' => 'black-clover', 'image' => 'games/cover_magic.png'],
            ['name' => 'Undawn', 'slug' => 'undawn', 'image' => 'games/cover_tactical.png'],
            ['name' => 'Diablo Immortal', 'slug' => 'diablo-immortal', 'image' => 'games/cover_3.png'],
            ['name' => 'Call of Duty: Mobile', 'slug' => 'codm', 'image' => 'games/cover_tactical.png'],
            ['name' => 'Dragon Nest 2', 'slug' => 'dragon-nest-2', 'image' => 'games/cover_1.png'],
            ['name' => 'Ragnarok Origin', 'slug' => 'ragnarok-origin', 'image' => 'games/cover_magic.png'],
            ['name' => 'Harry Potter: Magic Awakened', 'slug' => 'harry-potter', 'image' => 'games/cover_magic.png'],
            ['name' => 'Summoners War: Chronicles', 'slug' => 'summoners-war-chronicles', 'image' => 'games/cover_magic.png'],
            ['name' => 'Ni no Kuni: Cross Worlds', 'slug' => 'ni-no-kuni', 'image' => 'games/cover_1.png'],
        ];

        foreach ($games as $g) {
            $game = Game::updateOrCreate(['slug' => $g['slug']], [
                'category_id' => $mobileCat->id,
                'name' => $g['name'],
                'description' => "Layanan top up {$g['name']} paling murah dan aman di Audira Zenith.",
                'image' => "games/{$g['slug']}.png",
                'validation_config' => [
                    'fields' => [
                        ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                    ]
                ],
            ]);

            // Add sample products for each game
            $products = [
                ['name' => 'Starter Pack', 'price_basic' => 15000, 'price_gold' => 14000, 'price_platinum' => 13500],
                ['name' => 'Premium Pack', 'price_basic' => 50000, 'price_gold' => 48000, 'price_platinum' => 45000],
                ['name' => 'Monthly Pass', 'price_basic' => 75000, 'price_gold' => 70000, 'price_platinum' => 68000],
                ['name' => 'Ultra Pack', 'price_basic' => 150000, 'price_gold' => 145000, 'price_platinum' => 140000],
            ];

            foreach ($products as $p) {
                Product::updateOrCreate(
                    ['game_id' => $game->id, 'name' => $p['name']],
                    $p
                );
            }
        }
    }
}
