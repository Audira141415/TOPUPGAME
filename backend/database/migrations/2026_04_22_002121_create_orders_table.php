<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->string('order_id')->unique();
            $table->foreignId('game_id')->constrained();
            $table->foreignId('product_id')->constrained();
            $table->string('target_user_id');
            $table->string('target_server_id')->nullable();
            $table->decimal('amount', 15, 2);
            $table->decimal('fee', 15, 2)->default(0);
            $table->decimal('total_amount', 15, 2);
            $table->foreignId('payment_method_id')->constrained();
            $table->string('status')->default('pending');
            $table->string('payment_status')->default('unpaid');
            $table->string('whatsapp_number');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
