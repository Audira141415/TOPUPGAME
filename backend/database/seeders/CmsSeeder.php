<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Banner;
use App\Models\Setting;

class CmsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Seed Banners
        Banner::truncate();
        Banner::create([
            'title' => 'SOLO LEVELING: ARISE',
            'image_path' => 'banners/hero_main.png',
            'link_url' => '/game/solo-leveling',
            'is_active' => true,
            'order' => 1
        ]);

        Banner::create([
            'title' => 'LEVEL UP YOUR GAMING',
            'image_path' => 'banners/hero_main.png',
            'link_url' => '/game/mobile-legends',
            'is_active' => true,
            'order' => 2
        ]);

        // 2. Seed Settings
        Setting::truncate();
        $settings = [
            'site_name' => 'Audira Zenith',
            'whatsapp' => '6281234567890',
            'instagram' => '@audirazenith',
            'footer_text' => 'Audira Zenith - Ultimate Gaming Platform © 2026',
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
