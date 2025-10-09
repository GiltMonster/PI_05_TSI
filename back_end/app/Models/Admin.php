<?php

namespace App\Models;

class Admin extends User
{
    protected $attributes = [
        'type' => 'admin',
    ];


}

