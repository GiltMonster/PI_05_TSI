<?php

namespace App\Models;

class Admin extends User
{
    protected $table = 'users';
    public $timestamps = false;
    protected $attributes = [
        'type' => 'admin',
    ];

}
