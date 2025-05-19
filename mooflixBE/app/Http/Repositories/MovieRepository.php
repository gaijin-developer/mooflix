<?php
namespace App\Http\Repositories;

use App\Models\Movie;

class MovieRepository extends BaseRepository {

    public function __construct(Movie $movie) {
        parent::__construct($movie);
    }
    public function createNew($movieData){

        return $this->model->firstOrCreate(['imdb_id' => $movieData['imdbID']],[
            'title' => $movieData['Title'],
            'year' => $movieData['Year'],
            'imdb_id' => $movieData['imdbID'],
            'type' => $movieData['Type'],
            'poster' => $movieData['Poster'],
    ]);
    }
}
