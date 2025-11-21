<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VacinaPet extends Model
{
    protected $table = 'vacina_pets';

    protected $fillable = [
        'pet_id',
        'vet_id',
        'data_vacinacao',
        'data_reforco',
        'dose_atual',
        'dose_total',
        'tipo_vacina',
        'fabricante',
        'observacoes',
        'estado_vacina',
    ];

    public $timestamps = false;

    public function pet()
    {
        return $this->belongsTo(Pet::class, 'pet_id');
    }

    public function vet()
    {
        return $this->belongsTo(User::class, 'vet_id');
    }
}
