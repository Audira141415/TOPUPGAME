<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RealNewsSeeder extends Seeder
{
    public function run(): void
    {
        $newsItems = [
            [
                'title' => 'Honkai: Star Rail Anniversary 3 & Update v4.2 Meluncur!',
                'slug' => 'honkai-star-rail-anniversary-3-update-v4-2',
                'category' => 'Update',
                'image' => 'games/cover_magic.png',
                'content' => 'HoYoverse resmi merilis update v4.2 bertajuk "So Laughed the Masses" bertepatan dengan ulang tahun ke-3. Pemain mendapatkan 20 tiket gacha gratis dan 1.600 Stellar Jade. Karakter bintang 5 terbaru, Silver Wolf LV.999 dan Evanescia, kini sudah bisa didapatkan melalui banner limited!',
                'created_at' => '2026-04-22 10:00:00'
            ],
            [
                'title' => 'Final SLC 2026 Global Tournament Solo Leveling: Arise!',
                'slug' => 'final-slc-2026-solo-leveling-arise',
                'category' => 'Tournament',
                'image' => 'games/cover_3.png',
                'content' => 'Turnamen tingkat dunia Solo Leveling: Arise (SLC 2026) akan mencapai puncaknya pada 25 April 2026. Para hunter terbaik dari seluruh dunia akan bertarung memperebutkan total hadiah jutaan dollar. Jangan lewatkan live showcase karakter Norma Selner di acara penutupan!',
                'created_at' => '2026-04-21 14:00:00'
            ],
            [
                'title' => 'Seal M on CROSS Season 2: Level Cap 90 & Dungeon Baru!',
                'slug' => 'seal-m-on-cross-season-2-launch',
                'category' => 'Update',
                'image' => 'games/cover_1.png',
                'content' => 'Season 2 Seal M resmi dimulai! Update besar-besaran ini menghadirkan dungeon 4-pemain "Space-time Rift" dan peningkatan level cap hingga Lv. 90. Selain itu, 4 Mythic Pets baru telah diperkenalkan untuk memperkuat karakter Anda.',
                'created_at' => '2026-04-16 09:00:00'
            ],
            [
                'title' => 'Project NEXT 2026: Mobile Legends Rombak Map Total!',
                'slug' => 'mlbb-project-next-2026-map-overhaul',
                'category' => 'News',
                'image' => 'games/mlbb.png',
                'content' => 'Moonton kembali melakukan inovasi melalui Project NEXT 2026. Map Land of Dawn kini tampil dengan visual yang lebih realistis dan mekanisme jungle yang baru. Hero terbaru bertema time-traveler juga dikabarkan akan segera hadir di Advanced Server.',
                'created_at' => '2026-04-20 16:30:00'
            ],
            [
                'title' => 'Event Dashing Sweetheart Ragnarok X: Next Generation!',
                'slug' => 'rox-dashing-sweetheart-event-2026',
                'category' => 'Event',
                'image' => 'games/cover_magic.png',
                'content' => 'Ragnarok X merayakan musim semi dengan event Dashing Sweetheart. Pemain bisa mendapatkan kostum eksklusif dan item langka melalui serangkaian quest harian. Optimasi Exchange Center juga dilakukan untuk memastikan harga item tetap stabil.',
                'created_at' => '2026-04-18 11:15:00'
            ],
            [
                'title' => 'Zenless Zone Zero: Kolaborasi Eksklusif Dengan Brand Fashion!',
                'slug' => 'zzz-collaboration-fashion-brand-2026',
                'category' => 'Collaboration',
                'image' => 'games/cover_2.png',
                'content' => 'ZZZ membawa gaya urban ke level berikutnya dengan kolaborasi bersama brand fashion streetwear ternama. Pemain bisa mendapatkan skin eksklusif untuk Belle dan Wise, serta item dekorasi kafe bertema streetwear limited edition.',
                'created_at' => '2026-04-15 08:45:00'
            ],
            [
                'title' => 'Bocoran Arknights: Endfield - Region Baru Terungkap!',
                'slug' => 'arknights-endfield-new-region-leaked',
                'category' => 'Leak',
                'image' => 'games/cover_tactical.png',
                'content' => 'Beberapa bocoran dari data mining mengungkap region baru di Arknights: Endfield yang memiliki cuaca ekstrem dan mekanisme eksplorasi vertikal. Developer diperkirakan akan memberikan pengumuman resmi di dev log bulan depan.',
                'created_at' => '2026-04-23 07:00:00'
            ],
        ];

        foreach ($newsItems as $item) {
            News::updateOrCreate(
                ['slug' => $item['slug']],
                $item
            );
        }
    }
}
