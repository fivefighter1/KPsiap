<?php

namespace App\Models\Siswa;

use Illuminate\Database\Eloquent\Model;

class Siswa_Kelas extends Model
{
    protected $table = 'siswa_kelas';

    public function user()
    {
        return $this->belongsTo('App\User','user_id');
    }

    public function kelas()
    {
        return $this->belongsTo('App\Models\Sekolah\Kelas','kelas_id');
    }
}
