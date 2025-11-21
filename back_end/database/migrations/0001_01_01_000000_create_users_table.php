<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // admin | vet | user
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');

            // Campos opcionais (vet e user)
            $table->string('phone')->nullable();
            $table->string('cep')->nullable();
            $table->string('endereco')->nullable();
            $table->string('cidade')->nullable();
            $table->string('estado')->nullable();
            $table->string('bairro')->nullable();
            $table->string('complemento')->nullable();
            $table->string('cpf')->nullable();

            // Campos exclusivos de veterinário
            $table->string('crmv')->nullable();
            $table->string('pix')->nullable();
            $table->string('especialidade_vet')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
