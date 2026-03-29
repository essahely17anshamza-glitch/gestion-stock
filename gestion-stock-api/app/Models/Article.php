<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'categorie_id',
        'nom',
        'description',
        'reference_bc_ao',
        'quantite_entree',
        'date_entree'
    ];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    public function transferts()
    {
        return $this->hasMany(Transfert::class);
    }

    public function getQuantiteSortie()
    {
        $sorties = $this->transferts()->sum('quantite');
        $retours = Retour::whereIn('transfert_id', $this->transferts()->pluck('id'))->sum('quantite');
        return $sorties - $retours;
    }

    public function getStockRestant()
    {
        return $this->quantite_entree - $this->getQuantiteSortie();
    }

    public function getDisponibilite()
    {
        if ($this->quantite_entree == 0) return 0;
        return round(($this->getStockRestant() / $this->quantite_entree) * 100);
    }
}
