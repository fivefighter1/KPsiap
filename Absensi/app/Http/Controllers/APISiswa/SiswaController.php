<?php

namespace App\Http\Controllers\APISiswa;

use App\Http\Controllers\Controller;
use App\Models\Siswa\Siswa;
use Illuminate\Http\Request;
use App\User;
use App\Models\Siswa\Siswa_Kelas;
use DB;

class SiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $siswas = Siswa::get();
        return $siswas;
    }

    public function listSiswa()
    {
        $siswas = User::whereDoesntHave('siswa_kelas')
            ->leftJoin('siswas','siswas.user_id', '=', 'users.id')
            ->leftJoin('roles','roles.id','=','users.role_id')
            ->select('users.*', 'roles.*','siswas.*')
            ->where('role',"Siswa")->get();
//        $siswas = DB::table('users')
//        ->leftJoin('siswas', 'siswas.user_id', '=', 'users.id')
//        ->select('users.*', 'siswas.*')
//        ->doesntHave('siswa_kelas')->where('role_id',4)
//        ->get();

//        $siswas = DB::table('siswas')
//            ->leftJoin('users', 'users.id', '=', 'siswas.user_id')
//            ->select('siswas.*', 'users.*')
//            ->doesntHave('siswa_kelas')->where('users.role_id',4)
//            ->get();
        return $siswas;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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
            'NIS' => 'required',
            'nama_siswa' => 'required',
            'jenis_kelamin' => 'required',
            'tempat_lahir' => 'required',
            'tanggal_lahir' => 'required',
            'alamat' =>'required',
            'no_telp' => 'required',
            'agama' =>'required',
        ]);
        $siswa = new Siswa();
        $siswa->NIS = $request->NIS;
        $siswa->nama_siswa = $request->nama_siswa;
        $siswa->jenis_kelamin = $request->jenis_kelamin;
        $siswa->tempat_lahir = $request->tempat_lahir;
        $siswa->tanggal_lahir = $request->tanggal_lahir;
        $siswa->alamat = $request->alamat;
        $siswa->no_telp = $request->no_telp;
        $siswa->agama = $request->agama;
        $user->siswa()->save($siswa);
        return response(['siswa' => $siswa]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Siswa\Siswa  $siswa
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $siswa = Siswa::FindOrFail($id);
        if($siswa)
        {
            return response($siswa,200);
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Siswa\Siswa  $siswa
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $siswa = Siswa::FindOrFail($id);
        if($siswa)
        {
            if($request->nama_siswa != null && $request->NIS != null
                && $request->jenis_kelamin != null && $request->tempat_lahir != null
                && $request->tanggal_lahir && $request->alamat != null && $request->no_telp
                && $request->agama != null)
            {
                $siswa->nama_siswa = $request->nama_siswa;
                $siswa->NIS = $request->NIS;
                $siswa->jenis_kelamin = $request->jenis_kelamin;
                $siswa->tempat_lahir = $request->tempat_lahir;
                $siswa->tanggal_lahir = $request->tanggal_lahir;
                $siswa->alamat = $request->alamat;
                $siswa->no_telp = $request->no_telp;
                $siswa->agama = $request->agama;

            }
            $siswa->save();
        }
        return response()->json($siswa,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Siswa\Siswa  $siswa
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $siswa = Siswa::FindOrFail($id);
        if($siswa != null){
            $siswa->delete();
        }
        return response()->json($siswa,204);
    }
}
