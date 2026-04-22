<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('reference')->nullable()->after('order_id'); // Tripay Reference
            $table->string('payment_url')->nullable()->after('reference');
            $table->text('payment_instruction')->nullable()->after('payment_url');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['reference', 'payment_url', 'payment_instruction']);
        });
    }
};
