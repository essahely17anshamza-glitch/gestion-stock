<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Retour extends Model
{
    protected $fillable = [
        'transfert_id',
        'quantite',
        'date_retour',
        'motif'
    ];

    public function transfert()
    {
        return $this->belongsTo(Transfert::class);
    }
}
