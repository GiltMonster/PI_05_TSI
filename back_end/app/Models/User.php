<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{

    use HasFactory, HasRoles, HasApiTokens;

    protected $table = 'users';
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

    protected $guard_name = 'api';
    public $timestamps = false;

    protected $hidden = ['password', 'remember_token'];

    public function newFromBuilder($attributes = [], $connection = null)
    {
        $model = parent::newFromBuilder($attributes, $connection);

        if (get_class($this) === self::class) {
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

        return $model;
    }

}
