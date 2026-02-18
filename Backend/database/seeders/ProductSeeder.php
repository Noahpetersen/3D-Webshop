<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'name' => 'TrailBlazer Pro 29',
                'description' => 'Professional mountain bike with full suspension, 29-inch wheels, and carbon fiber frame. Perfect for aggressive trail riding.',
                'category_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Alpine Explorer X3',
                'description' => 'Hardtail mountain bike with hydraulic disc brakes and 27.5-inch wheels. Ideal for cross-country adventures.',
                'category_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'SpeedRacer Elite',
                'description' => 'Lightweight carbon road bike designed for speed. Features aerodynamic frame and Shimano 105 groupset.',
                'category_id' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Urban Commuter 700c',
                'description' => 'Sleek road bike perfect for city commuting. Equipped with puncture-resistant tires and integrated lights.',
                'category_id' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'PowerCruise E-Bike',
                'description' => 'Electric bike with 500W motor and 80km range. Features pedal assist and throttle mode for effortless riding.',
                'category_id' => 3,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'City Glide Electric',
                'description' => 'Stylish electric commuter bike with integrated battery, LED display, and comfortable upright riding position.',
                'category_id' => 3,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Thunder Mountain E-MTB',
                'description' => 'Electric mountain bike with powerful 750W motor, full suspension, and 100km range for epic trail rides.',
                'category_id' => 3,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Junior Adventure 20"',
                'description' => 'Durable kids mountain bike with 20-inch wheels, adjustable seat, and easy-to-use gears. Ages 6-10.',
                'category_id' => 4,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Little Racer 16"',
                'description' => 'Colorful beginner bike with training wheels, hand brakes, and sturdy steel frame. Perfect for ages 4-6.',
                'category_id' => 4,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Teen Sport 24"',
                'description' => 'Versatile youth bike with 24-inch wheels, 21-speed gearing, and front suspension. Ideal for ages 10-14.',
                'category_id' => 4,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
