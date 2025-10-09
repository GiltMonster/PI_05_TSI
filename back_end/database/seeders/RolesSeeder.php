<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        $admin = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'api']);
        $vet   = Role::firstOrCreate(['name' => 'vet', 'guard_name' => 'api']);
        $user  = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'api']);

        // Exemplo de permissões
        $permissions = [
            'manage users',
            'manage vets',
            'manage pets',
            'view pets',
            'edit pets',
            'delete pets',
            'approve vets',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'api']);
        }

        // Vincula permissões aos cargos
        $admin->givePermissionTo(Permission::all());
        $vet->givePermissionTo(['view pets', 'edit pets']);
        $user->givePermissionTo(['view pets', 'edit pets', 'manage pets', 'delete pets']);
    }
}
