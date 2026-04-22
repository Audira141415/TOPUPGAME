<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('payment_methods', function (Blueprint $table) {
            if (!Schema::hasColumn('payment_methods', 'fee_percent')) {
                $table->decimal('fee_percent', 5, 2)->default(0)->after('fee');
            }
            if (!Schema::hasColumn('payment_methods', 'min_amount')) {
                $table->decimal('min_amount', 15, 2)->default(0)->after('fee_percent');
            }
            if (!Schema::hasColumn('payment_methods', 'max_amount')) {
                $table->decimal('max_amount', 15, 2)->default(10000000)->after('min_amount');
            }
            if (!Schema::hasColumn('payment_methods', 'instructions')) {
                $table->text('instructions')->nullable()->after('max_amount');
            }
        });
    }

    public function down(): void
    {
        Schema::table('payment_methods', function (Blueprint $table) {
            $table->dropColumn(['fee_percent', 'min_amount', 'max_amount', 'instructions']);
        });
    }
};
