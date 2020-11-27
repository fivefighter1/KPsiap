<?php

namespace App\Http\Controllers\APISekolah;

use App\Http\Controllers\Controller;
use App\Models\Sekolah\Jenjang;
use App\Models\Sekolah\Sekolah;
use Illuminate\Http\Request;
use DB;

class SekolahController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sekolahs = Sekolah::get();
        return $sekolahs;
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
            'nama_sekolah' => 'required|max:55',
            'alamat' =>'required',
            'kota' => 'required',
            'provinsi' => 'required',
        ]);

        $sekolah = new Sekolah();
        $sekolah->nama_sekolah = $request->nama_sekolah;
        $sekolah->alamat = $request->alamat;
        $sekolah->kota = $request->kota;
        $sekolah->provinsi = $request->provinsi;
        $sekolah->save();

        $jenjangs = $request->jenjang_sekolah;
        foreach($jenjangs as $key => $value) {
            $jenjang = new Jenjang();
            $jenjang->nama_jenjang = $value;
            $jenjang->sekolah_id = $sekolah->id;
            $sekolah->jenjang()->save($jenjang);
        }
        return response()->json($request,200);
//        $accessToken = $user->createToken('authToken')->accessToken;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sekolah\Sekolah  $sekolah
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $sekolah = Sekolah::FindOrFail($id);
        if($sekolah)
        {
            return response($sekolah,200);
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sekolah\Sekolah  $sekolah
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $sekolah = Sekolah::FindOrFail($id);
        if($sekolah)
        {
            if($request->nama_sekolah != null && $request->alamat != null && $request->kota != null && $request->provinsi != null)
            {
                $sekolah->nama_sekolah = $request->nama_sekolah;
                $sekolah->alamat = $request->alamat;
                $sekolah->kota = $request->kota;
                $sekolah->provinsi = $request->provinsi;
            }
            $sekolah->save();
        }
        return response()->json($sekolah,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sekolah\Sekolah  $sekolah
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $sekolah = Sekolah::FindOrFail($id);
        if($sekolah != null)
        {
            $sekolah->delete();
        }
        return response()->json($sekolah,204);

    }
}
