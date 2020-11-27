<?php

namespace App\Models\Sekolah;

use Illuminate\Database\Eloquent\Model;

class Tahun_Ajaran extends Model
{
    protected $table ='tahun_ajarans';

    public function kelas()
    {
        return $this->hasMany('App\Models\Sekolah\Kelas','kelas_id');
    }
}
