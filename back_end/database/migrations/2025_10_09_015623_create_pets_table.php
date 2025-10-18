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
        Schema::create('pets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('nome');
            $table->string('especie'); // cachorro, gato, etc
            $table->string('raca')->nullable();
            $table->integer('idade')->nullable();
            $table->boolean('sexo')->nullable();
            $table->boolean('peso')->nullable();
            $table->boolean('castrado')->nullable();
            $table->string('temperamento')->nullable();
            $table->string('cor_pelagem')->nullable();
            $table->text('caso_clinico')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};
