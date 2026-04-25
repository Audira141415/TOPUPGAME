<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \Illuminate\Support\Facades\Schema::defaultStringLength(191);
        \App\Models\Order::observe(\App\Observers\OrderObserver::class);

        // AUTO-SYNC RULE: Automatically discover new game covers in storage
        try {
            $this->autoSyncGames();
        } catch (\Exception $e) {
            // Silently fail to not block the app
        }
    }

    /**
     * Automatically sync games from storage to database.
     */
    private function autoSyncGames(): void
    {
        $storagePath = storage_path('app/public/games');
        if (!\Illuminate\Support\Facades\File::exists($storagePath)) return;

        $files = \Illuminate\Support\Facades\File::files($storagePath);
        $mobileCat = \App\Models\Category::firstOrCreate(
            ['slug' => 'mobile-game'],
            [
                'name' => 'Mobile Game',
                'image' => 'categories/mobile-game.png',
                'is_active' => true
            ]
        );

        foreach ($files as $file) {
            $filename = $file->getFilename();
            $extension = $file->getExtension();
            
            // Blacklist for non-game files
            if (!in_array(strtolower($extension), ['png', 'jpg', 'jpeg', 'webp'])) continue;
            if (\Illuminate\Support\Str::contains($filename, ['banner', 'logo', 'bg', 'mobile-game', 'pc-game', 'voucher', 'top-up-apps'])) continue;

            $slug = \Illuminate\Support\Str::beforeLast($filename, '.');
            $slug = str_replace('_', '-', $slug);
            
            // Check existence
            $game = \App\Models\Game::where('slug', $slug)->first();
            
            // Auto-detect banner
            $bannerPath = "banners/{$slug}_hero.png";
            $hasBannerFile = \Illuminate\Support\Facades\File::exists(storage_path("app/public/{$bannerPath}"));

            if (!$game) {
                $game = \App\Models\Game::create([
                    'category_id' => $mobileCat->id,
                    'name' => \Illuminate\Support\Str::title(str_replace('-', ' ', $slug)),
                    'slug' => $slug,
                    'image' => 'games/' . $filename,
                    'banner' => $hasBannerFile ? $bannerPath : null,
                    'description' => "Top up " . \Illuminate\Support\Str::title(str_replace('-', ' ', $slug)) . " termurah.",
                    'is_active' => true,
                ]);
            } elseif ($hasBannerFile && !$game->banner) {
                $game->update(['banner' => $bannerPath]);
            }
        }
    }
}
