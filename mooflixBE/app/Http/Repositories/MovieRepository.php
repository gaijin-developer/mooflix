<?php
namespace App\Http\Repositories;

use App\Models\Movie;

class MovieRepository extends BaseRepository {

    public function __construct(Movie $movie) {
        parent::__construct($movie);
    }
    public function createNew($movieData){

        return $this->model->firstOrCreate(['imdbID' => $movieData['imdbID']],[
            'Title' => $movieData['Title'],
            'Year' => $movieData['Year'],
            'imdbID' => $movieData['imdbID'],
            'Type' => $movieData['Type'],
            'Poster' => $movieData['Poster'],
    ]);
    }
}
