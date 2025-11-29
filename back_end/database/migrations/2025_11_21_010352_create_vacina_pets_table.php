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
        Schema::create('vacina_pets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pet_id')->constrained('pets')->onDelete('cascade');
            $table->foreignId('vet_id')->constrained('users')->onDelete('cascade');
            $table->date('data_vacinacao');
            $table->date('data_reforco');
            $table->string('dose_atual');
            $table->string('dose_total');
            $table->string('tipo_vacina');
            $table->string('fabricante');
            $table->string('observacoes')->nullable();
            $table->string('estado_vacina');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacina_pets');
    }
};
