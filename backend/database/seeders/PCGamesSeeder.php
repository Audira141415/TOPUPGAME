<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Game;
use App\Models\Category;

class PCGamesSeeder extends Seeder
{
    public function run(): void
    {
        $pcCategory = Category::where('name', 'PC Game')->first();
        
        $games = [
            [
                'name' => 'Dota 2',
                'slug' => 'dota-2',
                'image' => 'games/cover_tactical.png',
                'category_id' => $pcCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Steam Wallet Code',
                'slug' => 'steam-wallet',
                'image' => 'games/steam.png',
                'category_id' => $pcCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'League of Legends',
                'slug' => 'league-of-legends',
                'image' => 'games/cover_magic.png',
                'category_id' => $pcCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Point Blank',
                'slug' => 'point-blank',
                'image' => 'games/cover_tactical.png',
                'category_id' => $pcCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Counter-Strike 2',
                'slug' => 'cs2',
                'image' => 'games/cover_tactical.png',
                'category_id' => $pcCategory->id,
                'is_active' => true,
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
