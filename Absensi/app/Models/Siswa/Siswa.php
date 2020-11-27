<?php

namespace App\Models\Siswa;

use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    protected $primaryKey = 'user_id';
    protected $fillable = ['NIS','nama_siswa','jenis_kelamin','tempat_lahir','tanggal_lahir','alamat','no_telp','agama'];
    protected $table = 'siswas';

    public function user()
    {
        return $this->belongsTo('App\User','user_id');
    }
}
