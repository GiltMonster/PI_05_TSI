<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {

        User::factory()->create([
            'type' => 'admin',
            'name' => 'Lucas',
            'email' => 'lucas@teste.com',
            'password' => bcrypt('123456'),
        ]);

        $this->call(RolesSeeder::class);

    }
}
