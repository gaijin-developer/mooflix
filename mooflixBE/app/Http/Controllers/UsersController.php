<?php

namespace App\Http\Controllers;

use App\Http\Services\FavoriteServices;
use App\Http\Services\MovieServices;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UsersController extends Controller
{
    //
    public function __construct(protected MovieServices $movieServices,protected FavoriteServices $favoriteServices) {
    }

    public function likeMovie(Request $request){

        try {
            $movieDetails = $request->all();

            $user = Auth::user();

            $movie = $this->movieServices->createNew($movieDetails);

            $movie = $this->favoriteServices->createNew($movie,$user);

            return response()->json(["movie"=>$movie],200);
        } catch (Exception $e) {
            return response()->json(["movie"=>$request],500);
        }

    }

}
