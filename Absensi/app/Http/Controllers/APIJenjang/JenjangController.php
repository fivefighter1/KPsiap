<?php

namespace App\Http\Controllers\APIJenjang;

use App\Http\Controllers\Controller;
use App\Models\Sekolah\Jenjang;
use Illuminate\Http\Request;
use DB;

class JenjangController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $jenjangs = DB::table('jenjangs')
            ->leftJoin('sekolahs', 'sekolahs.id', '=', 'jenjangs.sekolah_id')
            ->select('jenjangs.*', 'sekolahs.nama_sekolah')
            ->get();
        return $jenjangs;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama_jenjang' => 'required|max:55',
            'sekolah_id' => 'required',
        ]);
        $jenjang = new Jenjang();
        $jenjang->nama_jenjang = $request->nama_jenjang;
        $jenjang->sekolah_id = $request->sekolah_id;
        $jenjang->save();
        return response(['jenjang' => $jenjang]);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sekolah\Jenjang  $jenjang
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $jenjang = Jenjang::FindOrFail($id);
        if($jenjang)
        {
            return response($jenjang,200);
        }
    }

    public function jenjang_sekolah($id)
    {
        $jenjang_sekolah = DB::table('jenjangs')->where('sekolah_id',$id)->get();
        return response($jenjang_sekolah,200);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sekolah\Jenjang  $jenjang
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        $jenjang = Jenjang::FindOrFail($id);
        if($jenjang)
        {
            if($request->nama_jenjang != null && $request->sekolah_id != null)
            {
                $jenjang->nama_jenjang = $request->nama_jenjang;
                $jenjang->sekolah_id = $request->sekolah_id;
            }
            $jenjang->save();
        }
        return response()->json($jenjang,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sekolah\Jenjang  $jenjang
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $jenjang = Jenjang::FindOrFail($id);
        if($jenjang != null)
        {
            $jenjang->delete();
        }
        return response()->json($jenjang,204);

    }
}
