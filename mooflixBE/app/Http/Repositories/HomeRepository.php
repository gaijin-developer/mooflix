<?php

namespace App\Http\Repositories;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class HomeRepository {


    public function getSearchedMovie($searchWord){
        $key = config('app.omdb_key');
        $movies=Http::get("http://www.omdbapi.com/?s={$searchWord}&apikey=".$key);
        return $movies->json();
    }
    public function getMovies(){
        $key = config('app.omdb_key');
        $movies=Http::get("http://www.omdbapi.com/?s=guardians&apikey=".$key);
        return $movies->json();
    }

    public function getMovieDetails($movieId){
        $key = config('app.omdb_key');
        $movies=Http::get("http://www.omdbapi.com/?i={$movieId}&apikey=".$key);
        return $movies->json();
    }

}
