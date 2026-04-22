<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Enhance Providers
        Schema::table('providers', function (Blueprint $table) {
            if (!Schema::hasColumn('providers', 'environment')) {
                $table->string('environment')->default('sandbox')->after('name');
            }
            if (!Schema::hasColumn('providers', 'webhook_url')) {
                $table->string('webhook_url')->nullable()->after('api_url');
            }
        });

        // Enhance Promos
        Schema::table('promos', function (Blueprint $table) {
            if (!Schema::hasColumn('promos', 'game_id')) {
                $table->foreignId('game_id')->nullable()->constrained()->after('id');
            }
            if (!Schema::hasColumn('promos', 'used')) {
                $table->integer('used')->default(0)->after('quota');
            }
            if (!Schema::hasColumn('promos', 'max_discount')) {
                $table->decimal('max_discount', 15, 2)->nullable()->after('value');
            }
            if (!Schema::hasColumn('promos', 'min_purchase')) {
                $table->decimal('min_purchase', 15, 2)->default(0)->after('max_discount');
            }
        });
    }

    public function down(): void
    {
        Schema::table('providers', function (Blueprint $table) {
            $table->dropColumn(['environment', 'webhook_url']);
        });

        Schema::table('promos', function (Blueprint $table) {
            $table->dropForeign(['game_id']);
            $table->dropColumn(['game_id', 'used', 'max_discount', 'min_purchase']);
        });
    }
};
