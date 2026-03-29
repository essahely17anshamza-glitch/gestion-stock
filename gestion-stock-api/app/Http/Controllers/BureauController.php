<?php

namespace App\Http\Controllers;

use App\Models\Bureau;
use Illuminate\Http\Request;

class BureauController extends Controller
{
    public function index()
    {
        return response()->json(Bureau::all());
    }

    public function store(Request $request)
    {
        $request->validate(['nom' => 'required|string']);
        $bureau = Bureau::create($request->only('nom'));
        return response()->json($bureau, 201);
    }

    public function update(Request $request, $id)
    {
        $bureau = Bureau::findOrFail($id);
        $bureau->update($request->only('nom'));
        return response()->json($bureau);
    }

    public function destroy($id)
    {
        Bureau::findOrFail($id)->delete();
        return response()->json(['message' => 'Bureau supprimé']);
    }
}
