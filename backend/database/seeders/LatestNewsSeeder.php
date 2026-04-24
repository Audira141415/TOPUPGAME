<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;

class LatestNewsSeeder extends Seeder
{
    public function run(): void
    {
        $newsItems = [
            [
                'title' => 'Mobile Legends: Hero Assassin Baru "Lukas" Bocor ke Publik!',
                'category' => 'Leaks',
                'image' => 'news/mlbb_lukas.png',
                'content' => 'Seorang leaker ternama baru saja membocorkan desain dan skill dari hero assassin terbaru Mobile Legends bernama Lukas. Lukas dikabarkan memiliki mekanisme "Shadow Step" yang membuatnya sulit ditangkap di area jungle. Hero ini diprediksi rilis pada Juni 2026.',
                'created_at' => Carbon::now()->subHours(2)
            ],
            [
                'title' => 'Genshin Impact: Wilayah "Natlan" Akan Segera Dibuka?',
                'category' => 'Updates',
                'image' => 'news/genshin_natlan.png',
                'content' => 'HoYoverse memberikan teaser singkat mengenai wilayah Pyro, Natlan. Dalam video berdurasi 30 detik tersebut, terlihat pemandangan gunung berapi dan suku-suku lokal yang sedang bertarung. Update v5.0 ini diharapkan menjadi lonjakan besar bagi cerita utama Traveler.',
                'created_at' => Carbon::now()->subHours(5)
            ],
            [
                'title' => 'VALORANT: Map Baru "Oasis" Dengan Mekanisme Portal!',
                'category' => 'Maps',
                'image' => 'news/valorant_oasis.png',
                'content' => 'Riot Games memperkenalkan Oasis, map bertema Timur Tengah yang memiliki portal teleportasi antar site. Map ini akan menggantikan Breeze dalam rotasi map kompetitif di Episode 10 mendatang.',
                'created_at' => Carbon::now()->subHours(12)
            ],
            [
                'title' => 'Honor of Kings Global: Turnamen Invitasi Jakarta Berhadiah $1 Juta!',
                'category' => 'Tournaments',
                'image' => 'news/hok_jakarta.png',
                'content' => 'Jakarta resmi terpilih menjadi tuan rumah Honor of Kings Invitational Season 3. Turnamen ini akan mempertemukan tim-tim terbaik dari Asia Tenggara dan China untuk memperebutkan total prize pool sebesar $1,000,000.',
                'created_at' => Carbon::now()->subDays(1)
            ],
            [
                'title' => 'Free Fire: Kolaborasi Anime "Solo Leveling" Resmi Dimulai!',
                'category' => 'Collaboration',
                'image' => 'news/ff_sl.png',
                'content' => 'Garena Free Fire resmi memulai event kolaborasi dengan Solo Leveling. Pemain bisa mendapatkan bundle kostum Sung Jin-Woo dan skin senjata "Igris Blade" melalui event khusus di dalam game.',
                'created_at' => Carbon::now()->subDays(2)
            ],
            [
                'title' => 'PUBG Mobile: Update 3.2 Menghadirkan Mode "Mecha Combat"',
                'category' => 'Patch Notes',
                'image' => 'news/pubg_mecha.png',
                'content' => 'Dalam update terbaru ini, pemain bisa menemukan robot raksasa (Mecha) yang bisa dikendarai di map Erangel. Robot ini dilengkapi dengan jetpack dan meriam plasma untuk pertempuran skala besar.',
                'created_at' => Carbon::now()->subDays(3)
            ]
        ];

        foreach ($newsItems as $item) {
            $item['slug'] = Str::slug($item['title']);
            $item['is_featured'] = true;
            $item['author'] = 'Zenith Intelligence';
            $item['tags'] = ['Hot', 'RealNews', '2026'];
            
            News::updateOrCreate(
                ['slug' => $item['slug']],
                $item
            );
        }
    }
}
