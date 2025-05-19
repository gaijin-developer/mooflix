<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UsersController extends Controller
{
    //

    public function register(){
        Log::info("hit");
        return response()->json(["data"=>"route has been hit"],200);
    }

}
