<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Game;
use App\Models\Category;

class RPGGamesSeeder extends Seeder
{
    public function run(): void
    {
        $mobileCategory = Category::where('name', 'Mobile Game')->first();
        
        $games = [
            [
                'name' => 'Seven Knights 2',
                'slug' => 'seven-knights-2',
                'image' => 'games/cover_magic.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Seven Knights Idle Adventure',
                'slug' => 'seven-knights-idle',
                'image' => 'games/cover_magic.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Summoners War: Sky Arena',
                'slug' => 'summoners-war-sky-arena',
                'image' => 'games/summonerswar.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Epic Seven',
                'slug' => 'epic-seven',
                'image' => 'games/cover_gacha.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Raid: Shadow Legends',
                'slug' => 'raid-shadow-legends',
                'image' => 'games/cover_tactical.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Goddess of Victory: Nikke',
                'slug' => 'nikke-goddess-of-victory',
                'image' => 'games/nikke.png',
                'category_id' => $mobileCategory->id,
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
