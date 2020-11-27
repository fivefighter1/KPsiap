<?php

namespace App\Http\Controllers\APIAbsensi;

use App\Http\Controllers\Controller;
use App\Models\Absensi\Absensi;
use App\Models\FingerPrint\FingerPrint;
use Illuminate\Http\Request;

class AbsensiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $absensi = Absensi::get();
        return $absensi;
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
        $absensi = new Absensi();
        $absensi->user_id = $request->user_id;
        $absensi->jadwal_id = $request->jadwal_id;
        $absensi->keterangan = $request->keterangan;
        $absensi->save();
        return response(['absensi' => $absensi]);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Absensi\Absensi  $absensi
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $absensi = Absensi::FindOrFail($id);
        if($absensi)
        {
            return response($absensi,200);

        }
    }

    public function absen(Request $request, $id)
    {
        $fingerprint = FingerPrint::FindOrFail($id);
        if($fingerprint){
            $validatedData = $request->validate([
                'jadwal_id' => 'required',
                'keterangan' => 'required',

            ]);
            $absensi = new Absensi();
            $absensi->user_id = $fingerprint->user_id;
            $absensi->jadwal_id = $request->jadwal_id;
            $absensi->keterangan = $request->keterangan;
            $absensi->save();
            return response(['absensi' => $absensi]);

        }
        else{
            return ("Failed");
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Absensi\Absensi  $absensi
     * @return \Illuminate\Http\Response
     */
    public function edit(Absensi $absensi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Absensi\Absensi  $absensi
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $absensi = Siswa::FindOrFail($id);
        if($absensi)
        {
            if($request->user_id != null && $request->jadwal_id != null && $request->keterangan != null)
            {
                $absensi->user_id = $request->user_id;
                $absensi->jadwal_id = $request->jadwal_id;
                $absensi->jenis_kelamin = $request->jenis_kelamin;


            }
            $absensi->save();
        }
        return response()->json($absensi,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Absensi\Absensi  $absensi
     * @return \Illuminate\Http\Response
     */
    public function destroy(Absensi $absensi)
    {
        //
    }
}
