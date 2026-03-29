<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('transferts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('article_id')->constrained('articles')->onDelete('cascade');
            $table->foreignId('bureau_id')->constrained('bureaux')->onDelete('cascade');
            $table->foreignId('fonctionnaire_id')->constrained('fonctionnaires')->onDelete('cascade');
            $table->integer('quantite');
            $table->date('date_transfert');
            $table->text('remarques')->nullable();
            $table->string('reference_br')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transferts');
    }
};
