<?php

namespace App\Http\Controllers;

use App\Models\ConsultaPet;
use App\Models\Vet;
use Illuminate\Http\Request;

class ConsultaPetController extends Controller
{
    public function novaConsulta(Request $request)
    {
        if (!$request->has(['pet_id', 'vet_id', 'data_consulta', 'tipo_consulta', 'anamnese'])) {
            return response()->json(['error' => 'Parâmetros insuficientes'], 400);
        }

        if (!is_numeric($request->input('pet_id')) || !is_numeric($request->input('vet_id'))) {
            return response()->json(['error' => 'IDs inválidos'], 400);
        }

        if (!strtotime($request->input('data_consulta'))) {
            return response()->json(['error' => 'Data de consulta inválida'], 400);
        }

        ConsultaPet::create([
            'pet_id' => $request->input('pet_id'),
            'vet_id' => $request->input('vet_id'),
            'data_consulta' => $request->input('data_consulta'),
            'tipo_consulta' => $request->input('tipo_consulta'),
            'anamnese' => $request->input('anamnese'),
        ]);

        return response()->json(['message' => 'Consulta registrada com sucesso'], 201);
    }
}
