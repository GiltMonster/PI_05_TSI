<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Servico extends Model
{
    public $table = 'servicos';
    protected $fillable = [
        'nome',
        'categoria',
        'preco',
    ];

    public $timestamps = false;

}
