<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use App\Models\VacinaPet;
use App\Models\Vet;
use Illuminate\Http\Request;

class VacinaPetController extends Controller
{
    function novaVacina(Request $request)
    {

        if (Pet::find($request->input('pet_id')) === null) {
            return response()->json(['error' => 'Animal não encontrado'], 404);
        }

        if (Vet::whereIn('type', ['vet', 'admin'])->find($request->input('vet_id')) === null) {
            return response()->json(['error' => 'Veterinário não encontrado'], 404);
        }

        if (!is_numeric($request->input('pet_id')) || !is_numeric($request->input('vet_id'))) {
            return response()->json(['error' => 'IDs inválidos'], 400);
        }

        $validate = $request->validate([
            'pet_id' => 'required|numeric',
            'vet_id' => 'required|numeric',
            'data_vacinacao' => 'required|date',
            'data_reforco' => 'required|date',
            'dose_atual' => 'required|string',
            'dose_total' => 'required|string',
            'tipo_vacina' => 'required|string',
            'fabricante' => 'required|string',
            'observacoes' => 'required|string',
            'estado_vacina' => 'required|string',
        ]);

        if (!$validate) {
            return response()->json(['error' => 'Parâmetros inválidos'], 400);
        }

        $vacina = VacinaPet::create([
            'pet_id' => $validate['pet_id'],
            'vet_id' => $validate['vet_id'],
            'data_vacinacao' => $validate['data_vacinacao'],
            'data_reforco' => $validate['data_reforco'],
            'dose_atual' => $validate['dose_atual'],
            'dose_total' => $validate['dose_total'],
            'tipo_vacina' => $validate['tipo_vacina'],
            'fabricante' => $validate['fabricante'],
            'observacoes' => $validate['observacoes'],
            'estado_vacina' => $validate['estado_vacina'],
        ]);
        return response()->json($vacina, 201);
    }

    function getVacinaById($id)
    {
        $vacina = VacinaPet::find($id);

        if (!$vacina) {
            return response()->json(['message' => 'Vacina não encontrada.'], 404);
        }

        return response()->json($vacina, 200);
    }

    function editarVacina(Request $request)
    {
        $validate = $request->validate([
            'id' => 'required|numeric',
            'pet_id' => 'sometimes|numeric',
            'vet_id' => 'sometimes|numeric',
            'data_vacinacao' => 'sometimes|date',
            'data_reforco' => 'sometimes|date',
            'dose_atual' => 'sometimes|string',
            'dose_total' => 'sometimes|string',
            'tipo_vacina' => 'sometimes|string',
            'fabricante' => 'sometimes|string',
            'observacoes' => 'sometimes|string',
            'estado_vacina' => 'sometimes|string',
        ]);

        $vacina = VacinaPet::find($request->input('id'));

        if (!$vacina) {
            return response()->json(['error' => 'Vacina não encontrada'], 404);
        }

        if (isset($validate['vet_id'])) {
            $vet = Vet::whereIn('type', ['vet', 'admin'])->find($request->input('vet_id'));
            if (!$vet) {
                return response()->json(['error' => 'Veterinário não encontrado'], 404);
            }

            $pet = Pet::find($validate['pet_id']);
            if (!$pet) {
                return response()->json(['error' => 'Animal não encontrado'], 404);
            }
        }

        $vacina->update($validate);
        $vacinaAtualizada = VacinaPet::find($vacina->id);
        return response()->json($vacinaAtualizada, 200);
    }

    function deletarVacina($id)
    {
        $vacina = VacinaPet::find($id);

        if (!$vacina) {
            return response()->json(['error' => 'Vacina não encontrada'], 404);
        }

        $vacina->delete();
        return response()->json(['message' => 'Vacina deletada com sucesso'], 200);
    }
}
