<?php

namespace App\Models\FingerPrint;

use Illuminate\Database\Eloquent\Model;

class FingerPrint extends Model
{
    protected $table = 'finger_prints';

    public function user()
    {
        return $this->belongsTo('App\User','user_id');
    }
}
