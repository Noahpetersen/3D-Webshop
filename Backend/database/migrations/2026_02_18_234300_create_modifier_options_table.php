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
        Schema::create('modifier_options', function (Blueprint $table) {
            $table->id();
            // foreignId() is shorthand for unsignedBigInteger().
            // constrained() infers the table name from the column name (modifier_id → modifiers).
            // cascadeOnDelete() auto-deletes options when their parent modifier is deleted.
            $table->foreignId('modifier_id')->constrained()->cascadeOnDelete();
            $table->string('label');
            // Price delta relative to the product's base_price. Null/0 means no surcharge.
            $table->decimal('price_adjustment', 8, 2)->nullable()->default(0);
            // Controls display order in the UI (S before M before L before XL).
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
            // Composite unique: no duplicate label within the same modifier type.
            $table->unique(['modifier_id', 'label']);
            // Index for fast "all options for this modifier, ordered" queries.
            $table->index(['modifier_id', 'sort_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modifier_options');
    }
};
