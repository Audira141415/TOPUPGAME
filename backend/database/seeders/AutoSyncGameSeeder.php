<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Game;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class AutoSyncGameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * This seeder automatically detects images in storage and ensures they have a matching game entry.
     */
    public function run(): void
    {
        $storagePath = storage_path('app/public/games');
        
        if (!File::exists($storagePath)) {
            $this->command->error("Storage path not found: {$storagePath}");
            return;
        }

        $files = File::files($storagePath);
        $count = 0;

        // Ensure default categories exist
        $mobileCat = Category::firstOrCreate(['slug' => 'mobile-game'], ['name' => 'Mobile Game']);
        
        foreach ($files as $file) {
            $filename = $file->getFilename();
            $extension = $file->getExtension();
            
            // Skip non-images, banners, and category icons
            if (!in_array(strtolower($extension), ['png', 'jpg', 'jpeg', 'webp', 'svg'])) continue;
            if (Str::contains($filename, ['banner', 'logo', 'bg', 'mobile-game', 'pc-game', 'voucher', 'top-up-apps'])) continue;

            $slug = Str::beforeLast($filename, '.');
            
            // Normalize slug (replace underscores with dashes for consistency)
            $slug = str_replace('_', '-', $slug);
            
            // Human readable name
            $name = Str::title(str_replace('-', ' ', $slug));
            
            // Check if game already exists
            $exists = Game::where('slug', $slug)->orWhere('image', 'games/' . $filename)->exists();

            if (!$exists) {
                Game::create([
                    'category_id' => $mobileCat->id,
                    'name' => $name,
                    'slug' => $slug,
                    'image' => 'games/' . $filename,
                    'description' => "Top up {$name} termurah dan tercepat hanya di Audira Zenith.",
                    'is_active' => true,
                    'is_popular' => false,
                    'validation_config' => [
                        'fields' => [
                            ['name' => 'User ID', 'key' => 'user_id', 'type' => 'text', 'placeholder' => '12345678'],
                        ]
                    ]
                ]);
                $count++;
            }
        }

        $this->command->info("Auto-Sync Complete. Created {$count} new game entries.");
    }
}
