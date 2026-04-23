<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    public function run(): void
    {
        $methods = [
            [
                'name' => 'QRIS',
                'code' => 'QRIS',
                'gateway' => 'E-Wallet',
                'image' => 'payments/qris.png',
                'is_active' => true,
            ],
            [
                'name' => 'BCA Transfer',
                'code' => 'BCA',
                'gateway' => 'Bank Transfer',
                'image' => 'payments/bca.png',
                'is_active' => true,
            ],
            [
                'name' => 'Mandiri Transfer',
                'code' => 'MANDIRI',
                'gateway' => 'Bank Transfer',
                'image' => 'payments/mandiri.png',
                'is_active' => true,
            ],
            [
                'name' => 'Dana',
                'code' => 'DANA',
                'gateway' => 'E-Wallet',
                'image' => 'payments/dana.png',
                'is_active' => true,
            ],
        ];

        foreach ($methods as $m) {
            PaymentMethod::updateOrCreate(['code' => $m['code']], $m);
        }
    }
}
