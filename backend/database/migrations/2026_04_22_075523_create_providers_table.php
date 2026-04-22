<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('providers', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Digiflazz, VIP Reseller, etc.
            $table->string('api_key')->nullable();
            $table->string('api_username')->nullable();
            $table->string('api_password')->nullable();
            $table->string('api_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Add provider_id to products table
        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('provider_id')->nullable()->constrained('providers')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['provider_id']);
            $table->dropColumn('provider_id');
        });
        Schema::dropIfExists('providers');
    }
};
