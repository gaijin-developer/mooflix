<?php
namespace App\Http\Services;

use App\Http\Controllers\MoviesController;
use App\Http\Repositories\FavouriteRepository;
use App\Models\Movie;
use App\Models\User;
use Exception;
use Symfony\Component\HttpKernel\Exception\HttpException;

class FavoriteServices {
    public $favoriteRepo;
    public $movieService;

    public function __construct(FavouriteRepository $favoriteRepo){
        $this->favoriteRepo = $favoriteRepo;
    }

    public function createNew(Movie $movie, User $user){
        try {
            return $this->favoriteRepo->createNew($movie,$user);
        } catch (Exception $e) {
            throw new HttpException(500,"Failed to create new movie");
        }
    }

}
