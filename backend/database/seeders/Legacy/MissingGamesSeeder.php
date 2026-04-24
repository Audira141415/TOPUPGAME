<?php

namespace Database\Seeders;

use App\Models\Game;
use Illuminate\Database\Seeder;

class MissingGamesSeeder extends Seeder
{
    public function run(): void
    {
        $games = [
            [
                'name' => 'eFootball 2025',
                'slug' => 'efootball',
                'category_id' => 1,
                'image' => 'games/efootball.png',
                'description' => 'Top up eFootball Coins termurah dan tercepat hanya di Audira Zenith.',
                'is_active' => true,
                'is_popular' => true,
            ],
            [
                'name' => 'Eggy Party',
                'slug' => 'eggy-party',
                'category_id' => 1,
                'image' => 'games/eggy-party.png',
                'description' => 'Top up Eggy Coins termurah dan tercepat hanya di Audira Zenith.',
                'is_active' => true,
                'is_popular' => false,
            ],
            [
                'name' => 'Legend of Mushroom',
                'slug' => 'legend-of-mushroom',
                'category_id' => 1,
                'image' => 'games/legend-of-mushroom.png',
                'description' => 'Top up Legend of Mushroom termurah dan tercepat hanya di Audira Zenith.',
                'is_active' => true,
                'is_popular' => false,
            ],
            [
                'name' => 'Night Crows',
                'slug' => 'night-crows',
                'category_id' => 1,
                'image' => 'games/night-crows.png',
                'description' => 'Top up Night Crows Diamonds termurah dan tercepat hanya di Audira Zenith.',
                'is_active' => true,
                'is_popular' => false,
            ],
            [
                'name' => 'Ragnarok M: Eternal Love',
                'slug' => 'ragnarok-m',
                'category_id' => 1,
                'image' => 'games/ragnarok-m.png',
                'description' => 'Top up Big Cat Coin Ragnarok M termurah dan tercepat hanya di Audira Zenith.',
                'is_active' => true,
                'is_popular' => true,
            ],
            [
                'name' => 'Stumble Guys',
                'slug' => 'stumble-guys',
                'category_id' => 1,
                'image' => 'games/stumble-guys.png',
                'description' => 'Top up Gems Stumble Guys termurah dan tercepat hanya di Audira Zenith.',
                'is_active' => true,
                'is_popular' => true,
            ],
            [
                'name' => 'Whiteout Survival',
                'slug' => 'whiteout-survival',
                'category_id' => 1,
                'image' => 'games/whiteout-survival.png',
                'description' => 'Top up Whiteout Survival Frost Star termurah dan tercepat hanya di Audira Zenith.',
                'is_active' => true,
                'is_popular' => false,
            ],
            [
                'name' => 'League of Legends: Wild Rift',
                'slug' => 'wild-rift',
                'category_id' => 1,
                'image' => 'games/wild_rift.png',
                'description' => 'Top up Wild Cores Wild Rift termurah dan tercepat hanya di Audira Zenith.',
                'is_active' => true,
                'is_popular' => true,
            ],
        ];

        foreach ($games as $gameData) {
            Game::updateOrCreate(
                ['slug' => $gameData['slug']],
                $gameData
            );
        }
    }
}
