<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // CREATE SUPER ADMIN
        User::updateOrCreate(
            ['email' => 'admin@audirazenith.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('Sigma1993'),
                'role' => 'admin',
            ]
        );

        // CREATE TEST CUSTOMER
        User::updateOrCreate(
            ['email' => 'customer@audirazenith.com'],
            [
                'name' => 'Customer Sultan',
                'password' => Hash::make('Sigma1993'),
                'role' => 'user',
            ]
        );

        // Default Admin (Backup)
        User::updateOrCreate(
            ['email' => 'admin@topupgame.com'],
            [
                'name' => 'Admin Topup',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        $this->call([
            CmsSeeder::class,
            GameSeeder::class,
            PaymentMethodSeeder::class,
            FlashSaleSeeder::class,
            NewsSeeder::class,
        ]);
    }
}
