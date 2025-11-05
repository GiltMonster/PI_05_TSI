<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    protected $table = 'pets';
    protected $fillable = [
        'user_id',
        'nome',
        'especie',
        'raca',
        'ano_nascimento',
        'sexo',
        'peso',
        'castrado',
        'temperamento',
        'cor_pelagem',
        'caso_clinico'
    ];

    public $timestamps = false;

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'id');
    }

}
