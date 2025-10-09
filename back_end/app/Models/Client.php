<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends User
{
    protected $attributes = [
        'type' => 'user',
    ];

    // Um cliente pode ter vários pets
    public function pets(): HasMany
    {
        return $this->hasMany(Pet::class, 'user_id');
    }
}

