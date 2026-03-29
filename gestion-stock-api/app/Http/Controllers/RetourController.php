<?php

namespace App\Http\Controllers;

use App\Models\Retour;
use App\Models\Transfert;
use Illuminate\Http\Request;

class RetourController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'transfert_id' => 'required|exists:transferts,id',
            'quantite' => 'required|integer|min:1',
            'date_retour' => 'required|date',
        ]);

        $transfert = Transfert::findOrFail($request->transfert_id);

        if ($transfert->retour) {
            return response()->json(['message' => 'Ce transfert a déjà été retourné'], 400);
        }

        if ($request->quantite > $transfert->quantite) {
            return response()->json(['message' => 'Quantité supérieure au transfert'], 400);
        }

        $retour = Retour::create($request->all());
        return response()->json($retour, 201);
    }
}
