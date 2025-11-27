<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use App\Models\PrescricaoPet;
use Illuminate\Http\Request;

class PrescricaoPetController extends Controller
{

    function listarPrescricoesPorPet($petId) {
        $prescricoes = PrescricaoPet::where('pet_id', $petId)->get();

        if ($prescricoes->isEmpty()) {
            return response()->json([
                'message' => 'Nenhuma prescrição encontrada para este pet.',
            ], 404);
        }

        if (!Pet::where('id', $petId)->exists()) {
            return response()->json([
                'message' => 'Pet não encontrado.',
            ], 404);
        }

        return response()->json([
            'prescricoes' => $prescricoes,
        ], 200);
    }

    function cadastrarPrescricao(Request $request) {
        $validate = $request->validate([
            'pet_id' => 'required|integer|exists:pets,id',
            'vet_id' => 'required|integer|exists:users,id',
            'data_prescricao' => 'required|date',
            'nome_medicamento' => 'required|string|max:255',
            'dosagem' => 'required|string|max:255',
            'farmacia' => 'nullable|string|max:255',
            'via' => 'required|string|max:100',
            'posologia' => 'required|string|max:500',
        ]);

        if (PrescricaoPet::where('pet_id', $validate['pet_id'])
            ->where('nome_medicamento', $validate['nome_medicamento'])
            ->where('data_prescricao', $validate['data_prescricao'])
            ->exists()) {
            return response()->json([
                'message' => 'Prescrição já cadastrada para este pet com o mesmo medicamento na mesma data.',
            ], 409);
        }

        if (!$validate) {
            return response()->json([
                'message' => 'Os dados fornecidos são inválidos.',
            ], 400);
        }

        $prescricao = PrescricaoPet::create($validate);

        return response()->json(
            $prescricao,
            201);
    }

    function atualizarPrescricao(Request $request){
        if (!PrescricaoPet::where('id', $request->id)->exists()) {
            return response()->json([
                'message' => 'Prescrição não encontrada.',
            ], 404);
        }

        $validate = $request->validate([
            'pet_id' => 'required|integer|exists:pets,id',
            'vet_id' => 'required|integer|exists:users,id',
            'data_prescricao' => 'required|date',
            'nome_medicamento' => 'required|string|max:255',
            'dosagem' => 'required|string|max:255',
            'farmacia' => 'nullable|string|max:255',
            'via' => 'required|string|max:100',
            'posologia' => 'required|string|max:500',
        ]);

        PrescricaoPet::where('id', $request->id)->update($validate);

        return response()->json(
            $validate,
            200
        );

    }

    function deletarPrescricao($id){
        if (!PrescricaoPet::where('id', $id)->exists()) {
            return response()->json([
                'message' => 'Prescrição não encontrada.',
            ], 404);
        }

        PrescricaoPet::where('id', $id)->delete();

        return response()->json([
            'message' => 'Prescrição deletada com sucesso!',
        ], 200);
    }

}
