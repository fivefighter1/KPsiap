<?php

namespace App\Models\Sekolah;

use Illuminate\Database\Eloquent\Model;

class Sekolah extends Model
{
    protected $table = 'sekolahs';

    public function guru_sekolah()
    {
        return $this->hasMany('App\Models\Guru\Guru_Sekolah','sekolah_id');
    }

    public function jenjang()
    {
        return $this->hasMany('App\Models\Sekolah\Jenjang','sekolah_id');
    }
}
