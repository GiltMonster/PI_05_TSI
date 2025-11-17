<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ConsultaPetController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\ServicoController;
use App\Http\Controllers\VetController;
use GuzzleHttp\Client;

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
        Route::put('/adm/editarAdmin', [AdminController::class, 'editarAdmin']);

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
        Route::get('/adm/getPetsByUserId/{user_id}', [PetController::class, 'getPetsByUserId']);
        Route::post('/adm/registrarPet', [PetController::class, 'registrarPet']);
        Route::put('/adm/editarPet', [PetController::class, 'editarPet']);
        Route::delete('/adm/deletarPet/{id}', [PetController::class, 'deletarPet']);

        Route::post('/adm/novaConsulta', [ConsultaPetController::class, 'novaConsulta']);
        Route::put('/adm/editarConsulta', [ConsultaPetController::class, 'editarConsulta']);
        Route::delete('/adm/deletarConsulta/{id}', [ConsultaPetController::class, 'deletarConsulta']);
    });

    Route::middleware(['role:admin|vet'])->group(function () {
        Route::get('/vet/getVetById/{id}', [VetController::class, 'getVetById']);
        Route::put('/vet/editarVet', [VetController::class, 'editarVet']);

        Route::get('/vet/getPetById/{id}', [PetController::class, 'getPetById']);
        Route::get('/vet/getAllTutors', [ClienteController::class, 'getClientes']);
        Route::get('/vet/getPets', [PetController::class, 'getPets']);
        Route::get('/vet/getPetsByUserId/{user_id}', [PetController::class, 'getPetsByUserId']);
        Route::post('/vet/registrarPet', [PetController::class, 'registrarPet']);
        Route::put('/vet/editarPet', [PetController::class, 'editarPet']);

        Route::post('/vet/novaConsulta', [ConsultaPetController::class, 'novaConsulta']);
        Route::put('/vet/editarConsulta', [ConsultaPetController::class, 'editarConsulta']);
        Route::delete('/vet/deletarConsulta/{id}', [ConsultaPetController::class, 'deletarConsulta']);
    });

    Route::middleware(['role:admin|user'])->group(function () {
        Route::get('/cliente/getClienteById/{id}', [ClienteController::class, 'getClienteById']);
        Route::put('/cliente/editarCliente', [ClienteController::class, 'editCliente']);

        Route::get('/cliente/getPetById/{id}', [PetController::class, 'getPetById']);
        Route::get('/cliente/getPetsByUserId/{user_id}', [PetController::class, 'getPetsByUserId']);
        Route::post('/cliente/registrarPet', [PetController::class, 'registrarPet']);
        Route::put('/cliente/editarPet', [PetController::class, 'editarPet']);
        Route::delete('/cliente/deletarPet/{id}', [PetController::class, 'deletarPet']);
    });

    Route::middleware(['role:admin|vet|user'])->group(function () {
        Route::get('/servico/all', [ServicoController::class, 'listarServicos']);
        Route::get('/servico/{id}', [ServicoController::class, 'getServicoById']);
        Route::post('/servico/novo', [ServicoController::class, 'criarServico']);
        Route::put('/servico/editar', [ServicoController::class, 'editarServico']);
        Route::delete('/servico/deletar/{id}', [ServicoController::class, 'deletarServico']);
    });

});
