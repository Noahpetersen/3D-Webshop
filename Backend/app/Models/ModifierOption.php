<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ModifierOption extends Model
{
    protected $fillable = ['modifier_id', 'label', 'price_adjustment', 'sort_order'];

    /**
     * $casts tells Eloquent to convert column values after fetching.
     * SQLite returns all numeric columns as strings — without this cast,
     * `price_adjustment` would be "15" (string) instead of 15 (float),
     * causing arithmetic bugs and wrong JSON serialisation.
     */
    protected $casts = [
        'price_adjustment' => 'float',
        'sort_order'       => 'integer',
    ];

    /**
     * belongsTo: "I belong to one parent."
     * Eloquent infers the FK as 'modifier_id' on this model's table.
     */
    public function modifier(): BelongsTo
    {
        return $this->belongsTo(Modifier::class);
    }

    /**
     * belongsToMany: "We reference each other many times."
     * The pivot table 'product_modifier_option' holds the FK pairs.
     * Neither model has a FK directly — the pivot does.
     */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_modifier_option');
    }
}
