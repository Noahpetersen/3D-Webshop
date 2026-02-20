<?php

namespace Database\Seeders;

use App\Models\Modifier;
use App\Models\ModifierOption;
use Illuminate\Database\Seeder;

class ModifierSeeder extends Seeder
{
    /**
     * Seeders insert deterministic, known data (vs Factories which generate randomised fake data).
     * Use firstOrCreate so this seeder is idempotent — safe to run multiple times
     * without creating duplicates. The first argument is the "find by" condition;
     * the second argument provides values only used when creating a new record.
     */
    public function run(): void
    {
        $modifiers = [
            'Material' => [
                ['label' => 'PLA',   'price_adjustment' => 0,  'sort_order' => 1],
                ['label' => 'PETG',  'price_adjustment' => 8,  'sort_order' => 2],
                ['label' => 'ABS',   'price_adjustment' => 15, 'sort_order' => 3],
                ['label' => 'Resin', 'price_adjustment' => 40, 'sort_order' => 4],
            ],
            'Color' => [
                ['label' => 'White', 'price_adjustment' => 0, 'sort_order' => 1],
                ['label' => 'Black', 'price_adjustment' => 0, 'sort_order' => 2],
                ['label' => 'Grey',  'price_adjustment' => 0, 'sort_order' => 3],
                ['label' => 'Blue',  'price_adjustment' => 5, 'sort_order' => 4],
            ],
            'Frame Size' => [
                ['label' => 'S',  'price_adjustment' => 0,  'sort_order' => 1],
                ['label' => 'M',  'price_adjustment' => 0,  'sort_order' => 2],
                ['label' => 'L',  'price_adjustment' => 10, 'sort_order' => 3],
                ['label' => 'XL', 'price_adjustment' => 20, 'sort_order' => 4],
            ],
            'Wheel Size' => [
                ['label' => '26"',   'price_adjustment' => 0,  'sort_order' => 1],
                ['label' => '27.5"', 'price_adjustment' => 15, 'sort_order' => 2],
                ['label' => '29"',   'price_adjustment' => 25, 'sort_order' => 3],
            ],
        ];

        foreach ($modifiers as $modifierName => $options) {
            $modifier = Modifier::firstOrCreate(['name' => $modifierName]);

            foreach ($options as $optionData) {
                ModifierOption::firstOrCreate(
                    ['modifier_id' => $modifier->id, 'label' => $optionData['label']],
                    ['price_adjustment' => $optionData['price_adjustment'], 'sort_order' => $optionData['sort_order']],
                );
            }
        }
    }
}
