<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    protected $fillable = ['nom'];

    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    public function getNombreArticles()
    {
        return $this->articles()->count();
    }

    public function getPiecesEntrees()
    {
        return $this->articles()->sum('quantite_entree');
    }

    public function getPiecesSortantes()
    {
        return $this->articles->sum(fn($a) => $a->getQuantiteSortie());
    }

    public function getTotalStock()
    {
        return $this->articles->sum(fn($a) => $a->getStockRestant());
    }
}
