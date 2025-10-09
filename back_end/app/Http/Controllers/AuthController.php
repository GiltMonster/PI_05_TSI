<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;
use App\Models\Vet;
use App\Models\Client;
use App\Models\User;

use const Dom\NOT_FOUND_ERR;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validated = $request->validate([
                'type' => 'required|in:admin,vet,user',
                'name' => 'required|string',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
            ]);

            switch ($validated['type']) {
                case 'admin':
                    $user = Admin::create([
                        'name' => $validated['name'],
                        'email' => $validated['email'],
                        'password' => bcrypt($validated['password']),
                    ]);
                    $user->assignRole('admin');
                    break;

                case 'vet':
                    $user = Vet::create([
                        'name' => $validated['name'],
                        'email' => $validated['email'],
                        'password' => bcrypt($validated['password']),
                        'crmv' => $request->crmv,
                        'chave_pix' => $request->chave_pix,
                        'cpf' => $request->cpf,
                        'phone' => $request->phone,
                    ]);
                    $user->assignRole('vet');
                    break;

                case 'user':
                    $user = Client::create([
                        'name' => $validated['name'],
                        'email' => $validated['email'],
                        'password' => bcrypt($validated['password']),
                        'cpf' => $request->cpf,
                        'phone' => $request->phone,
                    ]);
                    $user->assignRole('user');
                    break;
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Usuário registrado com sucesso',
                'user' => $user,
                'token' => $token,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            $error = $e->errors();
            $error_msg = "";
            if (isset($error['email'])) {
                $error_msg = "O email já está em uso.";
            }else{
                $error_msg = "Erro de validação.";
            }

            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $error_msg,
            ], 422);
        } catch (\Spatie\Permission\Exceptions\RoleDoesNotExist $e) {
            return response()->json([
                'message' => 'O papel informado não existe. Contate o administrador.',
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao registrar usuário',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user) {
            return response()->json(['message' => 'Senha ou Email incorretos !!!'], 404);
        }

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login bem-sucedido',
            'user' => $user,
            'token' => $token,
            'role' => $user->getRoleNames(),
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logout efetuado com sucesso']);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'user' => $user,
            'roles' => $user->getRoleNames(),
            'permissions' => $user->getAllPermissions()->pluck('name'),
        ]);
    }
}
