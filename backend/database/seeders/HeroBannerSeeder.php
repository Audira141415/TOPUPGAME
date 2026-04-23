<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Banner;

class HeroBannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $banners = [
            [
                'title' => 'Gaming News Hero',
                'image_path' => 'banners/news_hero.png',
                'link_url' => '/news',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Tournament Hub Hero',
                'image_path' => 'banners/tournament_hero.png',
                'link_url' => '/tournaments',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Loyalty Shop Hero',
                'image_path' => 'banners/loyalty_hero.png',
                'link_url' => '/loyalty-shop',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Flash Sale Hero',
                'image_path' => 'banners/flashsale_hero.png',
                'link_url' => '/flash-sale',
                'order' => 5,
                'is_active' => true,
            ],
            [
                'title' => 'Mystery Box Hero',
                'image_path' => 'banners/mysterybox_hero.png',
                'link_url' => '/mystery-box',
                'order' => 6,
                'is_active' => true,
            ],
            [
                'title' => 'Account Store Hero',
                'image_path' => 'banners/account_hero.png',
                'link_url' => '/account-store',
                'order' => 7,
                'is_active' => true,
            ],
            [
                'title' => 'Gamer Tools Hero',
                'image_path' => 'banners/tools_hero.png',
                'link_url' => '/tools',
                'order' => 8,
                'is_active' => true,
            ],
            [
                'title' => 'Order Tracking Hero',
                'image_path' => 'banners/track_hero.png',
                'link_url' => '/track',
                'order' => 9,
                'is_active' => true,
            ],
        ];

        foreach ($banners as $bannerData) {
            Banner::updateOrCreate(
                ['image_path' => $bannerData['image_path']],
                $bannerData
            );
        }
    }
}
