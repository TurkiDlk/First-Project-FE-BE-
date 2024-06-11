<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    //

    public function createRandomUser(Request $req){
       
        $user = User::create([
            "name"=>"turki",
            "email"=>"Turkoiiiii@gmail.com",
            "password" => "12345678",
            "phone"=> "0555555555"
        ]);
        
        return $user;
    }

    function register(Request $req ){

        $validated = $req->validate([
            'email' => 'required|unique:users|max:255|email',

            
        ]);

        $newUser = User::create([
            "name"=>$req->input("name"),
            "email"=>$req->input("email"),
            "password"=>$req->input("password"),
            "phone"=>$req->input("phone")
        ]);

        $token =$newUser->createToken("auth_token");
        return response()->json(["token"=>$token->plainTextToken]);

    }

    function login(Request $req){


        $user = User::where("email",$req->input("email"))->first();

        if(!$user){
    abort(422, 'Wrong Email');
        }

        if(!Hash::check( $req->input("password"),$user->password)){

            return response()->json(["message"=>"Wrong Pass"] , 422);
        }
        $token =$user->createToken("auth_token");
        $subToken= substr(response()->json(["token"=>$token->plainTextToken]),3);
    
        
        return response()->json(["token"=>$token->plainTextToken]);

    }

    function UserInfo(Request $req){
        
         
        $user=$req->user();
        

        $userData=[
            "name" => $user->name,
        ];

        return $user;


    }


    public function changePassword()
    {
       return view('change-password');
    } 
 
    public function updatePassword(Request $request)
    {
            # Validation
            $request->validate([
                'old_password' => 'required',
                'new_password' => 'required|confirmed',
            ]);
    
    
            #Match The Old Password
            if (!Hash::check($request->old_password, auth()->user()->password)) {
                return response()->json (["message"=>"Old Password Doesn't match!"] , 422);
               
            }
    
    
            #Update the new Password
            auth()->user()->update([
                'password' => Hash::make($request->new_password)
            ]);

            return response()->json(["message"=>"Password changed successfully"]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function updateInfo(Request $request)
    {
        $request->validate([
            'email' => 'required|unique:users|max:255|email',
            'name' => 'required',
        ]);
    
        auth()->user()->update([
            'email' => $request->email,
            'name' => $request->name
        ]);
    
        return response()->json(["message"=>"Info updated successfully"]);
    }

}

    
