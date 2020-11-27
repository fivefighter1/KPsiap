<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;


class User extends Authenticatable
{
    use HasApiTokens,Notifiable;
    protected $table = 'users';

    public function absensi()
    {
        return $this->hasMany('App\Models\Absensi\Absensi','user_id');
    }

    public function role()
    {
        return $this->belongsTo('App\Models\Role\Role','user_id');
    }

    public function siswa()
    {
        return $this->hasOne('App\Models\Siswa\Siswa','user_id');
    }

    public function guru()
    {
        return $this->hasOne('App\Models\Guru\Guru','user_id');
    }

    public function fingerprint()
    {
        return $this->hasMany('App\Models\FingerPrint\FingerPrint','user_id');
    }

    public function guru_sekolah()
    {
        return $this->hasMany('App\Models\Guru\Guru_Sekolah','user_id');
    }

    public function siswa_kelas()
    {
        return $this->hasMany('App\Models\Siswa\Siswa_Kelas','user_id');
    }

    public function guru_jadwal()
    {
        return $this->hasMany('App\Models\Guru\Guru_Jadwal','user_id');
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
