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
            // whenLoaded ensures this key is only present when the 'category' relation
            // was eagerly loaded — safe to reuse this resource in other contexts.
            // The nullsafe ?-> handles products where category_id is NULL.
            'category'    => $this->whenLoaded('category', fn () => $this->category?->name),
        ];
    }
}
