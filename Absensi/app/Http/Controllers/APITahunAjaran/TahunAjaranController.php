<?php

namespace App\Http\Controllers\APITahunAjaran;

use App\Http\Controllers\Controller;
use App\Models\Sekolah\Tahun_Ajaran;
use Illuminate\Http\Request;
use DB;

class TahunAjaranController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tahun_ajarans = Tahun_Ajaran::get();
        return $tahun_ajarans;
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
            'tahun_ajaran' => 'required',
            'angkatan' => 'required',
        ]);
        $tahun_ajaran = new Tahun_Ajaran();
        $tahun_ajaran->tahun_ajaran = $request->tahun_ajaran;
        $tahun_ajaran->angkatan = $request->angkatan;
        $tahun_ajaran->save();
        return response(['tahun_ajaran' => $tahun_ajaran]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sekolah\Tahun_Ajaran  $tahun_Ajaran
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tahun_ajaran = Tahun_Ajaran::FindOrFail($id);
        if($tahun_ajaran)
        {
            return response($tahun_ajaran,200);

        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sekolah\Tahun_Ajaran  $tahun_Ajaran
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $tahun_ajaran = Tahun_Ajaran::FindOrFail($id);
        if($tahun_ajaran)
        {
            if($request->$tahun_ajaran != null )
            {
                $tahun_ajaran->tahun_ajaran = $request->tahun_ajaran;
                $tahun_ajaran->angkatan = $request->angkatan;

            }
            $tahun_ajaran->save();
        }
        return response()->json($tahun_ajaran,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sekolah\Tahun_Ajaran  $tahun_Ajaran
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tahun_ajaran = Tahun_Ajaran::FindOrFail($id);
        if($tahun_ajaran != null)
        {
            $tahun_ajaran->delete();
        }
        return response()->json($tahun_ajaran,204);
    }
}
