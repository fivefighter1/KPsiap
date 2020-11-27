<?php

namespace App\Models\Sekolah;

use Illuminate\Database\Eloquent\Model;

class Tingkat extends Model
{
    protected $table = 'tingkats';

    public function jenjang()
    {
        return $this->belongsTo('App\Models\Sekolah\Jenjang','tingkat_id');
    }

    public function kelas()
    {
        return $this->hasMany('App\Models\Sekolah\Kelas','kelas_id');
    }
}
