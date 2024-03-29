<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ManagerSeeder extends Seeder
{
    /**
     * Seed the managers
     *
     * @return void
     */
    public function run()
    {
        $login   = config('settings.manager_login');
        $manager = User::where('email', $login)->first();

        if (!$manager) {
            User::create([
                'name'     => 'Manager',
                'email'    => $login,
                'password' => Hash::make(config('settings.manager_password')),
            ]);
        }
    }
}
