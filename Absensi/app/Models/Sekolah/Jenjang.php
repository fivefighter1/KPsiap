<?php

namespace App\Models\Sekolah;

use Illuminate\Database\Eloquent\Model;

class Jenjang extends Model
{
    protected $table = 'jenjangs';

    public function tingkat()
    {
        return $this->hasMany('App\Models\Sekolah\Tingkat','jenjang_id');
    }
    public function sekolah()
    {
        return $this->belongsTo('App\Models\Sekolah\Sekolah','sekolah_id');
    }
}
