<?php

namespace App\Models\Sekolah;

use Illuminate\Database\Eloquent\Model;

class Mata_Pelajaran extends Model
{
    protected $table = 'mata_pelajarans';

    public function jadwal()
    {
        return $this->hasMany('App\Models\Sekolah\Jadwal','mata_pelajaran_id');
    }
}
