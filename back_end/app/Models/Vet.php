<?php

namespace App\Models;

class Vet extends User
{
    protected $table = 'users';
    public $timestamps = false;
    protected $attributes = [
        'type' => 'vet',
    ];

}
