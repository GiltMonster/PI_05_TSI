<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use Illuminate\Http\Request;

class PetController extends Controller
{

    function getPetById($id) {
        $pet = Pet::find($id);

        if (!$pet) {
            return response()->json(['message' => 'Pet não encontrado.'], 404);
        }

        return response()->json($pet, 200);
    }

    function getPetByUserId($user_id) {
        $pets = Pet::where('user_id', $user_id)->get();

        if ($pets->isEmpty()) {
            return response()->json(['message' => 'Nenhum pet encontrado para este usuário.'], 404);
        }

        return response()->json($pets, 200);
    }

    function getPets() {
        $pets = Pet::all();

        if ($pets->isEmpty()) {
            return response()->json(['message' => 'Nenhum pet encontrado.'], 404);
        }

        return response()->json($pets, 200);
    }

    function registrarPet(Request $request) {
        $pet = new Pet();

        $validatedData = $request->validate([
            'user_id' => 'required|integer',
            'nome' => 'required|string|max:255',
            'especie' => 'required|string|max:100',
            'raca' => 'required|string|max:100',
            'idade' => 'required|integer',
            'peso' => 'required|numeric',
            'castrado' => 'required|boolean',
            'temperamento' => 'nullable|string|max:255',
            'cor_pelagem' => 'nullable|string|max:100',
            'caso_clinico' => 'nullable|string|max:500'
        ]);

        if (!$validatedData) {
            return response()->json(['message' => 'Dados inválidos para o pet.'], 400);
        }

        $pet->user_id = $request->user_id;
        $pet->nome = $request->nome;
        $pet->especie = $request->especie;
        $pet->raca = $request->raca;
        $pet->idade = $request->idade;
        $pet->sexo = $request->sexo;
        $pet->peso = $request->peso;
        $pet->castrado = $request->castrado;
        $pet->temperamento = $request->temperamento;
        $pet->cor_pelagem = $request->cor_pelagem;
        $pet->caso_clinico = $request->caso_clinico;

        $pet->save();

        return response()->json(['message' => 'Pet registrado com sucesso!', 'pet' => $pet], 201);
    }

    function editarPet(Request $request) {
        $pet = Pet::find($request->id);

        if (!$pet) {
            return response()->json(['message' => 'Pet não encontrado.'], 404);
        }

        $validatedData = $request->validate([
            'user_id' => 'sometimes|integer',
            'nome' => 'sometimes|string|max:255',
            'especie' => 'sometimes|string|max:100',
            'raca' => 'sometimes|string|max:100',
            'idade' => 'sometimes|integer',
            'peso' => 'sometimes|numeric',
            'castrado' => 'sometimes|boolean',
            'temperamento' => 'nullable|string|max:255',
            'cor_pelagem' => 'nullable|string|max:100',
            'caso_clinico' => 'nullable|string|max:500'
        ]);

        if (!$validatedData) {
            return response()->json(['message' => 'Dados inválidos para o pet.'], 400);
        }

        $pet->user_id = $request->user_id ?? $pet->user_id;
        $pet->nome = $request->nome ?? $pet->nome;
        $pet->especie = $request->especie ?? $pet->especie;
        $pet->raca = $request->raca ?? $pet->raca;
        $pet->idade = $request->idade ?? $pet->idade;
        $pet->sexo = $request->sexo ?? $pet->sexo;
        $pet->peso = $request->peso ?? $pet->peso;
        $pet->castrado = $request->castrado ?? $pet->castrado;
        $pet->temperamento = $request->temperamento ?? $pet->temperamento;
        $pet->cor_pelagem = $request->cor_pelagem ?? $pet->cor_pelagem;
        $pet->caso_clinico = $request->caso_clinico ?? $pet->caso_clinico;

        $pet->save();

        return response()->json(['message' => 'Dados do pet atualizados com sucesso.', 'pet' => $pet], 200);
    }

    function deletarPet($id){
        $pet = Pet::find($id);

        if (!$pet) {
            return response()->json(['message' => 'Pet não encontrado.'], 404);
        }

        $pet->delete();

        return response()->json(['message' => 'Pet deletado com sucesso.'], 200);
    }

}
