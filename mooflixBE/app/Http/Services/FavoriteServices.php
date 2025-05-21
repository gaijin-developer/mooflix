<?php
namespace App\Http\Services;


use App\Http\Repositories\FavouriteRepository;
use App\Models\Movie;
use App\Models\User;
use Exception;
use Symfony\Component\HttpKernel\Exception\HttpException;

class FavoriteServices {

    public function __construct(protected FavouriteRepository $favoriteRepo,protected LogServices $logServices){

    }

    public function createNew(Movie $movie, User $user){
        try {
            return $this->favoriteRepo->createNew($movie,$user);
        } catch (Exception $e) {
            $this->logServices->logError($e->getMessage());
            throw new HttpException(500,"Failed to create new movie");
        }
    }

}
