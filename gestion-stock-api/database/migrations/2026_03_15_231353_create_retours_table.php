<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up() {
    Schema::create('retours', function (Blueprint $table) {
        $table->id();
        $table->foreignId('transfert_id')->constrained('transferts')->onDelete('cascade');
        $table->integer('quantite');
        $table->date('date_retour');
        $table->text('motif')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('retours');
    }
};
