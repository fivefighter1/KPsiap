<?php

namespace App\Http\Controllers\APIMataPelajaran;

use App\Http\Controllers\Controller;
use App\Models\Sekolah\Mata_Pelajaran;
use Illuminate\Http\Request;

class MataPelajaranController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mata_pelajarans = Mata_Pelajaran::get();
        return $mata_pelajarans;
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
            'kode_mata_pelajaran' => 'required|max:55',
            'nama_mata_pelajaran' =>'required',

        ]);
        $mata_pelajaran = new Mata_Pelajaran();
        $mata_pelajaran->kode_mata_pelajaran = $request->kode_mata_pelajaran;
        $mata_pelajaran->nama_mata_pelajaran = $request->nama_mata_pelajaran;
        $mata_pelajaran->save();
//        $accessToken = $user->createToken('authToken')->accessToken;
        return response(['mata_pelajaran' => $mata_pelajaran]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sekolah\Mata_Pelajaran  $mata_Pelajaran
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $mata_pelajaran = Mata_Pelajaran::FindOrFail($id);
        if($mata_pelajaran)
        {
            return response($mata_pelajaran,200);
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sekolah\Mata_Pelajaran  $mata_Pelajaran
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $mata_pelajaran = Mata_Pelajaran::FindOrFail($id);
        if($mata_pelajaran)
        {
            if($request->kode_mata_pelajaran != null && $request->nama_mata_pelajaran != null)
            {
                $mata_pelajaran->kode_mata_pelajaran = $request->kode_mata_pelajaran;
                $mata_pelajaran->nama_mata_pelajaran = $request->nama_mata_pelajaran;
            }
            $mata_pelajaran->save();
        }
        return response()->json($mata_pelajaran,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sekolah\Mata_Pelajaran  $mata_Pelajaran
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $mata_pelajaran = Mata_Pelajaran::FindorFail($id);
        if($mata_pelajaran != null)
        {
            $mata_pelajaran->delete();
        }
        return response()->json($mata_pelajaran,204);
    }
}
