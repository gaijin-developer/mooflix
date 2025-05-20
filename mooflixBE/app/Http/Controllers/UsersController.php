<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UsersController extends Controller
{
    //

    public function register(){
        Log::info("hit");
        return response()->json(["data"=>"Register route has been hit"],200);
    }
    public function signin(){
        Log::info("signin");
        return response()->json(["data"=>"Sign in route has been hit"],200);
    }

}
