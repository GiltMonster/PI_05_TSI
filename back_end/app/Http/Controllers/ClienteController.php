<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    function getClienteById($id) {
        $user = Cliente::where('type', 'user')->find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuário não encontrado.'], 404);
        }

        return response()->json($user, 200);
    }

    function getClientes() {
        $clientes = Cliente::where('type', 'user')->get();

        if (!$clientes) {
            return response()->json(['message' => 'Nenhum cliente encontrado.'], 404);
        }

        return response()->json($clientes, 200);
    }

    function editCliente(Request $request) {
        $newClienteData = $request;
        $cliente = Cliente::find($request->id);

        if (!$cliente) {
            return response()->json(['message' => 'Cliente não encontrado.'], 404);
        }

        if ($cliente->type != 'user') {
            return response()->json(['message' => 'O usuário especificado não é um cliente.'], 400);
        }

        if ($request->filled('password')){
            $cliente->password = bcrypt($request->password);
        }

        if ($cliente == $newClienteData) {
            return response()->json(['message' => 'Nenhuma alteração detectada nos dados do cliente.'], 200);
        }

        $cliente->name = $newClienteData->name;
        $cliente->email = $newClienteData->email;
        $cliente->password = bcrypt($newClienteData->password);
        $cliente->phone = $newClienteData->phone;
        $cliente->cep = $newClienteData->cep;
        $cliente->endereco = $newClienteData->endereco;
        $cliente->cidade = $newClienteData->cidade;
        $cliente->estado = $newClienteData->estado;
        $cliente->bairro = $newClienteData->bairro;
        $cliente->complemento = $newClienteData->complemento;
        $cliente->cpf = $newClienteData->cpf;
        $cliente->save();
        return response()->json(['message' => 'Dados do cliente atualizados com sucesso.'], 200);
    }

    function deleteCliente($id) {
        $cliente = Cliente::find($id);

        if (!$cliente) {
            return response()->json(['message' => 'Cliente não encontrado.'], 404);
        }

        if ($cliente->type != 'user') {
            return response()->json(['message' => 'O usuário especificado não é um cliente.'], 400);
        }

        $cliente->delete();
        return response()->json(['message' => 'Cliente deletado com sucesso.'], 200);
    }

}
