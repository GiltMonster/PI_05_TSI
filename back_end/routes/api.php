<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VetController;
use App\Models\User;

Route::get('/ping', function() {
    return response()->json(['message' => 'API funcionando!']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Protegidas por role
    Route::middleware(['role:admin'])->group(function () {
        Route::get('/adm/getVets', [VetController::class, 'getVets']);
        Route::get('/adm/getVetById/{id}', [VetController::class, 'getVetById']);
        Route::put('/adm/editarVet', [VetController::class, 'editarVet']);
        Route::delete('/adm/deletarVet/{id}',  [VetController::class, 'deletarVet']);

    });

    Route::middleware(['role:admin|vet'])->get('/vet/teste', function () {
        return response()->json(['msg' => 'Bem-vindo, Veterinário!'], 200);
    });

    Route::middleware(['role:admin|user'])->get('/user/teste', function () {
        return response()->json(['msg' => 'Bem-vindo, Usuário!'], 200);
    });
});
