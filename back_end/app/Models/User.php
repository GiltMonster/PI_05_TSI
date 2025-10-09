<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{

    use HasFactory;

    protected $fillable = [
        'type',
        'name',
        'email',
        'password',
        'phone',
        'cep',
        'endereco',
        'cidade',
        'estado',
        'bairro',
        'complemento',
        'cpf',
        'crmv',
        'pix',
    ];

    protected $hidden = ['password'];

    // 🔹 Polimorfismo: decide qual classe usar conforme o campo "type"
    public function newFromBuilder($attributes = [], $connection = null)
    {
        $model = parent::newFromBuilder($attributes, $connection);

        switch ($model->type) {
            case 'admin':
                return (new Admin)->newFromBuilder($attributes, $connection);
            case 'vet':
                return (new Vet)->newFromBuilder($attributes, $connection);
            case 'user':
                return (new Client)->newFromBuilder($attributes, $connection);
            default:
                return $model;
        }
    }

    // Relação com pets (só usada no tipo "user")
    public function pets(): HasMany
    {
        return $this->hasMany(Pet::class);
    }

}
