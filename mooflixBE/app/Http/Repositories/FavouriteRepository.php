<?php
namespace App\Http\Repositories;

use App\Models\Favorite;
use App\Models\Movie;
use App\Models\User;

class FavouriteRepository extends BaseRepository {
    public function __construct(Favorite $favorite) {
        parent::__construct($favorite);
    }
    public function createNew(Movie $movie, User $user){
        $existing = $this->model->where('user_id',$user->id)->where('movie_id',$movie->imdbID)->first();

        if($existing){
            return $existing->delete();
        }

        $this->model->user_id=$user->id;

        $this->model->movie_id=$movie->imdbID;

        return $this->model->save();
    }
}
