<?php

namespace App\Http\Controllers;

use App\Models\ConsultaPet;
use App\Models\Pet;
use App\Models\PrescricaoPet;
use App\Models\Servico;
use App\Models\User;
use App\Models\VacinaPet;
use Illuminate\Http\Request;

class PetController extends Controller
{

    function getPetById($id)
    {
        $pet = Pet::find($id);

        if (!$pet) {
            return response()->json(['message' => 'Pet não encontrado.'], 404);
        }

        return response()->json($pet, 200);
    }

    function getPetsByUserId($user_id)
    {
        $user = User::find($user_id);
        if (!$user) {
            return response()->json(['message' => 'Usuário não encontrado.'], 404);
        }

        $pets = Pet::where('user_id', $user_id)->get();

        if ($pets->isEmpty()) {
            return response()->json(['message' => 'Nenhum pet encontrado para este usuário.'], 404);
        }

        $consultas = ConsultaPet::whereIn('pet_id', $pets->pluck('id'))->get();

        foreach ($consultas as $consulta) {
            $vet = User::find($consulta->vet_id);
            if ($vet) {
                $consulta->nome_vet = $vet->name;
            }

            $servico = Servico::find($consulta->servico_id);
            if ($servico) {
                $consulta->nome_servico = $servico->nome;
                $consulta->categoria_servico = $servico->categoria;
            }
        }

        $vacinas = VacinaPet::whereIn('pet_id', $pets->pluck('id'))->get();

        foreach ($vacinas as $vacina) {
            $vet = User::find($vacina->vet_id);
            if ($vet) {
                $vacina->nome_vet = $vet->name;
            }
        }

        $prescricoes =  PrescricaoPet::whereIn('pet_id', $pets->pluck('id'))->get();

        $anexos = FileController::getListAnexos();

        foreach ($prescricoes as $prescricao) {
            $vet = User::find($prescricao->vet_id);
            if ($vet) {
                $prescricao->nome_vet = $vet->name;
            }

            if (isset($anexos)) {
                foreach ($anexos->original as $fileName) {
                    $filteredAnexo = str_starts_with($fileName, $prescricao->pet_id . '_' . $prescricao->id . '_');
                    if ($filteredAnexo) {
                        $prescricao->anexoUrl = url('/api/file/download/' . $fileName);
                        break;
                    }
                }
            } else {
                $prescricao->anexoUrl = '';
            }
        }


        foreach ($pets as $pet) {
            $pet->consultas = $consultas->where('pet_id', $pet->id)->values();
            $pet->vacinas = $vacinas->where('pet_id', $pet->id)->values();
            $pet->prescricoes = $prescricoes->where('pet_id', $pet->id)->values();
        }

        return response()->json([
            'tutor_name' => $user->name,
            'pets' => $pets,
            // 'consultas' => $consultas
        ], 200);
    }

    function getPets()
    {
        $pets = Pet::all();

        if ($pets->isEmpty()) {
            return response()->json(['message' => 'Nenhum pet encontrado.'], 404);
        }

        foreach ($pets as $pet) {
            $user = User::find($pet->user_id);
            if ($user) {
                $pet->tutor_name = $user->name;
            }
        }

        return response()->json($pets, 200);
    }

    function registrarPet(Request $request)
    {
        $pet = new Pet();

        if (!User::find($request->user_id)) {
            return response()->json(['message' => 'Usuário não encontrado.'], 404);
        }

        // $validatedData = $request->validate([
        //     'user_id' => 'required|integer',
        //     'nome' => 'required|string|max:255',
        //     'especie' => 'required|string|max:100',
        //     'raca' => 'required|string|max:100',
        //     'ano_nascimento' => 'required|integer',
        //     'peso' => 'required|numeric',
        //     'castrado' => 'required|boolean',
        //     'temperamento' => 'nullable|string|max:255',
        //     'cor_pelagem' => 'nullable|string|max:100',
        //     'caso_clinico' => 'nullable|string|max:500'
        // ]);

        // if (!$validatedData) {
        //     return response()->json(['message' => 'Dados inválidos para o pet.'], 400);
        // }

        if (!$request->nome || !$request->especie || !$request->raca || !$request->ano_nascimento || !$request->peso || !isset($request->castrado)) {
            return response()->json(['message' => 'Dados obrigatórios do pet estão faltando.'], 400);
        }

        $pet->user_id = $request->user_id;
        $pet->nome = $request->nome;
        $pet->especie = $request->especie;
        $pet->raca = $request->raca;
        $pet->ano_nascimento = $request->ano_nascimento;
        $pet->sexo = $request->sexo;
        $pet->peso = $request->peso;
        $pet->castrado = $request->castrado;
        $pet->temperamento = $request->temperamento;
        $pet->cor_pelagem = $request->cor_pelagem;
        $pet->caso_clinico = $request->caso_clinico;

        $pet->save();

        return response()->json(['message' => 'Pet registrado com sucesso!', 'pet' => $pet], 201);
    }

    function editarPet(Request $request)
    {
        $pet = Pet::find($request->id);

        if (!$pet) {
            return response()->json(['message' => 'Pet não encontrado.'], 404);
        }

        if (!$request->nome || !$request->especie || !$request->raca || !$request->ano_nascimento || !$request->peso || !isset($request->castrado)) {
            return response()->json(['message' => 'Dados obrigatórios do pet estão faltando.'], 400);
        }

        // $validatedData = $request->validate([
        //     'user_id' => 'sometimes|integer',
        //     'nome' => 'sometimes|string|max:255',
        //     'especie' => 'sometimes|string|max:100',
        //     'raca' => 'sometimes|string|max:100',
        //     'ano_nascimento' => 'sometimes|integer',
        //     'peso' => 'sometimes|numeric',
        //     'castrado' => 'sometimes|boolean',
        //     'temperamento' => 'nullable|string|max:255',
        //     'cor_pelagem' => 'nullable|string|max:100',
        //     'caso_clinico' => 'nullable|string|max:500'
        // ]);

        // if (!$validatedData) {
        //     return response()->json(['message' => 'Dados inválidos para o pet.'], 400);
        // }


        $pet->user_id = $request->user_id ?? $pet->user_id;
        $pet->nome = $request->nome ?? $pet->nome;
        $pet->especie = $request->especie ?? $pet->especie;
        $pet->raca = $request->raca ?? $pet->raca;
        $pet->ano_nascimento = $request->ano_nascimento ?? $pet->ano_nascimento;
        $pet->sexo = $request->sexo ?? $pet->sexo;
        $pet->peso = $request->peso ?? $pet->peso;
        $pet->castrado = $request->castrado ?? $pet->castrado;
        $pet->temperamento = $request->temperamento ?? $pet->temperamento;
        $pet->cor_pelagem = $request->cor_pelagem ?? $pet->cor_pelagem;
        $pet->caso_clinico = $request->caso_clinico ?? $pet->caso_clinico;

        $pet->save();

        return response()->json(['message' => 'Dados do pet atualizados com sucesso.', 'pet' => $pet], 200);
    }

    function deletarPet($id)
    {
        $pet = Pet::find($id);

        if (!$pet) {
            return response()->json(['message' => 'Pet não encontrado.'], 404);
        }

        $pet->delete();

        return response()->json(['message' => 'Pet deletado com sucesso.'], 200);
    }
}
