<?php

namespace App\Http\Controllers\APITingkat;

use App\Http\Controllers\Controller;
use App\Models\Sekolah\Tingkat;
use Illuminate\Http\Request;
use DB;

class TingkatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tingkats = DB::table('tingkats')
            ->leftJoin('jenjangs', 'jenjangs.id', '=', 'tingkats.jenjang_id')
            ->select('tingkats.*', 'jenjangs.nama_jenjang')
            ->get();
        return $tingkats;
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $tingkat = new Tingkat();
        $tingkat->nama_tingkat = $request->nama_tingkat;
        $tingkat->sequence = $request->sequence;
        $tingkat->jenjang_id = $request->jenjang_id;
        $tingkat->save();
        return response(['tingkat' => $tingkat]);
    }

    public function add(Request $request)
    {

        $tingkat = new Tingkat();
        $tingkat->nama_tingkat = $request->nama_tingkat;
        $tingkat->sequence = $request->sequence;
        $tingkat->jenjang_id = $request->jenjang_id;
        $tingkat->save();
        return response(['tingkat' => $tingkat]);
    }

    public function tingkat_jenjang($id)
    {
        $tingkat_jenjang = DB::table('tingkats')
            ->leftJoin('jenjangs','jenjangs.id','=','tingkats.jenjang_id')
            ->where('jenjang_id',$id)
            ->select('tingkats.*','jenjangs.nama_jenjang')->orderBy('tingkats.id', 'ASC')->get();
        return response($tingkat_jenjang,200);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sekolah\Tingkat  $tingkat
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tingkat = Tingkat::FindOrFail($id);
        if($tingkat)
        {
            return response($tingkat,200);
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sekolah\Tingkat  $tingkat
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $tingkat = Tingkat::FindOrFail($id);
        if($tingkat)
        {
            if($request->nama_tingkat != null && $request->sequence != null && $request->jenjang_id)
            {
                $tingkat->nama_tingkat = $request->nama_tingkat;
                $tingkat->sequence = $request->sequence;
                $tingkat->jenjang_id = $request->jenjang_id;
            }
            $tingkat->save();
        }
        return response()->json($tingkat,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sekolah\Tingkat  $tingkat
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $tingkat = Tingkat::FindOrFail($id);
        if($tingkat != null)
        {
            $tingkat->delete();
        }
        return response()->json($tingkat,204);
    }
}
