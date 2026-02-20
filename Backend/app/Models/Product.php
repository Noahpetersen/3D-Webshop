<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Collection;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    // category_id intentionally excluded — the FK association is managed explicitly,
    // not via mass assignment, to prevent accidental relationship overrides.
    protected $fillable = ['name', 'description', 'base_price'];

    /**
     * Cast base_price from string (SQLite) to float so arithmetic and JSON
     * serialisation work correctly without manual (float) casts everywhere.
     */
    protected $casts = [
        'base_price' => 'float',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * The modifier options this product offers to buyers.
     *
     * belongsToMany(RelatedModel, pivotTable) builds a JOIN:
     *   products → product_modifier_option → modifier_options
     *
     * with('modifier') is a nested eager load: for each option we also load its
     * parent Modifier in the same query batch, so groupedModifiers() can read
     * $option->modifier->name without triggering extra SQL.
     */
    public function modifierOptions(): BelongsToMany
    {
        return $this->belongsToMany(
            ModifierOption::class,
            'product_modifier_option',
        )->with('modifier')->orderBy('sort_order');
    }

    /**
     * Returns modifier options grouped by their parent modifier name.
     * Used by ProductResource to shape the JSON for the configurator UI.
     *
     * groupBy() is a Laravel Collection method — it runs in PHP memory,
     * not SQL. The closure receives each ModifierOption and returns the
     * key to group by.
     *
     * Result: ['Material' => Collection[...], 'Color' => Collection[...]]
     *
     * Call $this->modifierOptions (property) not modifierOptions() (method):
     * the property accesses the already-loaded collection; the method would
     * re-query the database.
     */
    public function groupedModifiers(): Collection
    {
        return $this->modifierOptions
            ->groupBy(fn (ModifierOption $option) => $option->modifier->name);
    }
}
