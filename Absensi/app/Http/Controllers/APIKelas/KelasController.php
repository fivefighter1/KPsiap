<?php

namespace App\Http\Controllers\APIKelas;

use App\Http\Controllers\Controller;
use App\Models\Sekolah\Kelas;
use Illuminate\Http\Request;
use DB;

class KelasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $kelas = DB::table('kelas')
            ->leftJoin('tingkats', 'tingkats.id', '=', 'kelas.tingkat_id')
            ->leftJoin('tahun_ajarans','tahun_ajarans.id','=','kelas.tahun_ajaran_id')
            ->select('kelas.*', 'tingkats.nama_tingkat', 'tahun_ajarans.tahun_ajaran')
            ->get();
        return $kelas;
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
            'nama_kelas' => 'required',
            'tingkat_id' => 'required',
            'tahun_ajaran_id' => 'required',
        ]);
        $kelas = new Kelas();
        $kelas->nama_kelas = $request->nama_kelas;
        $kelas->tingkat_id = $request->tingkat_id;
        $kelas->tahun_ajaran_id = $request->tahun_ajaran_id;
        $kelas->save();
        return response(['kelas' => $kelas]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sekolah\Kelas $kelas
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $kelas = Kelas::FindOrFail($id);
        if($kelas)
        {
            return response($kelas,200);
        }
    }

    public function kelas_tingkat($id)
    {
        $kelas_tingkat = DB::table('kelas')
            ->leftJoin('tahun_ajarans','tahun_ajarans.id','=','kelas.tahun_ajaran_id')
            ->select('kelas.*', 'tahun_ajarans.tahun_ajaran')
            ->where('tingkat_id', $id)
            ->get();;
        return response($kelas_tingkat,200);

    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sekolah\Kelas  $kelas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $kelas = Kelas::FindOrFail($id);
        if($kelas)
        {
            if($request->nama_kelas != null && $request->tingkat_id != null && $request->tahun_ajaran_id != null)
            {
                $kelas->nama_kelas = $request->nama_kelas;
                $kelas->tingkat_id = $request->tingkat_id;
                $kelas->tahun_ajaran_id = $request->tahun_ajaran_id;
            }
            $kelas->save();
        }
        return response()->json($kelas,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sekolah\Kelas  $kelas
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $kelas = Kelas::FindOrFail($id);
        if($kelas != null)
        {
            $kelas->delete();
        }
        return response()->json($kelas,204);
    }
}
