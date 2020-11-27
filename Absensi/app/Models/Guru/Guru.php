<?php

namespace App\Models\Guru;

use Illuminate\Database\Eloquent\Model;

class Guru extends Model
{
    protected $table = 'gurus';
    protected $primaryKey = 'user_id';

    public function user()
    {
        return $this->belongsTo('App\User','user_id');
    }
}
