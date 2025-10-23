<?php

namespace App\Http\Controllers;

use App\Models\Vet;
use Illuminate\Http\Request;

class VetController extends Controller
{
    function getVets()
    {
        $vets = Vet::where('type', 'vet')->get();
        return response()->json($vets, 200);
    }

    function getVetById($id) {
        $vet = Vet::where('type', 'vet')->find($id);
        if (!$vet) {
            return response()->json(['message' => 'Veterinário não encontrado.'], 404);
        }

        return response()->json($vet, 200);

    }

    public function editarVet(Request $request)
    {
        $newVetData = $request;
        $vet = Vet::find($request->id);

        if (!$vet) {
            return response()->json(['message' => 'Veterinário não encontrado.'], 404);
        }

        if($vet->type != 'vet') {
            return response()->json(['message' => 'O usuário especificado não é um veterinário.'], 400);
        }

        if ($request->filled('password')){
            $vet->password = bcrypt($request->password);
            if ($vet->password === $newVetData->password) {
                return response()->json(['message' => 'A nova senha não pode ser igual à senha atual.'], 400);
            }
        }

        if ($vet == $newVetData) {
            return response()->json(['message' => 'Nenhuma alteração detectada nos dados do veterinário.'], 200);
        }

        $vet->name = $newVetData->name;
        $vet->email = $newVetData->email;
        $vet->password = bcrypt($newVetData->password);
        $vet->phone = $newVetData->phone;
        $vet->cep = $newVetData->cep;
        $vet->endereco = $newVetData->endereco;
        $vet->cidade = $newVetData->cidade;
        $vet->estado = $newVetData->estado;
        $vet->bairro = $newVetData->bairro;
        $vet->complemento = $newVetData->complemento;
        $vet->cpf = $newVetData->cpf;
        $vet->crmv = $newVetData->crmv;
        $vet->pix = $newVetData->pix;
        $vet->save();
        return response()->json(['message' => 'Dados do veterinário atualizados com sucesso.'], 200);
    }

    function deletarVet($id)
    {
        $vet = Vet::find($id);

        if (!$vet) {
            return response()->json(['message' => 'Veterinário não encontrado.'], 404);
        }

        if($vet->type != 'vet') {
            return response()->json(['message' => 'O usuário especificado não é um veterinário.'], 400);
        }

        $vet->delete();
        return response()->json(['message' => 'Veterinário deletado com sucesso.'], 200);
    }
}
