<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Game;
use App\Models\Category;
use Illuminate\Support\Str;

class StrategyGamesSeeder extends Seeder
{
    public function run(): void
    {
        $mobileCategory = Category::where('name', 'Mobile Game')->first();
        
        $games = [
            [
                'name' => 'Rise of Kingdoms',
                'slug' => 'rise-of-kingdoms',
                'image' => 'games/rok.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Perfect World Mobile',
                'slug' => 'perfect-world-mobile',
                'image' => 'games/cover_magic.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Clash of Clans',
                'slug' => 'clash-of-clans',
                'image' => 'games/cover_tactical.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Clash Royale',
                'slug' => 'clash-royale',
                'image' => 'games/cover_tactical.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'State of Survival',
                'slug' => 'state-of-survival',
                'image' => 'games/cover_tactical.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Lords Mobile',
                'slug' => 'lords-mobile',
                'image' => 'games/cover_tactical.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Arknights',
                'slug' => 'arknights',
                'image' => 'games/arknights.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Blue Archive',
                'slug' => 'blue-archive',
                'image' => 'games/bluearchive.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Nikke: Goddess of Victory',
                'slug' => 'nikke',
                'image' => 'games/nikke.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Honkai: Star Rail',
                'slug' => 'honkai-star-rail',
                'image' => 'games/honkai_star_rail.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Ragnarok Origin',
                'slug' => 'ragnarok-origin',
                'image' => 'games/ro_origin.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Dragon Nest 2',
                'slug' => 'dragon-nest-2',
                'image' => 'games/dragonnest2.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Diablo Immortal',
                'slug' => 'diablo-immortal',
                'image' => 'games/diablo.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
        ];

        foreach ($games as $gameData) {
            Game::updateOrCreate(
                ['slug' => $gameData['slug']],
                array_merge($gameData, [
                    'image' => "games/{$gameData['slug']}.png"
                ])
            );
        }
    }
}
