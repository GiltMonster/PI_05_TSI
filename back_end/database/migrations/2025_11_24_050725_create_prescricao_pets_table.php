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
        Schema::create('prescricao_pets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pet_id')->constrained('pets')->onDelete('cascade');
            $table->foreignId('vet_id')->constrained('users')->onDelete('cascade');
            $table->date('data_prescricao');
            $table->string('nome_medicamento');
            $table->string('dosagem');
            $table->string('farmacia');
            $table->string('via');
            $table->text('posologia');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescricao_pets');
    }
};
