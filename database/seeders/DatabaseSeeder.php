<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Default Admin User
        User::updateOrCreate(
            ['email' => 'admin@dnvite.com'],
            [
                'name' => 'Owner DNVITE',
                'password' => Hash::make('password123'),
                'is_admin' => true,
            ]
        );

        // Seed initial business settings and templates
        $this->call([
            SettingSeeder::class,
            TemplateSeeder::class,
        ]);
    }
}
