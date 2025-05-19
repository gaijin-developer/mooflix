<?php

namespace App\Http\Controllers;

use App\Http\Services\FavouriteServices;
use App\Http\Services\LogServices;
use App\Http\Services\MovieServices;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FavoritesController extends Controller
{

    public function __construct(
        protected MovieServices $movieServices,
    protected LogServices $logService){

    }
    public function createNew(Request $request){

        try {
            $submittedData = $request->all();

            $user = $request->user();

             $createdMovie = $this->movieServices->createNew($submittedData);

            // $this->favoriteService->createNew($createdMovie,$submittedData,$user);

            return response()->json(["name"=>$createdMovie]);
        } catch (Exception $e) {
            return response()->json("Failed to create new Object",500);
        }

    }

    public function deleteFavourite(Request $request){

    }


}
