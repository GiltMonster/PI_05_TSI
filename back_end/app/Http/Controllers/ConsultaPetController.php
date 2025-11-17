<?php

namespace App\Http\Controllers;

use App\Models\ConsultaPet;
use App\Models\Pet;
use App\Models\Servico;
use App\Models\Vet;
use Illuminate\Http\Request;

class ConsultaPetController extends Controller
{
    public function novaConsulta(Request $request)
    {
        if(Pet::find($request->input('pet_id')) === null){
            return response()->json(['error' => 'Pet não encontrado'], 404);
        }

        if (Vet::where('type', 'vet')->find($request->input('vet_id')) === null) {
            return response()->json(['error' => 'Veterinário não encontrado'], 404);
        }

        if(Servico::find($request->input('servico_id')) === null){
            return response()->json(['error' => 'Serviço não encontrado'], 404);
        }

        if (!$request->has(['pet_id', 'vet_id', 'data_consulta', 'servico_id', 'anamnese'])) {
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
            'servico_id' => $request->input('servico_id'),
            'data_consulta' => $request->input('data_consulta'),
            'anamnese' => $request->input('anamnese'),
        ]);

        return response()->json(['message' => 'Consulta registrada com sucesso'], 201);
    }

    public function editarConsulta(Request $request)
    {
        $validade = $request->validate([
            'id' => 'required|numeric',
            'pet_id' => 'sometimes|numeric',
            'vet_id' => 'sometimes|numeric',
            'servico_id' => 'sometimes|string',
            'data_consulta' => 'sometimes|date',
            'anamnese' => 'sometimes|string',
        ]);

        if ($validade['vet_id'] ?? false) {
            $vet = Vet::find($validade['vet_id']);
            if (!$vet) {
                return response()->json(['error' => 'Veterinário não encontrado'], 404);
            }
        }

        $consulta = ConsultaPet::find($request->input('id'));

        if (!$consulta) {
            return response()->json(['error' => 'Consulta não encontrada'], 404);
        }

        $consulta->update($validade);
        return response()->json(['message' => 'Consulta atualizada com sucesso'], 200);
    }

    function deletarConsulta($id)
    {

        if (!is_numeric($id)) {
            return response()->json(['error' => 'ID inválido'], 400);
        }

        $consulta = ConsultaPet::find($id);

        if (!$consulta) {
            return response()->json(['error' => 'Consulta não encontrada'], 404);
        }

        $consulta->delete();
    }
}
