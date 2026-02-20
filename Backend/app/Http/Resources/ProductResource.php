<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'description' => $this->description,
            'base_price'  => $this->base_price,
            // whenLoaded ensures this key is only present when the 'category' relation
            // was eagerly loaded — safe to reuse this resource in other contexts.
            // The nullsafe ?-> handles products where category_id is NULL.
            'category'    => $this->whenLoaded('category', fn () => $this->category?->name),
            // 'modifiers' is only included on the detail response (show endpoint),
            // where modifierOptions is eager-loaded. The index response omits this
            // key entirely, keeping the list payload lean.
            'modifiers'   => $this->whenLoaded('modifierOptions', function () {
                return $this->groupedModifiers()
                    ->map(fn ($options, $modifierName) => [
                        'name'    => $modifierName,
                        'options' => $options->map(fn ($opt) => [
                            'id'               => $opt->id,
                            'label'            => $opt->label,
                            'price_adjustment' => $opt->price_adjustment,
                        ])->values(), // values() resets array keys to 0,1,2... for JSON arrays
                    ])
                    ->values();
            }),
        ];
    }
}
