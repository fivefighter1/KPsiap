<?php

namespace App\Http\Controllers\APIJadwal;

use App\Http\Controllers\Controller;
use App\Models\Sekolah\Jadwal;
use Illuminate\Http\Request;
use DB;

class JadwalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $jadwal = DB::table('jadwals')
            ->leftJoin('mata_pelajarans', 'mata_pelajarans.id', '=', 'jadwals.mata_pelajaran_id')
            ->leftJoin('kelas','kelas.id','=','jadwals.kelas_id')
            ->leftJoin('tingkats','tingkats.id','=','kelas.tingkat_id')
            ->select('jadwals.*', 'mata_pelajarans.*', 'kelas.*','tingkats.*','jadwals.id AS jadwal_id')
            ->get();
        return $jadwal;
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
            'mata_pelajaran_id' => 'required',
            'kelas_id' => 'required',
            'hari' => 'required',
            'waktu_mulai' => 'required',
            'waktu_selesai' => 'required',
        ]);
        $jadwal = new Jadwal();
        $jadwal->mata_pelajaran_id = $request->mata_pelajaran_id;
        $jadwal->kelas_id = $request->kelas_id;
        $jadwal->hari = $request->hari;
        $jadwal->waktu_mulai = $request->waktu_mulai;
        $jadwal->waktu_selesai = $request->waktu_selesai;
        $jadwal->save();
        return response(['jadwal' => $jadwal]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sekolah\Jadwal  $jadwal
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $jadwal = Jadwal::FindOrFail($id);
        if($jadwal){
            return response($jadwal,200);
        }
    }

    public function jadwal_kelas($id)
    {
        $jadwal_kelas = DB::table('jadwals')
            ->leftJoin('mata_pelajarans', 'mata_pelajarans.id', '=', 'jadwals.mata_pelajaran_id')
            ->select('jadwals.*', 'mata_pelajarans.*')
            ->where('kelas_id',$id)->get();

        return response($jadwal_kelas,200);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Sekolah\Jadwal  $jadwal
     * @return \Illuminate\Http\Response
     */
    public function edit(Jadwal $jadwal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sekolah\Jadwal  $jadwal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $jadwal = Jadwal::FindOrFail($id);
        if($jadwal)
        {
            if($request->mata_pelajaran_id != null && $request->kelas_id != null && $request->hari != null && $request->waktu_mulai != null && $request->waktu_selesai != null)
            {
                $jadwal->mata_pelajaran_id = $request->mata_pelajaran_id;
                $jadwal->kelas_id = $request->kelas_id;
                $jadwal->hari = $request->hari;
                $jadwal->waktu_mulai = $request->waktu_mulai;
                $jadwal->waktu_selesai = $request->waktu_selesai;
            }
            $jadwal->save();
        }
        return response()->json($jadwal,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sekolah\Jadwal  $jadwal
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $jadwal = Jadwal::FindorFail($id);
        if($jadwal != null)
        {
            $jadwal->delete();
        }
        return response()->json($jadwal,204);
    }
}
