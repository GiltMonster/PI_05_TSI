<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/ping', function() {
    return response()->json(['message' => 'API funcionando!']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Protegidas por role
    Route::middleware(['role:admin'])->get('/admin/dashboard', function () {
        return response()->json(['msg' => 'Bem-vindo, Admin!'], 200);
    });

    Route::middleware(['role:admin|vet'])->get('/vet/dashboard', function () {
        return response()->json(['msg' => 'Bem-vindo, Veterinário!'], 200);
    });

    Route::middleware(['role:admin|user'])->get('/user/dashboard', function () {
        return response()->json(['msg' => 'Bem-vindo, Usuário!'], 200);
    });
});
