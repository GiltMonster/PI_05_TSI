<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;

class Cliente extends User
{
    protected $table = 'users';
    protected $attributes = [
        'type' => 'user',
    ];

    public $timestamps = false;

    // Um cliente pode ter vários pets
    public function pets(): HasMany
    {
        return $this->hasMany(Pet::class, 'user_id');
    }
}
