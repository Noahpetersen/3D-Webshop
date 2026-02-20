<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Schema::table() modifies an existing table (vs Schema::create() which makes a new one).
     * decimal(8, 2) stores up to 999999.99 with two decimal places.
     * Never use float for money — floating-point arithmetic has rounding errors.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->decimal('base_price', 8, 2)->default(0)->after('description');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('base_price');
        });
    }
};
