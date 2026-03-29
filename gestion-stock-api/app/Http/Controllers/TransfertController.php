<?php

namespace App\Http\Controllers;

use App\Models\Transfert;
use Illuminate\Http\Request;

class TransfertController extends Controller
{
    public function index($article_id)
    {
        $transferts = Transfert::where('article_id', $article_id)
            ->with(['bureau', 'fonctionnaire', 'retour'])
            ->get();
        return response()->json($transferts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'article_id' => 'required|exists:articles,id',
            'bureau_id' => 'required|exists:bureaux,id',
            'fonctionnaire_id' => 'required|exists:fonctionnaires,id',
            'quantite' => 'required|integer|min:1',
            'date_transfert' => 'required|date',
        ]);

        $data = $request->all();
        $data['reference_br'] = Transfert::genererReference();

        $transfert = Transfert::create($data);
        return response()->json($transfert->load(['article', 'bureau', 'fonctionnaire']), 201);
    }

    public function destroy($id)
    {
        Transfert::findOrFail($id)->delete();
        return response()->json(['message' => 'Transfert supprimé']);
    }
}
