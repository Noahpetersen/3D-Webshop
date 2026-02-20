<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        // with('category') eager-loads the relationship in one additional query,
        // preventing N+1 (one query per product to fetch its category).
        $products = Product::with('category')->get();

        return ProductResource::collection($products);
    }

    public function show(Product $product): ProductResource
    {
        // 'modifierOptions.modifier' is a nested eager load — the dot notation means:
        //   1. Load all modifier_options linked to this product (via the pivot JOIN)
        //   2. For each option, also load its parent modifier in the same batch
        // Total: 4 queries regardless of how many options the product has.
        // Without this: 1 query per option to fetch its modifier (N+1 problem).
        $product->loadMissing(['category', 'modifierOptions.modifier']);

        return new ProductResource($product);
    }
}
