<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    function editarAdmin(Request $request)
    {
        $user = Admin::find($request->id);

        if (!$user->hasRole('admin')) {
            return response()->json(['message' => 'Ação não autorizada.'], 403);
        }

        if (is_null($user)) {
            return response()->json(['message' => 'Admin não encontrado.'], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|min:6',
        ]);


        if (!empty($validated['password'])) { // Atualiza a senha somente se fornecida
            $user->password = bcrypt($validated['password']);
        }

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->cpf = $request->cpf;
        $user->phone = $request->phone;
        $user->cep = $request->cep;
        $user->endereco = $request->endereco;
        $user->cidade = $request->cidade;
        $user->estado = $request->estado;
        $user->bairro = $request->bairro;
        $user->complemento = $request->complemento;
        $user->save();

        return response()->json([
            'message' => 'Admin atualizado com sucesso'
        ], 200);
    }
}
