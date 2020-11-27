<?php

namespace App\Http\Controllers\APISiswaKelas;

use App\Http\Controllers\Controller;
use App\Models\Siswa\Siswa_Kelas;
use Illuminate\Http\Request;
use DB;

class SiswaKelasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $siswa_kelas = DB::table('siswa_kelas')
            ->leftJoin('siswas', 'siswas.user_id', '=', 'siswa_kelas.user_id')
            ->select('siswa_kelas.*', 'siswas.*')
            ->get();
        return $siswa_kelas;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'user_id' => 'required',
            'kelas_id' => 'required',

        ]);
        $siswa_kelas = new Siswa_Kelas();
        $siswa_kelas->user_id = $request->user_id;
        $siswa_kelas->kelas_id = $request->kelas_id;
        $siswa_kelas->keterangan = $request->keterangan;
        $siswa_kelas->save();
        return response(['siswa_kelas' => $siswa_kelas]);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Siswa\Siswa_Kelas  $siswa_Kelas
     * @return \Illuminate\Http\Response
     */
    public function show(Siswa_Kelas $siswa_Kelas)
    {
        //
    }

    public function siswa_kelas($id)
    {
        $siswa_kelas = DB::table('siswa_kelas')
            ->leftJoin('siswas', 'siswas.user_id', '=', 'siswa_kelas.user_id')
            ->select('siswa_kelas.*', 'siswas.*')
            ->where('kelas_id',$id)->get();
        return response($siswa_kelas,200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Siswa\Siswa_Kelas  $siswa_Kelas
     * @return \Illuminate\Http\Response
     */
    public function edit(Siswa_Kelas $siswa_Kelas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Siswa\Siswa_Kelas  $siswa_Kelas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Siswa_Kelas $siswa_Kelas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Siswa\Siswa_Kelas  $siswa_Kelas
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $siswa_kelas = Siswa_Kelas::FindOrFail($id);
        if($siswa_kelas != null){
            $siswa_kelas->delete();
        }
        return response()->json($siswa_kelas,204);
    }
}
