<?php

namespace App\Models\Guru;

use Illuminate\Database\Eloquent\Model;

class Guru_Jadwal extends Model
{
    protected $table = 'guru_jadwals';

    public function user()
    {
        return $this->belongsTo('App\Models\Guru\Guru_Jadwal','user_id');
    }

    public function jadwal()
    {
        return $this->belongsTo('App\Models\Sekolah\Jadwal','jadwal_id');
    }
}
