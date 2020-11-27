<?php

namespace App\Models\Role;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'roles';
    protected $fillable = ['nama_role','strength'];
    public function user()
    {
        $this->hasMany('App\User','user_id');
    }
}
