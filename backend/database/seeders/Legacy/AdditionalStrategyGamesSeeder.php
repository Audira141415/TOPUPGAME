<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Game;
use App\Models\Category;

class AdditionalStrategyGamesSeeder extends Seeder
{
    public function run(): void
    {
        $mobileCategory = Category::where('name', 'Mobile Game')->first();
        
        $games = [
            [
                'name' => 'Call of Dragons',
                'slug' => 'call-of-dragons',
                'image' => 'games/cover_tactical.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Evony: The King\'s Return',
                'slug' => 'evony',
                'image' => 'games/cover_tactical.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Age of Origins',
                'slug' => 'age-of-origins',
                'image' => 'games/cover_tactical.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Last Shelter: Survival',
                'slug' => 'last-shelter-survival',
                'image' => 'games/cover_tactical.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'War and Order',
                'slug' => 'war-and-order',
                'image' => 'games/cover_tactical.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Mafia City',
                'slug' => 'mafia-city',
                'image' => 'games/cover_tactical.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Puzzles & Survival',
                'slug' => 'puzzles-survival',
                'image' => 'games/cover_tactical.png',
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
