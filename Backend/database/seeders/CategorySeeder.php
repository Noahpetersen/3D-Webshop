<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            ['name' => 'Mountain Bikes', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Road Bikes', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Electric Bikes', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Kids Bikes', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
