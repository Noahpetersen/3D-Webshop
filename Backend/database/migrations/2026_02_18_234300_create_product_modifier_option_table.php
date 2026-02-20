<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Pivot (junction) table — resolves the Many-to-Many between products and modifier_options.
        // No auto-increment id() and no timestamps() — pivot tables are lean by design.
        // The composite primary key on both FKs guarantees no duplicate product+option pairs.
        Schema::create('product_modifier_option', function (Blueprint $table) {
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->foreignId('modifier_option_id')->constrained()->cascadeOnDelete();
            $table->primary(['product_id', 'modifier_option_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_modifier_option');
    }
};
