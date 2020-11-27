<?php

namespace App\Http\Controllers\APIRole;

use App\Http\Controllers\Controller;
use App\Models\Role\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles = Role::get();
        return $roles;
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
            'role' => 'required|max:55',
            'strength' =>'required',

        ]);
        $role = new Role();
        $role->role = $request->role;
        $role->strength = $request->strength;
        $role->save();
//        $accessToken = $user->createToken('authToken')->accessToken;
        return response(['role' => $role]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Role\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $role = Role::FindOrFail($id);
        if($role)
        {
            return response($role,200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Role\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function edit(Role $role)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Role\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $role = Role::FindOrFail($id);
        if($role)
        {
            if($request->role != null && $request->strength != null)
            {
                $role->role = $request->role;
                $role->strength = $request->strength;
            }
            $role->save();
        }
        return response()->json($role,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Role\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $role = Role::FindOrFail($id);
        if($role != null)
        {
            $role->delete();
        }
        return response()->json(null,204);
    }
}
