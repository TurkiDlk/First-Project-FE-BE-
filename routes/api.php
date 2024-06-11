<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/hi', function(){

    return true;

});

Route::post('/hello', function(Request  $req){
    $name = $req->input("name"); 
     return $req -> all();
    // return response()->json(["message" => "hello $name"]);

});

Route::post('/createRandomUser',[ UserController::class,'createRandomUser']);



Route::post('/register',[ UserController::class,'register']);


Route::post('/login',[ UserController::class,'login']);

Route::get('/userInfo',[ UserController::class,'UserInfo'])->middleware('auth:sanctum');


Route::post('/changePassword', [UserController::class, 'updatePassword'])->middleware('auth:sanctum');
Route::post('/updateInfo', [UserController::class, 'updateInfo'])->middleware('auth:sanctum');

// Route::resource('posts', UserController::class);
// OCSSRzU478fepCiOEhKzWH8rx8aA87kcA44imPfn1a54a3d4
// OCSSRzU478fepCiOEhKzWH8rx8aA87kcA44imPfn1a54a3d4


Route::post('/password/email', [ForgotPasswordController::class, 'sendsResetLinkEmail']);
Route::post('/password/reset', [ResetPasswordController::class, 'reset']);