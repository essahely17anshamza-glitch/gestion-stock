<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    public function index()
    {
        $categories = Categorie::all()->map(function ($cat) {
            return [
                'id' => $cat->id,
                'nom' => $cat->nom,
                'nombre_articles' => $cat->getNombreArticles(),
                'pieces_entrees' => $cat->getPiecesEntrees(),
                'pieces_sortantes' => $cat->getPiecesSortantes(),
                'total_stock' => $cat->getTotalStock(),
            ];
        });
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $request->validate(['nom' => 'required|string']);
        $categorie = Categorie::create($request->only('nom'));
        return response()->json($categorie, 201);
    }

    public function update(Request $request, $id)
    {
        $categorie = Categorie::findOrFail($id);
        $request->validate(['nom' => 'required|string']);
        $categorie->update($request->only('nom'));
        return response()->json($categorie);
    }

    public function destroy($id)
    {
        Categorie::findOrFail($id)->delete();
        return response()->json(['message' => 'Catégorie supprimée']);
    }
}
