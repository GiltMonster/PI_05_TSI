<?php

namespace App\Http\Controllers;

use App\Models\Servico;
use Illuminate\Http\Request;

class ServicoController extends Controller
{

    public function listarServicos()
    {
        $servicos = Servico::all();

        if ($servicos->isEmpty()) {
            return response()->json(['message' => 'Nenhum serviço encontrado'], 404);
        }

        return response()->json($servicos, 200);
    }

    public function getServicoById($id)
    {
        $servico = Servico::find($id);

        if (!$servico) {
            return response()->json(['error' => 'Serviço não encontrado'], 404);
        }

        return response()->json($servico, 200);
    }

    public function criarServico(Request $request)
    {
        $validatedData = $request->validate([
            'nome' => 'required|string|max:255',
            'categoria' => 'required|string|max:255',
            'preco' => 'required|numeric',
        ]);

        if (Servico::where('nome', $validatedData['nome'])->exists()) {
            return response()->json(['error' => 'Serviço com esse nome já existe'], 409);
        }

        if (empty($validatedData['nome'])) {
            return response()->json(['error' => 'O nome não pode ser vazio'], 400);
        }

        if (empty($validatedData['categoria'])) {
            return response()->json(['error' => 'A categoria não pode ser vazia'], 400);
        }

        if ($validatedData['preco'] < 0) {
            return response()->json(['error' => 'O preço não pode ser negativo'], 400);
        }
        $servico = Servico::create($validatedData);

        return response()->json($servico, 201);
    }

    public function editarServico(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|numeric',
            'nome' => 'sometimes|string|max:255',
            'categoria' => 'sometimes|string|max:255',
            'preco' => 'sometimes|numeric',
        ]);

        $servico = Servico::find($validatedData['id']);

        if (!$servico) {
            return response()->json(['error' => 'Serviço não encontrado'], 404);
        }

        $servico->update($validatedData);
        return response()->json($servico, 200);
    }

    public function deletarServico($id)
    {
        if (!is_numeric($id)) {
            return response()->json(['error' => 'ID inválido'], 400);
        }

        $servico = Servico::find($id);

        if (!$servico) {
            return response()->json(['error' => 'Serviço não encontrado'], 404);
        }

        $servico->delete();
        return response()->json(['message' => 'Serviço deletado com sucesso'], 200);
    }
}
