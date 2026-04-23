<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $news = [
            [
                'title' => 'Mobile Legends Patch 1.8.66: New Hero and Buffs',
                'slug' => 'mlbb-patch-1866',
                'content' => 'The latest patch is here! Check out the new hero and the massive buffs for your favorite assassins.',
                'image' => 'news/patch.png',
                'category' => 'Update',
                'is_active' => true,
            ],
            [
                'title' => 'Free Fire Ranked Season 38: Rewards and Tips',
                'slug' => 'ff-ranked-season-38',
                'content' => 'New ranked season is live. Here are the rewards you can get and tips to reach Grandmaster faster.',
                'image' => 'news/rank.png',
                'category' => 'Tips',
                'is_active' => true,
            ],
            [
                'title' => 'Genshin Impact 4.6: Arlecchino is Coming!',
                'slug' => 'genshin-46-arlecchino',
                'content' => 'Arlecchino finally joins the roster. Prepare your primogems for the most anticipated character of the year.',
                'image' => 'news/skin.png',
                'category' => 'Event',
                'is_active' => true,
            ],
        ];

        foreach ($news as $n) {
            \App\Models\News::updateOrCreate(['slug' => $n['slug']], $n);
        }
    }
}
