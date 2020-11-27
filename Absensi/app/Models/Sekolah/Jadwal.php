<?php

namespace App\Models\Sekolah;

use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    protected $table = 'jadwals';

    public function kelas()
    {
        return $this->belongsTo('App\Models\Sekolah\Kelas','kelas_id');
    }
    public function mata_pelajaran()
    {
        return $this->belongsTo('App\Models\Sekolah\Mata_Pelajaran','mata_pelajaran_id');
    }
    public function guru_jadwal()
    {
        return $this->hasMany('App\Models\Guru\Guru_Jadwal','jadwal_id');
    }
}
