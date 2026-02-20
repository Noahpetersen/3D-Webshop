<?php

namespace Database\Seeders;

use App\Models\ModifierOption;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * We switched from DB::table()->insert() to Eloquent updateOrCreate() for two reasons:
     * 1. We need to call $product->modifierOptions()->sync() to attach pivot rows,
     *    which requires an Eloquent model instance (not a raw DB result).
     * 2. updateOrCreate() makes the seeder idempotent — re-running it updates
     *    existing products instead of inserting duplicates.
     *
     * sync() takes an array of IDs and replaces all pivot rows for that product
     * to match exactly — it adds missing pairs and removes extras. Idempotent.
     */
    public function run(): void
    {
        // Fetch all modifier options indexed by [modifier_name][label] in one query.
        // This prevents N+1: without this we'd fire a query per product per option lookup.
        /** @var \Illuminate\Support\Collection<string, \Illuminate\Support\Collection<string, ModifierOption>> $options */
        $options = ModifierOption::with('modifier')->get()
            ->groupBy(fn ($opt) => $opt->modifier->name)
            ->map(fn ($group) => $group->keyBy('label'));

        // Helper closure: resolve option IDs for a given modifier + label list.
        // Returns an array of integer IDs, filtering any unresolved labels.
        $ids = fn (string $modifier, array $labels): array =>
            collect($labels)
                ->map(fn ($label) => $options[$modifier][$label]->id ?? null)
                ->filter()
                ->values()
                ->toArray();

        $products = [
            // --- Mountain Bikes (all 4 modifiers, full option subsets) ---
            [
                'name'        => 'TrailBlazer Pro 29',
                'description' => 'Professional mountain bike with full suspension, 29-inch wheels, and carbon fiber frame. Perfect for aggressive trail riding.',
                'category_id' => 1,
                'base_price'  => 1999.00,
                'options'     => array_merge(
                    $ids('Material',   ['PLA', 'PETG', 'ABS', 'Resin']),
                    $ids('Color',      ['White', 'Black', 'Grey', 'Blue']),
                    $ids('Frame Size', ['S', 'M', 'L', 'XL']),
                    $ids('Wheel Size', ['27.5"', '29"']),
                ),
            ],
            [
                'name'        => 'Alpine Explorer X3',
                'description' => 'Hardtail mountain bike with hydraulic disc brakes and 27.5-inch wheels. Ideal for cross-country adventures.',
                'category_id' => 1,
                'base_price'  => 1299.00,
                'options'     => array_merge(
                    $ids('Material',   ['PLA', 'PETG', 'ABS']),
                    $ids('Color',      ['White', 'Black', 'Grey']),
                    $ids('Frame Size', ['S', 'M', 'L']),
                    $ids('Wheel Size', ['26"', '27.5"']),
                ),
            ],
            // --- Road Bikes ---
            [
                'name'        => 'SpeedRacer Elite',
                'description' => 'Lightweight carbon road bike designed for speed. Features aerodynamic frame and Shimano 105 groupset.',
                'category_id' => 2,
                'base_price'  => 2499.00,
                'options'     => array_merge(
                    $ids('Material',   ['PETG', 'ABS', 'Resin']),
                    $ids('Color',      ['White', 'Black', 'Blue']),
                    $ids('Frame Size', ['S', 'M', 'L', 'XL']),
                    $ids('Wheel Size', ['29"']),
                ),
            ],
            [
                'name'        => 'Urban Commuter 700c',
                'description' => 'Sleek road bike perfect for city commuting. Equipped with puncture-resistant tires and integrated lights.',
                'category_id' => 2,
                'base_price'  => 999.00,
                'options'     => array_merge(
                    $ids('Material',   ['PLA', 'PETG']),
                    $ids('Color',      ['White', 'Black', 'Grey', 'Blue']),
                    $ids('Frame Size', ['S', 'M', 'L']),
                    $ids('Wheel Size', ['29"']),
                ),
            ],
            // --- Electric Bikes (no Material — aluminium frame only) ---
            // This demonstrates scalability: e-bikes simply don't get Material options.
            [
                'name'        => 'PowerCruise E-Bike',
                'description' => 'Electric bike with 500W motor and 80km range. Features pedal assist and throttle mode for effortless riding.',
                'category_id' => 3,
                'base_price'  => 2299.00,
                'options'     => array_merge(
                    $ids('Color',      ['White', 'Black', 'Grey']),
                    $ids('Frame Size', ['M', 'L', 'XL']),
                ),
            ],
            [
                'name'        => 'City Glide Electric',
                'description' => 'Stylish electric commuter bike with integrated battery, LED display, and comfortable upright riding position.',
                'category_id' => 3,
                'base_price'  => 1799.00,
                'options'     => array_merge(
                    $ids('Color',      ['White', 'Black', 'Blue']),
                    $ids('Frame Size', ['S', 'M', 'L']),
                ),
            ],
            [
                'name'        => 'Thunder Mountain E-MTB',
                'description' => 'Electric mountain bike with powerful 750W motor, full suspension, and 100km range for epic trail rides.',
                'category_id' => 3,
                'base_price'  => 2999.00,
                'options'     => array_merge(
                    $ids('Color',      ['Black', 'Grey']),
                    $ids('Frame Size', ['M', 'L', 'XL']),
                    $ids('Wheel Size', ['27.5"', '29"']),
                ),
            ],
            // --- Kids Bikes (Color only — fixed frame and wheel size) ---
            [
                'name'        => 'Junior Adventure 20"',
                'description' => 'Durable kids mountain bike with 20-inch wheels, adjustable seat, and easy-to-use gears. Ages 6-10.',
                'category_id' => 4,
                'base_price'  => 299.00,
                'options'     => $ids('Color', ['White', 'Black', 'Blue']),
            ],
            [
                'name'        => 'Little Racer 16"',
                'description' => 'Colorful beginner bike with training wheels, hand brakes, and sturdy steel frame. Perfect for ages 4-6.',
                'category_id' => 4,
                'base_price'  => 199.00,
                'options'     => $ids('Color', ['White', 'Blue']),
            ],
            [
                'name'        => 'Teen Sport 24"',
                'description' => 'Versatile youth bike with 24-inch wheels, 21-speed gearing, and front suspension. Ideal for ages 10-14.',
                'category_id' => 4,
                'base_price'  => 449.00,
                'options'     => array_merge(
                    $ids('Material', ['PLA', 'PETG']),
                    $ids('Color',    ['White', 'Black', 'Grey', 'Blue']),
                ),
            ],
        ];

        foreach ($products as $productData) {
            $optionIds = $productData['options'];
            unset($productData['options']);

            $product = Product::updateOrCreate(
                ['name' => $productData['name']],
                $productData,
            );

            // sync() replaces all pivot rows for this product to match $optionIds exactly.
            // It runs three operations in one call: detach removed options, attach new ones.
            $product->modifierOptions()->sync($optionIds);
        }
    }
}
