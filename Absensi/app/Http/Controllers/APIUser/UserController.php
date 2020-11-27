<?php

namespace App\Http\Controllers\APIUser;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use DB;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = DB::table('users')
            ->leftJoin('roles', 'roles.id', '=', 'users.role_id')
            ->select('users.*', 'roles.role')
            ->get();
        return $users;
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:55',
            'email' =>'email|required|unique:users',
            'password' => 'required'
        ]);
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->username = $request->username;
        $user->role_id = $request->role_id;
        $user->save();
//        $accessToken = $user->createToken('authToken')->accessToken;
        return response(['user' => $user]);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::FindOrFail($id);
        if($user)
        {
            return response($user,200);
        }
    }

    public function listUsers()
    {
        $users = User::whereDoesntHave('siswa_kelas')->get();
        return $users;
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::FindOrFail($id);
        if($user)
        {
            if($request->name != null && $request->email != null && $request->username != null && $request->role_id != null)
            {
                $user->name = $request->name;
                $user->email = $request->email;
                $user->username = $request->username;
                $user->role_id = $request->role_id;
            }
            $user->save();
        }
        return response()->json($user,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $user = User::FindOrFail($id);
        if($user != null)
        {
            $user->delete();
        }
        return response()->json($user,204);

    }


}
