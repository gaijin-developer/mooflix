<?php

namespace App\Http\Controllers;


use App\Http\Services\FavoriteServices;
use App\Http\Services\LogServices;
use App\Http\Services\MovieServices;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FavoritesController extends Controller
{

    public function __construct(
        protected MovieServices $movieServices,
        protected FavoriteServices $favoriteServices,
    protected LogServices $logService){

    }
    public function createNew(Request $request){

        try {
            $submittedData = $request->all();

            $user = $request->user();

            $createdMovie = $this->movieServices->createNew($submittedData);

            $this->favoriteServices->createNew($createdMovie,$user);

            return response()->json(["name"=>"bill"],200);
            //return response()->json(["name"=>$createdMovie],200);
        } catch (Exception $e) {
            return response()->json("Failed to create new Object",500);
        }

    }

    // public function deleteFavourite(Request $request){

    // }


}
