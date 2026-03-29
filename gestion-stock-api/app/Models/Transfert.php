<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transfert extends Model
{
    protected $fillable = [
        'article_id',
        'bureau_id',
        'fonctionnaire_id',
        'quantite',
        'date_transfert',
        'remarques',
        'reference_br'
    ];

    public function article()
    {
        return $this->belongsTo(Article::class);
    }

    public function bureau()
    {
        return $this->belongsTo(Bureau::class);
    }

    public function fonctionnaire()
    {
        return $this->belongsTo(Fonctionnaire::class);
    }



    public static function genererReference()
    {
        $count = self::count() + 1;
        return 'BR-' . date('Y') . '-' . str_pad($count, 3, '0', STR_PAD_LEFT);
    }
}
