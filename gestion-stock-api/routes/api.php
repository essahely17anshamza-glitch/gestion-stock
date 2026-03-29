<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\BureauController;
use App\Http\Controllers\FonctionnaireController;
use App\Http\Controllers\TransfertController;
use App\Http\Controllers\RetourController;

// Auth
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    // Categories
    Route::get('/categories', [CategorieController::class, 'index']);
    Route::post('/categories', [CategorieController::class, 'store']);
    Route::put('/categories/{id}', [CategorieController::class, 'update']);
    Route::delete('/categories/{id}', [CategorieController::class, 'destroy']);

    // Articles
    Route::get('/categories/{categorie_id}/articles', [ArticleController::class, 'index']);
    Route::post('/articles', [ArticleController::class, 'store']);
    Route::put('/articles/{id}', [ArticleController::class, 'update']);
    Route::delete('/articles/{id}', [ArticleController::class, 'destroy']);
    Route::get('/articles/search', [ArticleController::class, 'search']);

    // Bureaux
    Route::get('/bureaux', [BureauController::class, 'index']);
    Route::post('/bureaux', [BureauController::class, 'store']);
    Route::put('/bureaux/{id}', [BureauController::class, 'update']);
    Route::delete('/bureaux/{id}', [BureauController::class, 'destroy']);

    // Fonctionnaires
    Route::get('/fonctionnaires', [FonctionnaireController::class, 'index']);
    Route::post('/fonctionnaires', [FonctionnaireController::class, 'store']);
    Route::put('/fonctionnaires/{id}', [FonctionnaireController::class, 'update']);
    Route::delete('/fonctionnaires/{id}', [FonctionnaireController::class, 'destroy']);
    Route::get('/fonctionnaires/search', [FonctionnaireController::class, 'search']);

    // Transferts
    Route::get('/articles/{article_id}/transferts', [TransfertController::class, 'index']);
    Route::post('/transferts', [TransfertController::class, 'store']);
    Route::delete('/transferts/{id}', [TransfertController::class, 'destroy']);

    // Retours
    Route::post('/retours', [RetourController::class, 'store']);
});
