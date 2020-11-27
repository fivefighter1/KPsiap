<?php

namespace App\Http\Controllers\APIFingerPrint;

use App\Http\Controllers\Controller;
use App\Models\FingerPrint\FingerPrint;
use Illuminate\Http\Request;
use DB;

class FingerPrintController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $fingerprints = DB::table('finger_prints')
            ->leftJoin('users', 'users.id', '=', 'finger_prints.user_id')
            ->leftJoin('siswas','siswas.user_id' ,'=','users.id')
            ->leftJoin('gurus','gurus.user_id','=','users.id')
            ->select('users.*','finger_prints.*','gurus.*','siswas.*')
            ->get();

        return $fingerprints;
    }

    public function listFingerPrintSiswa()
    {
        $fingerprints = DB::table('finger_prints')
            ->leftJoin('users', 'users.id', '=', 'finger_prints.user_id')
            ->leftJoin('siswas','siswas.user_id' ,'=','users.id')
            ->leftJoin('roles','roles.id', '=','users.role_id')
            ->select('users.*','finger_prints.*','siswas.*')
            ->where('role','Siswa')
            ->get();
        return $fingerprints;
    }

    public function listFingerPrintGuru()
    {
        $fingerprints = DB::table('finger_prints')
            ->leftJoin('users', 'users.id', '=', 'finger_prints.user_id')
            ->leftJoin('gurus','gurus.user_id','=','users.id')
            ->leftJoin('roles','roles.id','=','users.role_id')
            ->select('users.*','finger_prints.*','gurus.*')
            ->where('role','Guru')
            ->get();
        return $fingerprints;
    }

    public function search($search_fingerprint)
    {
        $fingerprint= DB::table('finger_prints')
            ->leftJoin('users', 'users.id', '=', 'finger_prints.user_id')
            ->leftJoin('roles','roles.id','=','users.role_id')
//            ->leftJoin('siswas','siswas.user_id','=','users.id')
//            ->leftJoin('gurus','gurus.user_id','=','users.id')
            ->select('users.*','finger_prints.*','roles.*','finger_prints.id as finger_print_id')
            ->where('fingerprint',$search_fingerprint)
            ->get();
        return $fingerprint;
    }
    /**{
     *
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
                    'fingerprint' => 'required',
                    'keterangan' => 'required',
                ]);
                $fingerprint = new FingerPrint();
                $fingerprint->user_id = $request->user_id;
                $fingerprint->fingerprint = $request->fingerprint;
                $fingerprint->keterangan = $request->keterangan;
                $fingerprint->save();
                return response(['fingerprint' => $fingerprint]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\FingerPrint\FingerPrint  $fingerPrint
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $fingerprint = FingerPrint::FindOrFail($id);
        if($fingerprint)
        {
            return response($fingerprint,200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\FingerPrint\FingerPrint  $fingerPrint
     * @return \Illuminate\Http\Response
     */
    public function edit(FingerPrint $fingerPrint)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\FingerPrint\FingerPrint  $fingerPrint
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $fingerprint = FingerPrint::FindOrFail($id);
        if($fingerprint)
        {
            if($request->fingerprint != null && $request->keterangan != null)
            {
                $fingerprint->fingerprint = $request->fingerprint;
                $fingerprint->keterangan = $request->keterangan;
            }
            $fingerprint->save();
        }
        return response()->json($fingerprint,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\FingerPrint\FingerPrint  $fingerPrint
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $fingerprint = FingerPrint::FindOrFail($id);
        if($fingerprint != null){
            $fingerprint->delete();
        }
        return response()->json($fingerprint,204);
    }
}
