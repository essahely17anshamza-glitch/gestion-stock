<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bureau extends Model
{
    protected $fillable = ['nom'];

    public function fonctionnaires()
    {
        return $this->hasMany(Fonctionnaire::class);
    }

    public function transferts()
    {
        return $this->hasMany(Transfert::class);
    }
}
