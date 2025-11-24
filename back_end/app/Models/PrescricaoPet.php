<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrescricaoPet extends Model
{
    protected $table = 'prescricao_pets';

    protected $fillable = [
        'pet_id',
        'vet_id',
        'data_prescricao',
        'nome_medicamento',
        'dosagem',
        'farmacia',
        'via',
        'posologia',
    ];

    public $timestamps = false;

    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }

    public function vet()
    {
        return $this->belongsTo(User::class, 'vet_id');
    }
}
