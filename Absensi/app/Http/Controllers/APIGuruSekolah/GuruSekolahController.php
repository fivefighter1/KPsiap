<?php

namespace App\Http\Controllers\APIGuruSekolah;

use App\Http\Controllers\Controller;
use App\Models\Guru\Guru_Sekolah;
use App\Models\Siswa\Siswa_Kelas;
use Illuminate\Http\Request;
use DB;

class GuruSekolahController extends Controller
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
            'sekolah_id' => 'required',
        ]);
        $guru_sekolah = new Guru_Sekolah();
        $guru_sekolah->user_id = $request->user_id;
        $guru_sekolah->sekolah_id = $request->sekolah_id;
        $guru_sekolah->status = $request->status;
        $guru_sekolah->save();
        return response(['guru_sekolah' => $guru_sekolah]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Guru\Guru_Sekolah  $guru_Sekolah
     * @return \Illuminate\Http\Response
     */
    public function show(Guru_Sekolah $guru_Sekolah)
    {
        //
    }

    public function guru_sekolah($id)
    {
        $guru_sekolah = DB::table('guru_sekolahs')
            ->leftJoin('gurus', 'gurus.user_id', '=', 'guru_sekolahs.user_id')
            ->select('guru_sekolahs.*', 'gurus.*')
            ->where('sekolah_id',$id)->get();
        return response($guru_sekolah,200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Guru\Guru_Sekolah  $guru_Sekolah
     * @return \Illuminate\Http\Response
     */
    public function edit(Guru_Sekolah $guru_Sekolah)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Guru\Guru_Sekolah  $guru_Sekolah
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Guru_Sekolah $guru_Sekolah)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Guru\Guru_Sekolah  $guru_Sekolah
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $guru_sekolah = Guru_Sekolah::FindOrFail($id);
        if($guru_sekolah != null){
            $guru_sekolah->delete();
        }
        return response()->json($guru_sekolah,204);
    }
}
