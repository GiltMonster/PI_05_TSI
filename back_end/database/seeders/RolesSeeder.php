<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        // Cria as roles principais
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $vet   = Role::firstOrCreate(['name' => 'vet']);
        $user  = Role::firstOrCreate(['name' => 'user']);

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
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Vincula permissões aos cargos
        $admin->givePermissionTo(Permission::all());
        $vet->givePermissionTo(['view pets', 'edit pets']);
        $user->givePermissionTo(['view pets', 'edit pets', 'manage pets', 'delete pets']);
    }
}
