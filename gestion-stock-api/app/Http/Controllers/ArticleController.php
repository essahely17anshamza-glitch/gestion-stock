<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index($categorie_id)
    {
        $articles = Article::where('categorie_id', $categorie_id)->get()->map(function ($a) {
            return [
                'id' => $a->id,
                'nom' => $a->nom,
                'description' => $a->description,
                'reference_bc_ao' => $a->reference_bc_ao,
                'quantite_entree' => $a->quantite_entree,
                'date_entree' => $a->date_entree,
                'quantite_sortie' => $a->getQuantiteSortie(),
                'stock_restant' => $a->getStockRestant(),
                'disponibilite' => $a->getDisponibilite(),
            ];
        });
        return response()->json($articles);
    }

    public function store(Request $request)
    {
        $request->validate([
            'categorie_id' => 'required|exists:categories,id',
            'nom' => 'required|string',
            'reference_bc_ao' => 'required|string',
            'quantite_entree' => 'required|integer|min:1',
            'date_entree' => 'required|date',
        ]);
        $article = Article::create($request->all());
        return response()->json($article, 201);
    }

    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);
        $article->update($request->all());
        return response()->json($article);
    }

    public function destroy($id)
    {
        Article::findOrFail($id)->delete();
        return response()->json(['message' => 'Article supprimé']);
    }

    public function search(Request $request)
    {
        $query = $request->get('q');
        $articles = Article::where('nom', 'like', "%$query%")->with('categorie')->get()->map(function ($a) {
            return [
                'id' => $a->id,
                'nom' => $a->nom,
                'categorie' => $a->categorie->nom,
                'stock_restant' => $a->getStockRestant(),
                'disponibilite' => $a->getDisponibilite(),
            ];
        });
        return response()->json($articles);
    }
}
