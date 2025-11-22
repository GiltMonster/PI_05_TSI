<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConsultaPet extends Model
{
    public $table = 'consulta_pets';

    protected $fillable = [
        'consulta_id',
        'pet_id',
        'vet_id',
        'servico_id',
        'data_consulta',
        'anamnese',
    ];

    public $timestamps = false;

    public function pet()
    {
        return $this->belongsTo(Pet::class, 'pet_id');
    }

    public function veterinario()
    {
        return $this->belongsTo(Vet::class, 'veterinario_id');
    }

    public function servico()
    {
        return $this->belongsTo(Servico::class, 'servico_id');
    }
}
