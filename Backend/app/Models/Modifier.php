<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Modifier extends Model
{
    protected $fillable = ['name'];

    /**
     * hasMany: "I own many children."
     * Eloquent infers the FK as 'modifier_id' on the modifier_options table.
     * We always order by sort_order so the UI shows S, M, L, XL (not insertion order).
     */
    public function options(): HasMany
    {
        return $this->hasMany(ModifierOption::class)->orderBy('sort_order');
    }
}
