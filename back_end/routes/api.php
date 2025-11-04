<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\VetController;

Route::get('/ping', function () {
    return response()->json(['message' => 'API funcionando!']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/verifyToken', [AuthController::class, 'verifyToken']);
    Route::get('/myType', [AuthController::class, 'myType']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Protegidas por role
    Route::middleware(['role:admin'])->group(function () {
        Route::get('/adm/getVets', [VetController::class, 'getVets']);
        Route::get('/adm/getVetById/{id}', [VetController::class, 'getVetById']);
        Route::put('/adm/editarVet', [VetController::class, 'editarVet']);
        Route::delete('/adm/deletarVet/{id}',  [VetController::class, 'deletarVet']);
        Route::get('/adm/getClientes', [ClienteController::class, 'getClientes']);

        Route::get('/adm/getClienteById/{id}', [ClienteController::class, 'getClienteById']);
        Route::put('/adm/editarCliente', [ClienteController::class, 'editCliente']);
        Route::delete('/adm/deletarCliente/{id}', [ClienteController::class, 'deleteCliente']);

        Route::get('/adm/getPets', [PetController::class, 'getPets']);
        Route::get('/adm/getPetById/{id}', [PetController::class, 'getPetById']);
        Route::get('/adm/getPetByUserId/{user_id}', [PetController::class, 'getPetByUserId']);
        Route::post('/adm/registrarPet', [PetController::class, 'registrarPet']);
        Route::put('/adm/editarPet', [PetController::class, 'editarPet']);
        Route::delete('/adm/deletarPet/{id}', [PetController::class, 'deletarPet']);
    });

    Route::middleware(['role:admin|vet'])->group(function () {
        Route::get('/vet/getVetById/{id}', [VetController::class, 'getVetById']);
        Route::put('/vet/editarVet', [VetController::class, 'editarVet']);
        Route::post('/vet/registrarPet', [PetController::class, 'registrarPet']);
    });

    Route::middleware(['role:admin|user'])->group(function () {
        Route::get('/cliente/getClienteById/{id}', [ClienteController::class, 'getClienteById']);
        Route::put('/cliente/editarCliente', [ClienteController::class, 'editCliente']);

        Route::get('/cliente/getPetById/{id}', [PetController::class, 'getPetById']);
        Route::get('/cliente/getPetByUserId/{user_id}', [PetController::class, 'getPetByUserId']);
        Route::post('/cliente/registrarPet', [PetController::class, 'registrarPet']);
        Route::put('/cliente/editarPet', [PetController::class, 'editarPet']);
        Route::delete('/cliente/deletarPet/{id}', [PetController::class, 'deletarPet']);
    });
});
