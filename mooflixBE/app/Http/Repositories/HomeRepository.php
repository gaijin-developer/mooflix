<?php

namespace App\Http\Repositories;

use Illuminate\Support\Facades\Http;

class HomeRepository {


    public function getMovies(){
        $key = config('app.omdb_key');
        $movies=Http::get("http://www.omdbapi.com/?s=guardians&apikey=".$key);
        return $movies->json();
    }

}
