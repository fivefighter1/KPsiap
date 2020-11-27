<?php

namespace App\Models\Sekolah;

use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    protected $table = 'kelas';

    public function jadwal()
    {
        return $this->hasMany('App\Models\Sekolah\Jadwal','kelas_id');
    }
}
