<?php

namespace App\Http\Controllers\APIGuruJadwal;

use App\Http\Controllers\Controller;
use App\Models\Guru\Guru_Jadwal;
use App\Models\Sekolah\Jadwal;
use Illuminate\Http\Request;

class GuruJadwalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
            'jadwal_id' => 'required',
            'keterangan' => 'required',
        ]);
        $guru_jadwal = new Guru_Jadwal();
        $guru_jadwal->user_id = $request->user_id;
        $guru_jadwal->jadwal_id = $request->jadwal_id;
        $guru_jadwal->keterangan = $request->keterangan;
        $guru_jadwal->save();

        return response(['guru_jadwal'=> $guru_jadwal]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Guru\Guru_Jadwal  $guru_Jadwal
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $jadwal = Jadwal::FindOrFail($id);
        if($jadwal)
        {
            return response($jadwal,200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Guru\Guru_Jadwal  $guru_Jadwal
     * @return \Illuminate\Http\Response
     */
    public function edit(Guru_Jadwal $guru_Jadwal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Guru\Guru_Jadwal  $guru_Jadwal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Guru_Jadwal $guru_Jadwal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Guru\Guru_Jadwal  $guru_Jadwal
     * @return \Illuminate\Http\Response
     */
    public function destroy(Guru_Jadwal $guru_Jadwal)
    {
        //
    }
}
