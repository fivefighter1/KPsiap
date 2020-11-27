<?php

namespace App\Models\Absensi;

use Illuminate\Database\Eloquent\Model;

class Absensi extends Model
{
    protected $table = 'absensis';

    public function user()
    {
        return $this->belongsTo('App\User','user_id');
    }

    public function jadwal()
    {
        return $this->belongsTo('App\Models\Sekolah\Jadwal','absensi_id');
    }
}
