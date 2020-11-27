<?php

namespace App\Models\Guru;

use Illuminate\Database\Eloquent\Model;

class Guru_Sekolah extends Model
{
    protected $table = 'guru_sekolahs';

    public function user()
    {
        return $this->belongsTo('App\User','user_id');
    }

    public function sekolah()
    {
        return $this->belongsTo('App\Models\Sekolah\Sekolah','sekolah_id');
    }
}
