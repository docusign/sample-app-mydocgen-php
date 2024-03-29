<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ManagerSeeder::class);
        $this->call(Scenario1TemplateSeeder::class);
        $this->call(Scenario2TemplateSeeder::class);
        $this->call(Scenario3TemplateSeeder::class);
    }
}
