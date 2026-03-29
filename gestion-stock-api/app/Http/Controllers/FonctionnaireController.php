<?php

namespace App\Http\Controllers;

use App\Models\Fonctionnaire;
use Illuminate\Http\Request;

class FonctionnaireController extends Controller
{
    public function index()
    {
        return response()->json(Fonctionnaire::with('bureau')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'bureau_id' => 'required|exists:bureaux,id',
            'nom' => 'required|string',
            'prenom' => 'required|string',
        ]);
        $fonctionnaire = Fonctionnaire::create($request->all());
        return response()->json($fonctionnaire, 201);
    }

    public function update(Request $request, $id)
    {
        $fonctionnaire = Fonctionnaire::findOrFail($id);
        $fonctionnaire->update($request->all());
        return response()->json($fonctionnaire);
    }

    public function destroy($id)
    {
        Fonctionnaire::findOrFail($id)->delete();
        return response()->json(['message' => 'Fonctionnaire supprimé']);
    }

    public function search(Request $request)
    {
        $query = $request->get('q');
        $fonctionnaire = Fonctionnaire::where('nom', 'like', "%$query%")
            ->orWhere('prenom', 'like', "%$query%")
            ->with('bureau')
            ->firstOrFail();

        return response()->json([
            'fonctionnaire' => $fonctionnaire,
            'articles_actuels' => $fonctionnaire->getArticlesActuels(),
            'historique' => $fonctionnaire->getHistorique(),
        ]);
    }
}
