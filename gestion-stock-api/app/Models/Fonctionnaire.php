<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fonctionnaire extends Model
{
    protected $fillable = ['bureau_id', 'nom', 'prenom'];

    public function bureau()
    {
        return $this->belongsTo(Bureau::class);
    }

    public function transferts()
    {
        return $this->hasMany(Transfert::class);
    }

    public function getArticlesActuels()
    {
        return $this->transferts()->with('article')->get()->filter(fn($t) => !$t->retour);
    }

    public function getHistorique()
    {
        return $this->transferts()->with(['article', 'bureau', 'retour'])->get();
    }
}
