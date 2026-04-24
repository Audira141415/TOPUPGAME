<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Game;
use App\Models\Category;

class AnimeGamesSeeder extends Seeder
{
    public function run(): void
    {
        $mobileCategory = Category::where('name', 'Mobile Game')->first();
        
        $games = [
            [
                'name' => 'The Seven Deadly Sins: Grand Cross',
                'slug' => '7ds-grand-cross',
                'image' => 'games/cover_gacha.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'The Seven Deadly Sins: Origin',
                'slug' => '7ds-origin',
                'image' => 'games/cover_gacha.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Wuthering Waves',
                'slug' => 'wuthering-waves',
                'image' => 'games/cover_mecha.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Punishing: Gray Raven',
                'slug' => 'punishing-gray-raven',
                'image' => 'games/cover_mecha.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Solo Leveling: Arise',
                'slug' => 'solo-leveling-arise',
                'image' => 'games/sololeveling.png',
                'category_id' => $mobileCategory->id,
                'is_active' => true,
            ],
            [
                'name' => 'Black Clover M',
                'slug' => 'black-clover-m',
                'image' => 'games/blackclover.png',
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
