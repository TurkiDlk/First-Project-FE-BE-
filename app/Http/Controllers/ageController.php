<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\age;

class ageController extends Controller
{
 public function  createAge(Request $req){

     $age = age::create([
        "title"=>"age title",
        "body"=> "age body"
     ])  ;
    return $age;
 } 

}
