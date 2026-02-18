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
        $product->loadMissing('category');
        return new ProductResource($product);
    }
}
