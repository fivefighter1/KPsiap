<?php

namespace App\Http\Controllers\APIGuru;

use App\Http\Controllers\Controller;
use App\Models\Guru\Guru;
use Illuminate\Http\Request;
use App\User;

class GuruController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $gurus = Guru::get();
        return $gurus;
    }

    public function listGuru()
    {
        $gurus = User::whereDoesntHave('guru_sekolah')
            ->leftJoin('gurus','gurus.user_id', '=', 'users.id')
            ->leftJoin('roles','roles.id','=','users.role_id')
            ->select('users.*', 'roles.*','gurus.*')
            ->where('role',"Guru")->get();
        return $gurus;
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'username' => 'required',
            'password' => 'required',
            'role_id' => 'required',
        ]);
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->username = $request->username;
        $user->role_id = $request->role_id;
        $user->save();

        $validatedData = $request->validate([
            'NIP' => 'required',
            'nama_guru' => 'required',
            'jenis_kelamin' => 'required',
            'tempat_lahir' => 'required',
            'tanggal_lahir' => 'required',
            'no_telp' => 'required',
            'alamat' => 'required',
            'jabatan' => 'required',
            'agama' =>'required',
        ]);
        $guru = new Guru();
        $guru->NIP = $request->NIP;
        $guru->nama_guru = $request->nama_guru;
        $guru->jenis_kelamin = $request->jenis_kelamin;
        $guru->tempat_lahir = $request->tempat_lahir;
        $guru->tanggal_lahir = $request->tanggal_lahir;
        $guru->no_telp = $request->no_telp;
        $guru->alamat = $request->alamat;
        $guru->jabatan = $request->jabatan;
        $guru->agama = $request->agama;
        $user->guru()->save($guru);
        return response(['guru' => $guru]);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Guru\Guru  $guru
     * @return \Illuminate\Http\Response
     */
    public function show(Guru $guru)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Guru\Guru  $guru
     * @return \Illuminate\Http\Response
     */
    public function edit(Guru $guru)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Guru\Guru  $guru
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Guru $guru)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Guru\Guru  $guru
     * @return \Illuminate\Http\Response
     */
    public function destroy(Guru $guru)
    {
        //
    }
}
